// src/components/Navbar.tsx
import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
// (예시) auth 상태를 제공하는 훅
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const { logout, accessToken } = useAuth(); // 로그인한 유저 정보와 로그아웃 함수
  const qc = useQueryClient();

  // ① accessToken이 null(로그아웃) 되면 myInfo 캐시 삭제
  useEffect(() => {
    if (!accessToken) {
      qc.removeQueries({
        queryKey: [QUERY_KEY.myInfo],
        exact: true,
      });
    }
  }, [accessToken, qc]);
  // 실제 사용자 정보(payload)만 담을 상태
  // React-Query 로 사용자 정보 구독
  const { data: myInfoRes, isLoading: myInfoLoading, error: myInfoError } = useGetMyInfo(accessToken);
  const me = myInfoRes?.data;

  return (
    <header className="flex items-center bg-gray-900 px-6 py-4 text-white">
      {/* 햄버거 아이콘 */}
      <button
        onClick={onToggleSidebar}
        className="p-2 hover:bg-gray-800 rounded"
        aria-label="메뉴 열기/닫기"
      >
        {/* inline SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* 로고(홈으로 이동) */}
      <Link
        to="/"
        className="ml-4 text-2xl font-bold text-pink-500"
      >
        MyApp
      </Link>

      {/* 우측 공간을 밀어내기 위해 빈 flex-grow */}
      <div className="flex-1" />

      {/* 오른쪽 메뉴 그룹 */}
      <nav className="flex items-center space-x-4">
        {/* 검색 아이콘(언제나 보임) */}
        <NavLink
          to="/search"
          className="hover:text-pink-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 3 10.5a7.5 7.5 0 0 0 13.65 6.15z"
            />
          </svg>
        </NavLink>

        {myInfoLoading ? (
          <span>Loading...</span>
        ) : me ? (
          <>
            {/* 로그인 상태: 인사말 + 로그아웃 */}
            <span>{me.name}님 반갑습니다.</span>
            <button
              onClick={logout}
              className="px-4 py-1 border border-white rounded hover:bg-white hover:text-black transition"
            >
              로그아웃
            </button>
          </>
        ) : myInfoError ? (
          <span>사용자 정보를 불러올 수 없습니다.</span>
        ) : (
          <>
            {/* 비로그인 상태: 로그인 + 회원가입 */}
            <NavLink
              to="/login"
              className="hover:underline"
            >
              로그인
            </NavLink>
            <Link
              to="/signup"
              className="px-4 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
            >
              회원가입
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
