import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex justify-end gap-3 p-3 pl-8 bg-gray-200">
      <NavLink className="flex items-center justify-center w-20 h-8 bg-gray-500 
      rounded-2xl text-white font-semibold text-sm" to='/login'>
        로그인
      </NavLink>
      <NavLink className="flex items-center justify-center w-20 h-8 bg-blue-300 
      rounded-2xl text-white font-semibold text-sm" to='/signup'>
        회원가입
      </NavLink>
    </div>
  )
}

export default Navbar;
