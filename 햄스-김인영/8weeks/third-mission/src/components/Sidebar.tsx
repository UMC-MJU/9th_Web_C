import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { UserDeleteModal } from "./Modal/UserDeleteModal";

interface SidebarProps {
  isOpen: boolean;
  close: () => void;
}

export const Sidebar = ({ isOpen, close }: SidebarProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen){
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }; //컴포넌트가 사라질 때 자동으로 제거, 이벤트 중복 호출을 막기 위해!
  }, [isOpen, close])

  //스크롤 잠그기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; //복원
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);


  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-[5]
      ${isOpen ? "opacity-40 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      ></div>
      <div
        className={`fixed top-14 left-0 w-64 h-[calc(100vh-3.5rem)]
      bg-gray-600 text-white font-semibold text-[15px] z-10
      transform transition-all duration-300 ease-in-out
      ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
      >
      <div className="flex flex-col items-start gap-4 p-5">
        <div className="border-b border-gray-500 pb-2 w-full">검색</div>
        <NavLink to="/mypage">마이페이지</NavLink>
        <div onClick={() => setIsModalOpen(true)}>탈퇴하기</div>
        {isModalOpen && <UserDeleteModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  </>
);

};