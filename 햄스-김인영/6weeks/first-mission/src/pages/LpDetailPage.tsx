import { useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { LoadingSpinner } from "../components/LoadingSpinner";
import pencil from '../assets/pencil.png'
import trash from '../assets/trash-can.png'
import { IsError } from "../components/isError";

export const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const numberId = Number(lpid);

  const { data: lp, isLoading, isError, refetch } = useGetLpDetail(numberId);

  if (isLoading) return <LoadingSpinner />;
  if (isError || !lp) return <IsError refetch={refetch}/>;
  const daysAgo = Math.floor(
    (Date.now() - new Date(lp.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="flex item-center justify-center mt-5">
      <div className="flex flex-col items-center bg-gray-400 w-[700px] rounded-2xl p-6 shadow-[0_0_25px_rgba(0,0,0,0.7)]">

        <div className="flex items-center justify-between w-full max-w-[700px]">
          <div className="flex items-center gap-3">
            <img
              src={lp?.author?.avatar || "/default-profile.png"}
              alt={lp?.author?.name || "작성자"}
              className="w-10 h-10 rounded-full border border-gray-500 object-cover"
            />
            <div>
              <p className="font-semibold text-white">{lp.author?.name || "알 수 없음"}</p>
            </div>
          </div>
          <p className="text-white text-sm">{daysAgo === 0 ? "오늘" : `${daysAgo}일 전`}</p>
        </div>
        <div className="flex justify-end w-full gap-2 m-2">
          <img src={pencil} className="w-4"/>
          <img src={trash} className="w-4"/>
        </div>

        <div className=" flex items-center justify-center w-[350px] h-[350px] border-gray-800 shadow-2xl mb-9 mt-2.5">
          <div className="relative w-[300px] h-[300px]">
      
            <div
              className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-500 shadow-2xl"
              style={{
                backgroundImage: `url(${lp.thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
            
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-white rounded-full shadow-inner"></div>
              </div>
            </div>
          </div>
        </div>

        <p className="max-w-[700px] text-center text-white leading-relaxed mb-6 text-sm">
          {lp.content}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {lp.tags?.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-gray-600 rounded-full text-sm text-gray-200 hover:bg-gray-500 transition"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button className="text-pink-600 text-lg hover:scale-120 transition">
            ♡
          </button>
          <span className="text-white">{lp.likes?.length || 0}</span>
        </div>
      </div>
    </div>
  );
}
