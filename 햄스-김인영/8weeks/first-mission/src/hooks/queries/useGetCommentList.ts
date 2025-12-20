import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getCommentList } from "../../apis/lp";

type UseGetCommentListProps = {
  lpid: number;
  limit: number;
  order: "asc" | "desc";
};

function useGetCommentList({ lpid, limit, order }: UseGetCommentListProps) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.comments, lpid, order],
    queryFn: async ({ pageParam = 0 }) => {
      await new Promise((r) => setTimeout(r, 1500));
      return getCommentList(lpid, { cursor: pageParam, limit, order });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { hasNext, nextCursor } = lastPage.data;
      return hasNext ? nextCursor : undefined;
    },
  });
}

export default useGetCommentList;
