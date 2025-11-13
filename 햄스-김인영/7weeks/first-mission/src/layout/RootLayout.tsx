import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FloatingButton } from "../components/FloatingButton";

export const RootLayout = () => {
  // 사이드바 상태 Root에서 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 transition-all duration-300">
      <Navbar onToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-1 relative">
        <main
          className={`flex-1 flex justify-center pt-14 transition-all duration-300 ease-in-out ${isSidebarOpen ?
             "md:ml-[200px]" : "ml-0"
            }`}
        >
          <Outlet />
        </main>
      </div>
      <FloatingButton />
    </div>
  );
};

export default RootLayout;
