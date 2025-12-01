import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { deleteLpComment } from "../../apis/lp";

export const useDeleteComment = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId }: { commentId: number}) =>
      deleteLpComment(lpId, commentId),
    onSuccess: async () => {
      await queryClient.refetchQueries({
         queryKey: [QUERY_KEY.comments, lpId]
      });
    },
    onError: (err) => {
      alert("댓글 삭제 중 오류가 발생했습니다.");
      console.error(err);
    },
  });
};