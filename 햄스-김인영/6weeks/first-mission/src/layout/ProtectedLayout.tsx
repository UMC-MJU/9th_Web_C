import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedLayout = () => {
  const {accessToken} = useContext(AuthContext);

  if(!accessToken){
    alert("로그인이 필요한 서비스입니다! 로그인을 해주세요!");
    return <Navigate to="/login" replace />
  }
  return (
    <Outlet />
  )
}
