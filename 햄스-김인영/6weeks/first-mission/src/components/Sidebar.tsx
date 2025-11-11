import { NavLink } from "react-router-dom"

export const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <>
      <div onClick={onClose} className={`
          fixed inset-0 z-0
          transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}></div>
      <div className={`absolute top-full left-0 w-50 h-[calc(100vh-3.5rem)]
                   bg-gray-600 text-white font-semibold text-[15px] z-10
                     transform transition-all duration-300 ease-in-out
                    ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}>
        <div className="flex flex-col items-start gap-4 p-5">
          <div className="border-b border-gray-500 pb-2 w-full">검색</div>
          <NavLink to="/mypage">마이페이지</NavLink>
        </div>
      </div>
    </>
  );
};