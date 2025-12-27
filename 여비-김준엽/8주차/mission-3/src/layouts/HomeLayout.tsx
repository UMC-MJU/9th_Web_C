// src/layouts/HomeLayout.tsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function HomeLayout() {
  // ① 사이드바 열림 여부 상태
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
}
