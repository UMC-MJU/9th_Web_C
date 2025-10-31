import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layout/RootLayout";
import { LoginPage } from "../pages/LoginPage";

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
        path: '/login',
        element: <LoginPage />,
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }
])

export default router;