// src/pages/LpDetailPage3.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";

import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import useGetInfiniteCommentList from "../hooks/queries/useGetInfiniteCommentList";

import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import Comment from "../components/Comment/Comment";
import CommentSkeletonList from "../components/Comment/CommentSkeletonList";

import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import type { Likes } from "../types/lp";

export default function LpDetailPage3() {
  const { lpId } = useParams<{ lpId: string }>();
  const id = Number(lpId);
  const { accessToken } = useAuth();

  // 1. LP 상세 조회
  const { data: lpResponse, isLoading, isError } = useGetLpDetail({ lpId: id });
  const lp = lpResponse?.data;

  // 2. 내 정보 조회
  const { data: meResponse } = useGetMyInfo(accessToken);
  const myId = meResponse?.data.id;

  // 3. 좋아요 / 취소
  const { mutate: postLike } = usePostLike();
  const { mutate: deleteLike } = useDeleteLike();
  const isLiked = lp?.likes.some((l: Likes) => l.userId === myId);
  const toggleLike = () => {
    if (!id) return;
    if (isLiked) deleteLike({ lpId: id });
    else postLike({ lpId: id });
  };

  // 4. 댓글 무한 스크롤
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const pageSize = 10;
  const {
    data: commentPages,
    isLoading: commentsLoading,
    isError: commentsError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetInfiniteCommentList(id, pageSize, order);
  const { ref: endRef, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 5. 로딩/오류 처리
  if (isLoading) return <LoadingSpinner />;
  if (isError || !lp) return <div>Not Found</div>;

  return (
    <div className="mt-12 text-white">
      <h1>{lp.id}</h1>
      <h1>{lp.title}</h1>

      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-[200px] h-[200px] object-contain"
      />

      <p className="mt-4">{lp.content}</p>

      <button
        onClick={toggleLike}
        className="mt-4 inline-flex items-center space-x-1"
      >
        <Heart
          className="w-6 h-6"
          color={isLiked ? "red" : "white"}
          fill={isLiked ? "red" : "transparent"}
        />
        <span className="text-lg font-medium text-white">
          {lp.likes.length}
        </span>
      </button>

      {/* 댓글 섹션 */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-white mb-3">댓글</h2>
        <div className="flex justify-end mb-2 space-x-2">
          <button
            onClick={() => setOrder(PAGINATION_ORDER.asc)}
            className={`px-3 py-1 rounded ${
              order === PAGINATION_ORDER.asc
                ? "bg-pink-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder(PAGINATION_ORDER.desc)}
            className={`px-3 py-1 rounded ${
              order === PAGINATION_ORDER.desc
                ? "bg-pink-500 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            최신순
          </button>
        </div>

        <div className="flex mb-4">
          <input
            type="text"
            placeholder="댓글을 입력해주세요"
            className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l"
            disabled
          />
          <button className="px-4 bg-gray-700 text-gray-300 rounded-r" disabled>
            작성
          </button>
        </div>

        {commentsError ? (
          <div className="text-red-500 mb-4">
            댓글을 불러오는 중 오류가 발생했습니다.
          </div>
        ) : commentsLoading ? (
          <CommentSkeletonList count={pageSize} />
        ) : (
          <div className="space-y-4">
            {commentPages?.pages
              .flatMap((p) => p.data.data)
              .map((c) => (
                <Comment key={c.id} comment={c} />
              ))}
          </div>
        )}

        {isFetchingNextPage && (
          <div className="mt-4">
            <CommentSkeletonList count={4} />
          </div>
        )}

        <div ref={endRef} />
      </section>
    </div>
  );
}
