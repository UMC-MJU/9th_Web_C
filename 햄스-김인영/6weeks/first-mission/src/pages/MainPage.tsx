import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLpList";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function MainPage() {
  const [order, setOrder] = useState<"newest" | "oldest">("newest");
  const navigate = useNavigate();

  const orderButton =
    order === "newest" ? "asc" : "desc";

  const { data, isLoading, isError, refetch } = useGetLpList({
    cursor: 0,
    search: "",
    order: orderButton,
    limit: 20,
  });

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }
  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-gray-600 font-medium">목록을 불러오지 못했습니다.</p>
        <button
          onClick={() => refetch()}
          className="px-5 py-2 bg-blue-300 hover:bg-blue-400 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
        >
          다시 시도하기
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end m-4 mr-19 gap-2 text-sm text-white font-semibold
        disabled:cursor-not-allowed">
        <button
          onClick={() => setOrder("oldest")}
          className={`px-3 py-2 rounded-xl ${order === "oldest"
            ? "bg-blue-300 text-white"
            : "bg-gray-600 text-white hover:bg-gray-600"
            }`}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder("newest")}
          className={`px-3 py-1 rounded-xl ${order === "newest"
            ? "bg-blue-300 text-white"
            : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
        >
          최신순
        </button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-5r">
        {data?.map((lp : any) => (
          <div
            key={lp.id}
            className="relative w-[220px] h-[220px] cursor-pointer overflow-hidden shadow-md rounded-lg group 
                 transform transition-transform duration-500 hover:scale-110"
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
        ))}
      </div>
    </div>
  );
}
