// src/pages/LpDetailPage.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios"; // axios 인스턴스
import LoadingSpinner from "../components/LoadingSpinner";
import { Lp } from "../types/lp"; // Lp 타입
import { formatDistanceToNow } from "date-fns";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineHeart } from "react-icons/ai";

// 댓글 관련 import
import useGetInfiniteCommentList from "../hooks/queries/useGetInfiniteCommentList";
import usePostComment from "../hooks/mutations/usePostComment";
import Comment from "../components/Comment/Comment";
import CommentSkeletonList from "../components/Comment/CommentSkeletonList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";

type ResponseLpDetailDto = { data: Lp };

const LpDetailPage: React.FC = () => {
  // 1. URL 파라미터에서 lpId 추출
  const { lpId } = useParams<{ lpId: string }>();
  console.log("→ LpDetailPage 렌더링, lpId:", lpId);

  const id = Number(lpId);

  // 2. LP 상세 조회 (react-query)
  const {
    data: lp,
    isLoading: lpLoading,
    error: lpError,
  } = useQuery<Lp, Error>({
    queryKey: ["lpDetail", id],
    queryFn: async () => {
      const res = await axiosInstance.get<ResponseLpDetailDto>(`/v1/lps/${id}`);
      return res.data.data;
    },
    enabled: Boolean(lpId),
  });

  // 3. 댓글 작성
  const [commentText, setCommentText] = useState("");
  const { mutate: postCommentMutate, isPending: isPostingComment } = usePostComment();

  const handlePostComment = () => {
    if (!commentText.trim() || !id) return;
    postCommentMutate(
      { lpId: id, content: commentText },
      {
        onSuccess: () => {
          setCommentText("");
        },
      }
    );
  };

  // 4. 댓글 무한스크롤 & 정렬 훅
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

  // 5. 댓글 영역 스크롤 감지
  const { ref: commentsEndRef, inView: commentsInView } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    if (commentsInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [commentsInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 6. 로딩 / 오류 처리
  if (lpLoading) return <LoadingSpinner />;
  if (lpError || !lp) return <div className="p-4 text-center">상세 정보를 불러오는 중 오류가 발생했습니다.</div>;
  return (
    <div className="px-4 py-12 flex justify-center">
      <div className="max-w-3xl w-full bg-gray-850 rounded-2xl p-8 space-y-6">
        {/* ── 작성자 · 시간 · 편집/삭제 ── */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src={lp.thumbnail}
              alt="avatar"
              className="w-10 h-10 rounded-full bg-gray-700"
            />
            <span className="text-white font-medium">{lp.authorId}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">
              {formatDistanceToNow(new Date(lp.createdAt), {
                addSuffix: true,
              })}
            </span>
            <AiOutlineEdit className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            <AiOutlineDelete className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* ── 타이틀틀 ── */}
        <h1 className="text-3xl font-bold text-white">{lp.title}</h1>

        {/* ── 썸네일일 ── */}
        <div className="flex justify-center">
          <div className="relative w-80 h-80 bg-gray-800 rounded-xl shadow-2xl">
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="absolute inset-0 w-full h-full object-cover rounded-full border-2 border-gray-700 animate-spin"
              style={{ animationDuration: "8s" }}
            />
          </div>
        </div>

        {/* ── 콘텐트트 ── */}
        <p className="text-gray-300 leading-relaxed">{lp.content}</p>

        {/* ── 태그그 ── */}
        <div className="flex flex-wrap gap-2">
          {lp.tags.map((tag) => (
            <span
              key={tag.id}
              className="text-xs bg-gray-700 text-gray-200 rounded-full px-3 py-1"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* ── 조아요요 ── */}
        <div className="flex items-center gap-2">
          <AiOutlineHeart className="w-6 h-6 text-pink-500" />
          <span className="text-white">{lp.likes.length}</span>
        </div>

        {/* ── 댓글 섹션 ── */}
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">댓글</h2>

          {/* 정렬 버튼 */}
          <div className="flex justify-end mb-3 space-x-2">
            <button
              onClick={() => setOrder(PAGINATION_ORDER.asc)}
              className={`px-3 py-1 rounded ${
                order === PAGINATION_ORDER.asc ? "bg-pink-500 text-white" : "bg-gray-700 text-gray-300"
              }`}
            >
              오래된순
            </button>
            <button
              onClick={() => setOrder(PAGINATION_ORDER.desc)}
              className={`px-3 py-1 rounded ${
                order === PAGINATION_ORDER.desc ? "bg-pink-500 text-white" : "bg-gray-700 text-gray-300"
              }`}
            >
              최신순
            </button>
          </div>

          {/* 작성란 */}
          <div className="flex mb-6">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePostComment()}
              placeholder="댓글을 입력해주세요"
              className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l"
              disabled={isPostingComment}
            />
            <button
              onClick={handlePostComment}
              disabled={isPostingComment || !commentText.trim()}
              className="px-4 bg-pink-500 text-white rounded-r disabled:bg-gray-700 disabled:text-gray-300"
            >
              {isPostingComment ? "작성중..." : "작성"}
            </button>
          </div>

          {/* 댓글 에러 / 로딩 / 리스트 */}
          {commentsError ? (
            <div className="text-red-500 mb-4">댓글을 불러오는 중 오류가 발생했습니다.</div>
          ) : commentsLoading ? (
            <CommentSkeletonList count={pageSize} />
          ) : commentPages && commentPages.pages.length > 0 ? (
            <div className="space-y-4">
              {commentPages.pages
                .flatMap((page) => page.data.data)
                .map((c) => (
                  <Comment
                    key={c.id}
                    comment={c}
                  />
                ))}
            </div>
          ) : (
            <div className="text-gray-500">댓글이 없습니다.</div>
          )}

          {/* 다음 페이지 로딩 스켈레톤 */}
          {isFetchingNextPage && (
            <div className="mt-4">
              <CommentSkeletonList count={4} />
            </div>
          )}

          {/* 무한스크롤 감지용 트리거 */}
          <div ref={commentsEndRef} />
        </section>
      </div>
    </div>
  );
};

export default LpDetailPage;
