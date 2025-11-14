import { createContext, useState, useEffect, type PropsWithChildren } from "react";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postSignin, getMyInfo } from "../apis/auth";

interface UserInfo {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
}

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserInfo | null;
  login: (signInData: RequestSigninDto) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  user: null,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenFromStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenFromStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );
  const [user, setUser] = useState<UserInfo | null>(null);

  //로그인 함수
  const login = async (signInData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signInData);

      if (data) {
        const newAccessToken: string = data.accessToken;
        const newRefreshToken: string = data.refreshToken;

        setAccessTokenFromStorage(newAccessToken);
        setRefreshTokenFromStorage(newRefreshToken);
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);

        //로그인 직후 내 정보 불러오기
        const myInfo = await getMyInfo();
        setUser(myInfo.data);
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getMyInfo()
        .then((res) => setUser(res.data))
        .catch((err) => console.error("유저 정보 불러오기 실패:", err));
    }
  }, [accessToken]);

  const logout = () => {
    removeAccessTokenFromStorage();
    removeRefreshTokenFromStorage();
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
