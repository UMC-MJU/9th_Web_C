import { useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { IsError } from "../components/IsError";
import { LpCard } from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useDebounce } from "../hooks/useDebounce";
import searchIcon from "../assets/search.png";
import useSearchInfiniteLpList from "../hooks/queries/useSearchInfiniteLpList";
import { useThrottle } from "../hooks/useThrottle";

export default function MainPage() {
  const [order, setOrder] = useState<"newest" | "oldest">("newest");
  const [search, setSearch] = useState("");

  const debouncedValue = useDebounce(search, 500);

  const isSearchActive = debouncedValue.trim().length > 0;

  const orderButton =
    order === "newest" ? "asc" : "desc";

  //기본 전체 리스트
  const defaultQuery = useGetInfiniteLpList({
    limit: 15,
    search: "",
    order: orderButton,
  });

  //검색 리스트
  const searchQuery = useSearchInfiniteLpList({
    limit: 15,
    search: debouncedValue,
    order: orderButton,
    enabled: isSearchActive,
  });

  //현재 적용될 쿼리 선택
  const activeQuery = isSearchActive ? searchQuery : defaultQuery;

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = activeQuery;

  const throttledFetchNextPage = useThrottle(() => {
  if (hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
}, 800); // 0.8초 동안 1번만 실행


  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        throttledFetchNextPage();
      }
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [throttledFetchNextPage]);

  const lpList = data?.pages.flatMap((page) => page.data.data);

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2 absolute top-1 left-1 m-4 ml-5">
        <img src= {searchIcon} className="w-6 h-6"/>
        <input 
        value={search} 
        className="w-70 h-8 border rounded-sm pl-3"
        onChange={(e) => setSearch(e.target.value)}/>
      </div>
      <div className="absolute top-1 right-1 m-3 mr-5 gap-2 text-sm text-white font-semibold
        disabled:cursor-not-allowed">
        <button
          onClick={() => setOrder("oldest")}
          className={`px-3 py-2 rounded-xl mr-2 ${order === "oldest"
            ? "bg-blue-400 text-white"
            : "bg-gray-600 text-white hover:bg-gray-600"
            }`}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder("newest")}
          className={`px-3 py-2 rounded-xl ${order === "newest"
            ? "bg-blue-400 text-white"
            : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
        >
          최신순
        </button>
      </div>

      {isLoading ? (
        <div className="h-full flex justify-center items-center">
          <LoadingSpinner />
        </div>) : isError || !data ? (
          <IsError refetch={refetch} />
        ) : (
        <div className="flex flex-wrap gap-2 justify-center mt-17 mb-5">
          {lpList?.map((lp: any) => <LpCard key={lp.id} lp={lp} />)}
          {isFetchingNextPage && <LpCardSkeletonList count={5} />}
        </div>
      )}

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
