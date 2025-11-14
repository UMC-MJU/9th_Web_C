import { createContext, useState, useEffect, type PropsWithChildren } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { getMyInfo } from "../apis/auth";

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
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setUser: (user: UserInfo | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  user: null,
  setAccessToken: () => {},
  setRefreshToken: () => {},
  setUser: () => {},
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
        setAccessToken: (token) => {
          setAccessToken(token);
          token ? setAccessTokenFromStorage(token) : removeAccessTokenFromStorage();
        },
        setRefreshToken: (token) => {
          setRefreshToken(token);
          token ? setRefreshTokenFromStorage(token) : removeRefreshTokenFromStorage();
        },
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
