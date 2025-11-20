import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";
import { deleteLike, postLike } from "../apis/likes";

export const useToggleLike = (lpId: number, isLiked: boolean) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => (isLiked ? deleteLike(lpId) : postLike(lpId)),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lpDetail, lpId] });

      const previous = queryClient.getQueryData<any>([
        QUERY_KEY.lpDetail,
        lpId,
      ]);

      if (!previous) return { previous };

      const updated = {
        ...previous,
        likes: isLiked
          ? previous.likes.slice(1)
          : [...previous.likes, { dummy: true }],
      };
      queryClient.setQueryData([QUERY_KEY.lpDetail, lpId], updated);

      return { previous };
    },

    onError: (_error, _var, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          [QUERY_KEY.lpDetail, lpId],
          context.previous
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpDetail, lpId],
      });
    },
  });
};
