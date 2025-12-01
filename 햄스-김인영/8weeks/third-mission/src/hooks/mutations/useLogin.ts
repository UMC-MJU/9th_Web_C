import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { postSignin, getMyInfo } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setAccessToken, setRefreshToken, setUser } = useContext(AuthContext);

  return useMutation({
    mutationFn: postSignin,
    onSuccess: async (data) => {
      const newAccessToken = data.data.accessToken;
      const newRefreshToken = data.data.refreshToken;

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      const myInfo = await getMyInfo();
      queryClient.setQueryData([QUERY_KEY.myInfo], myInfo.data);
      setUser(myInfo.data);

      alert("로그인 성공!");
    },
    onError: (err) => {
      console.error("로그인 실패:", err);
      alert("이메일 또는 비밀번호를 확인해주세요.");
    },
  });
};
