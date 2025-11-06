import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const Navbar = () => {
  const { accessToken } = useContext(AuthContext);

  return (
    <div className="flex justify-between gap-3 p-3 bg-gray-200 h-14">
      {accessToken &&
        <>
          <div className="flex items-center">
            <svg width="43" height="43" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M7.95 11.95h32m-32 12h32m-32 12h32" />
            </svg>
          </div>
          <div className="flex items-center justify-center gap-4">
            <p className="font-semibold text-[15px]">님 반갑습니다.</p>
            <NavLink className="flex items-center justify-center w-20 h-8 bg-gray-600 
          rounded-2xl text-white font-semibold text-sm" to='/login'>
              로그아웃
            </NavLink>
          </div>
        </>
      }
      {!accessToken &&
        <>
          <div className="flex items-center">
            <svg width="43" height="43" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M7.95 11.95h32m-32 12h32m-32 12h32" />
            </svg>
          </div>
          <div className="flex items-center justify-center gap-4">
            <NavLink className="flex items-center justify-center w-20 h-8 bg-gray-600 
        rounded-2xl text-white font-semibold text-sm" to='/login'>
              로그인
            </NavLink>
            <NavLink className="flex items-center justify-center w-20 h-8 bg-blue-300 
        rounded-2xl text-white font-semibold text-sm" to='/signup'>
              회원가입
            </NavLink>
          </div>
        </>
      }
    </div>
  )
}

export default Navbar;
