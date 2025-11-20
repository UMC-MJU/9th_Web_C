import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { patchLpComment } from "../../apis/lp";

export const usePatchComment = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      commentId,
      content,
    }: { 
      commentId: number,
      content: string,
    }) =>
      patchLpComment(lpId, commentId, content),
    onSuccess: async () => {
      await queryClient.refetchQueries({
         queryKey: [QUERY_KEY.comments, lpId]
      });
    },
    onError: (err) => {
      alert("댓글 수정 중 오류가 발생했습니다.");
      console.error(err);
    },
  });
};
