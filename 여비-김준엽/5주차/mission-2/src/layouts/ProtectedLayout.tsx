import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// 인증이 필요한 레이아웃 컴포넌트
// - 액세스 토큰이 없으면 로그인 페이지로 리다이렉트
// - 토큰이 있으면 자식 라우트(Outlet)를 렌더링
const ProtectedLayout = () => {
    // 인증 컨텍스트에서 토큰을 가져오기
    const { accessToken } = useAuth();

    // 토큰이 없으면 로그인 페이지로 이동
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    // 인증된 경우 자식 라우트 출력
    return <Outlet />;
};

export default ProtectedLayout;