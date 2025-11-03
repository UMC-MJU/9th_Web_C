import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-3 bg-black text-white">
      {/* 왼쪽 타이틀 */}
      <Link to="/" className="text-pink-400 text-xl font-bold">
        띵vbar
      </Link>

      {/* 오른쪽 버튼들 */}
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="bg-black text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
        >
          로그인
        </Link>
        <Link
          to="/signup"
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
        >
          회원가입
        </Link>
      </div>
    </nav>
  );
}
