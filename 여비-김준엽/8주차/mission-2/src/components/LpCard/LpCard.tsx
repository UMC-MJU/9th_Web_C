import { useNavigate } from "react-router-dom";
import { Lp } from "../../types/lp";
import { useAuth } from "../../context/AuthContext";

type LpId = Lp["id"];

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  // 카드 클릭 핸들러
  const handleCardClick = (id: LpId) => {
    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      navigate("/login");
      return;
    }
    navigate(`/lps/${id}`);
  };
  return (
    <div
      onClick={() => handleCardClick(lp.id)}
      className="
                group relative rounded-lg overflow-hidden shadow-lg
                transform hover:scale-105 transition-all duration-300
                cursor-pointer
              "
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full h-48"
      />

      {/* Hover overlay */}
      <div
        className="
                  absolute inset-0 bg-black/50
                  flex flex-col justify-end p-4
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                "
      >
        <h3 className="text-white text-lg font-bold">{lp.title}</h3>
        <p className="text-gray-300 text-sm">
          {new Date(lp.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-300 text-sm flex items-center">
          ❤️ <span className="ml-1">{lp.likes.length}</span>
        </p>
      </div>
    </div>
  );
};

export default LpCard;
