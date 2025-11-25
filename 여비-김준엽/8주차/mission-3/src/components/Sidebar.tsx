// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";
import { Home, Search, User, Heart, Library } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  // 로그인 상태 확인
  const { accessToken } = useAuth();

  return (
    <aside className="w-64 h-full bg-black text-white flex flex-col">
      {/* 상단 네비게이션 메뉴 */}
      <nav className="flex-1 overflow-y-auto p-2">
        {/* 홈 메뉴 */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg mb-1 transition-colors group relative ${
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-900"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {/* 활성 상태일 때 왼쪽에 강조 표시 */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-pink-500 rounded-r-full" />
              )}
              <Home
                className={`w-6 h-6 ${
                  isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                }`}
              />
              <span className="font-medium">홈</span>
            </>
          )}
        </NavLink>

        {/* 검색 메뉴 (홈페이지로 연결 - 검색 기능이 홈페이지에 있음) */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg mb-1 transition-colors group relative ${
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-900"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {/* 활성 상태일 때 왼쪽에 강조 표시 */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-pink-500 rounded-r-full" />
              )}
              <Search
                className={`w-6 h-6 ${
                  isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                }`}
              />
              <span className="font-medium">검색</span>
            </>
          )}
        </NavLink>

        {/* 로그인 상태일 때만 표시되는 메뉴들 */}
        {accessToken && (
          <>
            {/* 마이페이지 메뉴 */}
            <NavLink
              to="/my"
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg mb-1 transition-colors group relative ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* 활성 상태일 때 왼쪽에 강조 표시 */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-pink-500 rounded-r-full" />
                  )}
                  <User
                    className={`w-6 h-6 ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  />
                  <span className="font-medium">마이페이지</span>
                </>
              )}
            </NavLink>

            {/* 좋아요한 LP 메뉴 */}
            <NavLink
              to="/my"
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg mb-1 transition-colors group relative ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* 활성 상태일 때 왼쪽에 강조 표시 */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-pink-500 rounded-r-full" />
                  )}
                  <Heart
                    className={`w-6 h-6 ${
                      isActive
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  />
                  <span className="font-medium">좋아요한 LP</span>
                </>
              )}
            </NavLink>

            {/* 라이브러리 메뉴 */}
            <div className="mt-8 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-4 px-4 py-3 rounded-lg mb-1 text-gray-400 hover:text-white hover:bg-gray-900 transition-colors cursor-pointer group">
                <Library className="w-6 h-6 text-gray-400 group-hover:text-white" />
                <span className="font-medium">내 라이브러리</span>
              </div>
            </div>
          </>
        )}
      </nav>
    </aside>
  );
}
