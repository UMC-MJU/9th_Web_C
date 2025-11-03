import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import MyPage from "./pages/MyPage.tsx";
import { AuthProvider } from "./context/AuthContext";

// 라우터 정의: 공개 라우트 + 보호 라우트 구성
const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      {
        element: <ProtectedLayout />,
        children: [{ path: "my", element: <MyPage /> }],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

// 앱 루트 컴포넌트
// - 인증 컨텍스트로 전역 상태 제공
// - 라우터 프로바이더로 라우팅 처리
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
