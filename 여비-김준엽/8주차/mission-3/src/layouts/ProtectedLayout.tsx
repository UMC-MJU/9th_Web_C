// src/layouts/ProtectedLayout.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((o) => !o);

  // ② 윈도우 리사이즈 감지해서 768px 이상이면 열고, 작으면 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(true);
      else setSidebarOpen(false);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 마운트 시 초기화
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!accessToken) {
    // 로그인 안 된 경우 /login으로 보냄
    return <Navigate to="/login" state={location} replace />;
  }

  // 인증 통과 시, HomeLayout이 그렸던 네비·사이드바·푸터 구조 안에서
  // Outlet(=자식 페이지)이 렌더됩니다.

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {/* Navbar에 토글 함수 전달 */}
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        {/* ③ sidebarOpen 상태에 따라 block/hidden */}
        <div
          className={`
            flex-shrink-0
            transition-all duration-300 ease-in-out
            ${sidebarOpen ? "w-64" : "w-0"}
            overflow-hidden
          `}
        >
          <Sidebar />
        </div>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProtectedLayout;
