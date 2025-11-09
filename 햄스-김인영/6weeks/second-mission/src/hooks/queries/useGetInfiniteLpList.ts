import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

type UseGetInfiniteLpListProps = {
  limit: number;
  search: string;
  order: "asc" | "desc";
};

function useGetInfiniteLpList({ limit, search, order }: UseGetInfiniteLpListProps) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpList({ cursor: pageParam, limit, search, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      console.log(lastPage, allPages)
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteLpList;
