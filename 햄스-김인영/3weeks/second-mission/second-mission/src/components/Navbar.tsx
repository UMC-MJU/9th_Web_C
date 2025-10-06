import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex gap-5 pt-5 pl-8">
      <NavLink className={({ isActive }) => {
        return isActive ? 'text-[#a3cca2]' : 'text-gray-500';
      }} to='/'>홈</NavLink>
      <NavLink className={({ isActive }) => {
        return isActive ? 'text-[#a3cca2]' : 'text-gray-500';
      }} to='/movies/popular'>인기 영화</NavLink>
      <NavLink className={({ isActive }) => {
        return isActive ? 'text-[#a3cca2]' : 'text-gray-500';
      }} to='/movies/now_playing'>상영 중</NavLink>
      <NavLink className={({ isActive }) => {
        return isActive ? 'text-[#a3cca2]' : 'text-gray-500';
      }} to='/movies/top_rated'>평점 높은</NavLink>
      <NavLink className={({ isActive }) => {
        return isActive ? 'text-[#a3cca2]' : 'text-gray-500';
      }} to='/movies/upcoming'>개봉 예정</NavLink>
    </div>
  )
}

export default Navbar;