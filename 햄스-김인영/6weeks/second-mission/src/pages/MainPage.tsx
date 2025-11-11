import { useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { IsError } from "../components/IsError";
import { LpCard } from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";

export default function MainPage() {
  const [order, setOrder] = useState<"newest" | "oldest">("newest");

  const orderButton =
    order === "newest" ? "asc" : "desc";

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetInfiniteLpList({
    limit: 15,
    search: "",
    order: orderButton,
  });

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }
  if (isError || !data) {
    return (
      <IsError refetch={refetch} />
    )
  }

  const lpList = data.pages.flatMap((page) => page.data.data);

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
        {lpList.map((lp: any) => <LpCard key={lp.id} lp={lp} />)}
        {isFetchingNextPage && <LpCardSkeletonList count={5} />}
      </div>

      <div ref={sentinelRef} style={{ height: 1 }} />

      {/* 로딩 / 더보기 상태 표시 */}
      <div className="flex justify-center items-center h-16 text-gray-400 text-sm">
        {isFetchingNextPage ? (
          <p>로딩 중...</p>
        ) : hasNextPage ? (
          <p>스크롤을 내리면 더 불러와요...</p>
        ) : (
          <p>더 이상 게시물이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
