import { useNavigate } from "react-router-dom";
import type { Lp } from "../../types/lp"

interface LpCardProps {
  lp: Lp;
}
export const LpCard = ({lp}: LpCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      key={lp.id}
      className="relative w-[220px] h-[220px] cursor-pointer overflow-hidden shadow-md rounded-lg group 
                 transform transition-transform duration-500 hover:scale-110 hover:z-50"
      onClick={() => navigate(`/lp/${lp.id}`)}
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-52 object-cover"
      />

      <div className="absolute inset-0 flex flex-col justify-end p-3 bg-black/0 group-hover:bg-black/40 transition-all duration-300">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-white font-semibold text-sm truncate">{lp.title}</h2>
          <p className="flex justify-between text-gray-300 text-xs mt-1">
            {new Date(lp.createdAt).toLocaleDateString("ko-KR")}
            <span className="text-white">♡{lp.likes?.length || 0}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
