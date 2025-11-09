import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layout/RootLayout";
import { LoginPage } from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import { MyPage } from "../pages/MyPage";
import { ProtectedLayout } from "../layout/ProtectedLayout";
import { GoogleLoginRedirectPage } from "../pages/GoogleLoginRedirectPage";
import MainPage from "../pages/MainPage";
import { LpDetailPage } from "../pages/LpDetailPage";


const NotFound = () => (
  <main className="p-10">
    <h1>페이지를 찾을 수 없어요. (404)</h1>
    <p>주소를 다시 확인하거나 홈으로 이동해 주세요.</p>
    <a href="/">홈으로</a>
  </main>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/mypage",
            element: <MyPage />,
          },
        ],
      },
      {
        path: '/v1/auth/google/callback',
        element: <GoogleLoginRedirectPage />,
      },
      {
        path: '/lp/:lpid',
        element: <LpDetailPage />,
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }
])

export default router;