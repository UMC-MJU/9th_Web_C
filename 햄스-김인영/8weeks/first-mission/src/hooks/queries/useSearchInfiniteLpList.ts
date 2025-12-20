import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

type UseSearchInfiniteLpListProps = {
  limit: number;
  search: string;
  order: "asc" | "desc";
  enabled: boolean;
};

export default function useSearchInfiniteLpList({
  limit,
  search,
  order,
  enabled,
}: UseSearchInfiniteLpListProps) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, "search", search, order],
    queryFn: async ({ pageParam = 0 }) => {
      return getLpList({ cursor: pageParam, limit, search, order });
    },

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },

    enabled, //검색어 있을 때만 실행!
  });
}
