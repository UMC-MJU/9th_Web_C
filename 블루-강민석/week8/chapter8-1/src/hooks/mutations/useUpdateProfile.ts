// src/hooks/mutations/useUpdateProfile.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import { ResponseMyInfoDto } from "../../types/auth";
import { QUERY_KEY } from "../../constants/key";

// 1) payload 타입
export type UpdateProfileDto = {
  name?: string;
  avatar?: File;
};

// 2) 실제 PATCH 요청 함수
const updateProfileFn = async (body: UpdateProfileDto) => {
  const formData = new FormData();
  if (body.name) {
    formData.append("name", body.name);
  }
  if (body.avatar) {
    formData.append("avatar", body.avatar, body.avatar.name);
  }

  console.log("📡 API 요청 데이터:", {
    name: body.name,
    avatarFile: body.avatar?.name,
    avatarSize: body.avatar?.size,
  });

  // FormData 내용 확인
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": ", pair[1]);
  }

  const res = await axiosInstance.patch<{ data: ResponseMyInfoDto["data"] }>("/v1/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log("📡 API 응답:", res.data);
  return res.data.data;
};

export default function useUpdateProfile() {
  const qc = useQueryClient();

  return useMutation<
    // TData: mutate 성공 후 반환될 타입
    ResponseMyInfoDto["data"],
    // TError
    Error,
    // TVariables: mutate 에 들어갈 인자 타입
    UpdateProfileDto,
    // TContext: onMutate 에서 리턴할 컨텍스트
    { previous?: ResponseMyInfoDto }
  >({
    mutationFn: updateProfileFn,

    // 3) Optimistic Update
    onMutate: async (newData) => {
      // (1) 동일 키의 쿼리 취소
      await qc.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });
      // (2) 이전 캐시 데이터 가져오기
      const previous = qc.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);

      if (previous) {
        // (3) 기존 전체 객체를 복제하면서 data 업데이트
        qc.setQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo], {
          ...previous,
          data: {
            ...previous.data,
            ...(newData.name && { name: newData.name }),
            ...(newData.avatar && {
              avatar: URL.createObjectURL(newData.avatar),
            }),
          },
        });
      }

      return { previous };
    },

    // 롤백
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        qc.setQueryData([QUERY_KEY.myInfo], context.previous);
      }
    },

    // 최종 재검증
    onSettled: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
  });
}
