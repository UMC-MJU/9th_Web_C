import { useMutation } from "@tanstack/react-query";
import { postComment } from "../../apis/comment";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostComment() {
  return useMutation({
    mutationFn: postComment,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, variables.lpId],
      });
    },
  });
}

export default usePostComment;
