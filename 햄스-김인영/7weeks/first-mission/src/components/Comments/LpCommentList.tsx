import { useRef, useEffect, useState } from "react";
import useGetCommentList from "../../hooks/queries/useGetCommentList";
import CommentSkeleton from "./CommentSkeleton";
import { useParams } from "react-router-dom";
import { usePostComment } from "../../hooks/queries/usePostComment";

export default function LpCommentList() {
  const { lpid } = useParams<{ lpid: string }>();
  const numberId = Number(lpid);
   const [commentText, setCommentText] = useState("");

  const [order, setOrder] = useState<"newest" | "oldest">("newest");
  const orderButton = order === "newest" ? "asc" : "desc";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetCommentList({
    lpid: numberId,
    limit: 10,
    order: orderButton,
  });

  //댓글 등록 useMutation
  const { mutate: createComment } = usePostComment(numberId);

  const commentList = data?.pages.flatMap((p) => p.data.data) ?? [];

  const handleSubmitComment = () => {
    if (!commentText.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    createComment({
      lpId: numberId,
      content: commentText.trim(),
    });
    setCommentText("");
  };

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, order]);

  return (
    <div className="flex flex-col bg-gray-500 w-[700px] rounded-2xl p-6 mt-5">

      {/* 정렬 버튼 */}
      <div className="flex justify-between gap-2 text-[12px] text-white font-semibold
        disabled:cursor-not-allowed mb-3">
        <div className="text-white text-sm font-semibold pt-1.5">댓글</div>
        <div>
          <button
            onClick={() => setOrder("oldest")}
            className={`px-2 py-1 rounded-xl mr-3 ${order === "oldest"
              ? "bg-blue-400 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder("newest")}
            className={`px-3 py-1 rounded-xl ${order === "newest"
              ? "bg-blue-400 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
          >
            최신순
          </button>
        </div>
      </div>

      <div className="flex items-center w-[670px] gap-3 pr-3">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        placeholder="댓글을 입력해 주세요."
        className="flex-1 bg-gray-200 text-sm p-1 pl-2 rounded-md placeholder-gray-400 text-gray-600 outline-none"
        />
        <button
          className="px-3 py-1 text-white bg-gray-700 rounded-md 
        text-sm font-semibold hover:bg-gray-600"
          onClick={handleSubmitComment}>
          작성
        </button>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {isLoading ? (
          <p className="text-gray-600 font-semibold">로딩 중...</p>
        ) : (
          commentList.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3">
              <img
                src={comment.author?.avatar || "/default-profile.png"}
                alt={comment.author?.name || "작성자"}
                className="w-7 h-7 rounded-full border border-gray-600 object-cover mt-1.5"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-white">{comment.author?.name}</p>
                <p className="text-[13px] text-gray-100">{comment.content}</p>
              </div>
            </div>
          ))
        )}

        {isFetchingNextPage && <CommentSkeleton count={3} />}
      </div>
      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
}
