import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { patchUsers } from "../../apis/user";

export const usePatchUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUsers,
    onSuccess: async (data) => {
      console.log("PATCH 성공:", data);
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo, data]
      });
      alert("프로필이 수정되었습니다!");
    },
    onError: (error) => {
      console.error("프로필 수정 실패:", error);
      alert("프로필 수정 중 오류가 발생했습니다.");
    },
  });
};
