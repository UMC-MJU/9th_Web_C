import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUsers } from "../../apis/user";

export const useDeleteUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUsers,
    onSuccess: () => {
      queryClient.clear();
      alert("회원 탈퇴가 완료되었습니다!");
      window.location.href = "/login";
    },
    onError: (error) => {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴 중 오류가 발생했습니다.");
    },
  })
}
