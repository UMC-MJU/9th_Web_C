import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export const useDeleteLp = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteLp(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      alert("LP 삭제 완료!");
      window.location.href = "/";
    },
  });
};
