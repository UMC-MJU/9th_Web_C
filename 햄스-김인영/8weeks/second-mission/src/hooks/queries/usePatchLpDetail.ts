import { useMutation, useQueryClient } from "@tanstack/react-query"
import { patchLpDetail } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { RequestCreateLp } from "../../types/lp";

export const usePatchLpDetail = (lpid: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: RequestCreateLp) => patchLpDetail(lpid, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpDetail, lpid] });
      alert("LP 수정 완료!");
    }
  })
}
