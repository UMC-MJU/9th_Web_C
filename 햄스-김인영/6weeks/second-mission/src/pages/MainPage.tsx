import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { IsError } from "../components/IsError";
import { LpCard } from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

export default function MainPage() {
  const [order, setOrder] = useState<"newest" | "oldest">("newest");

  const orderButton =
    order === "newest" ? "asc" : "desc";

  const { data, isLoading, isError, refetch, isFetching } = useGetLpList({
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
      <IsError refetch={refetch} />
    )
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
        {data?.map((lp : any) => <LpCard lp={lp}/>)}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
    </div>
  );
}
