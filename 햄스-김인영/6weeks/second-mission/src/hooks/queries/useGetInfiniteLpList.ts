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
    queryFn: async ({ pageParam = 0 }) => {
      await new Promise((resolve) => setTimeout(resolve, 1500)); //skeleton UI 확인용 딜레이
      return getLpList({ cursor: pageParam, limit, search, order })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      console.log(lastPage, allPages)
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteLpList;
