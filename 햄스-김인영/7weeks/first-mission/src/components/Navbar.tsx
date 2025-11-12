import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { getMyInfo } from "../apis/auth";

type NavbarProps = {
  onToggleSidebar: () => void,
  isSidebarOpen: boolean,
}

export const Navbar = ({ onToggleSidebar, isSidebarOpen } : NavbarProps) => {
  const { accessToken } = useContext(AuthContext);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (accessToken) {
          const user = await getMyInfo();
          setUserName(user.data.name);
        }
      } catch (error) {
        console.error("내 정보 불러오기 실패:", error);
      }
    };
    fetchUser();
  }, [accessToken]);

  return (
    <div className="relative">
      <div className="flex justify-between gap-3 p-3 bg-gray-200 h-14">
        <div className="flex items-center"
          onClick={onToggleSidebar}>
          <svg width="35" height="35" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M7.95 11.95h32m-32 12h32m-32 12h32" />
          </svg>
        </div>
        {accessToken ? (
          <div className="flex items-center justify-center gap-4">
            <p className="font-semibold text-[15px]">{userName}님 반갑습니다.</p>
            <NavLink
              className="flex items-center justify-center w-20 h-8 bg-gray-600 
              rounded-2xl text-white font-semibold text-sm"
              to="/login"
            >
              로그아웃
            </NavLink>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <NavLink
              className="flex items-center justify-center w-20 h-8 bg-gray-600 
              rounded-2xl text-white font-semibold text-sm"
              to="/login"
            >
              로그인
            </NavLink>
            <NavLink
              className="flex items-center justify-center w-20 h-8 bg-blue-300 
              rounded-2xl text-white font-semibold text-sm"
              to="/signup"
            >
              회원가입
            </NavLink>
          </div>
        )}
      </div>
      <div className="transition-all duration-300 ease-in-out
            md:translate-x-0 md:opacity-100
            -translate-x-full opacity-0">
        <Sidebar isOpen={isSidebarOpen} onClose={onToggleSidebar} />
      </div>
    </div>
  )
}

export default Navbar;
