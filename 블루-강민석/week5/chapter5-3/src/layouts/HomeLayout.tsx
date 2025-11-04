import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      {/* 네비게이션 바 */}
      <Navbar />
      <main className="flex-1 min-h-screen bg-black text-white">
        <Outlet />
      </main>
      <footer>푸터</footer>
    </div>
  );
};

export default HomeLayout;
