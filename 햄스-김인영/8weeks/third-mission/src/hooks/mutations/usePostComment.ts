import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { RequestPostComment } from "../../types/lp";
import { postLpComment } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export const usePostComment = (lpId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (body: RequestPostComment) => postLpComment(body),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comments, lpId] });
    },
    onError: (error) => {
      console.error("댓글 등록 실패:", error);
      alert("댓글 등록 중 오류가 발생했습니다.");
    },
  });

  return mutation;
};
