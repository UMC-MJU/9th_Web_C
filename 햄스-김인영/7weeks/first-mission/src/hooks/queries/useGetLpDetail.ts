import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { LpDetail } from "../../types/lp";

export const useGetLpDetail = (lpid: number) => {
  return useQuery<LpDetail>({
    queryKey: [QUERY_KEY.lpDetail, lpid],
    queryFn: () => getLpDetail(lpid),

    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 10,
  });
};