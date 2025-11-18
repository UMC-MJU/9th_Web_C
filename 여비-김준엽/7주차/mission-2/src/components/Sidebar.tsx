// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col space-y-4">
      <NavLink
        to="/search"
        className={({ isActive }) =>
          `block px-3 py-2 rounded hover:bg-gray-800 transition ${
            isActive ? "bg-gray-800" : ""
          }`
        }
      >
        🔍 찾기
      </NavLink>
      <NavLink
        to="/my"
        className={({ isActive }) =>
          `block px-3 py-2 rounded hover:bg-gray-800 transition ${
            isActive ? "bg-gray-800" : ""
          }`
        }
      >
        👤 마이페이지
      </NavLink>
    </aside>
  );
}
