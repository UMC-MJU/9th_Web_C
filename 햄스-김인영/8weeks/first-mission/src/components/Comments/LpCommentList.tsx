import { useRef, useEffect, useState, useContext } from "react";
import useGetCommentList from "../../hooks/queries/useGetCommentList";
import CommentSkeleton from "./CommentSkeleton";
import { useParams } from "react-router-dom";
import { usePostComment } from "../../hooks/queries/usePostComment";
import { AuthContext } from "../../context/AuthContext";
import { usePatchComment } from "../../hooks/queries/usePatchComment";
import { useDeleteComment } from "../../hooks/queries/useDeleteComment";
import pencil from '../../assets/pencil.png'
import trash from '../../assets/trash-can.png'

export default function LpCommentList() {
  const { lpid } = useParams<{ lpid: string }>();
  const lpId = Number(lpid);
  const [commentText, setCommentText] = useState("");

  const { user } = useContext(AuthContext);

  const [order, setOrder] = useState<"newest" | "oldest">("newest");
  const orderButton = order === "newest" ? "asc" : "desc";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetCommentList({
    lpid: lpId,
    limit: 10,
    order: orderButton,
  });

  //댓글 등록 useMutation
  const { mutate: createComment } = usePostComment(lpId);
  //댓글 수정
  const { mutate: patchComment } = usePatchComment(lpId);
  //댓글 삭제
  const { mutate: deleteComment } = useDeleteComment(lpId);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);


  const commentList = data?.pages.flatMap((p) => p.data.data) ?? [];

  //댓글 등록
  const handleSubmitComment = () => {
    if (!commentText.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    createComment({
      lpId: lpId,
      content: commentText.trim(),
    });
    setCommentText("");
  };

  //댓글 수정 시작
  const handleEditStart = (commentId: number, oldContent: string) => {
    setEditingId(commentId);
    setEditText(oldContent);
    setMenuOpenId(null);
  };

  //댓글 수정 완료
  const handleEditSubmit = (commentId: number) => {
    if (!editText.trim()) {
      alert("수정할 내용을 입력해주세요.");
      return;
    }
    patchComment({ commentId, content: editText });
    setEditingId(null);
  };

  //댓글 삭제
  const handleDelete = (commentId: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteComment({ commentId });
      setMenuOpenId(null);
    }
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

      <div className="flex justify-between gap-2 text-[12px] text-white font-semibold
        disabled:cursor-not-allowed mb-3">
        <div className="text-white text-sm font-semibold pt-1.5">댓글</div>
        {/*최신순 오래된순 버튼*/}
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
            <div key={comment.id} className="flex justify-between gap-3">
              <div className="flex gap-3">
                <img
                  src={comment.author?.avatar || "/default-profile.png"}
                  alt={comment.author?.name || "작성자"}
                  className="w-7 h-7 rounded-full border border-gray-600 object-cover mt-1.5"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-white">{comment.author?.name}</p>
                  {/*댓글 입력, 수정*/}
                  {editingId === comment.id ? (
                    <div className="flex gap-2">
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="bg-gray-500 w-xl h-6 p-1 text-[13px] text-white text-sm rounded border border-white"/>
                      <button
                        onClick={() => handleEditSubmit(comment.id)}
                        className="text-blue-300 hover:text-blue-500">
                       <img src={pencil} className="w-5"/>
                      </button>
                    </div>
                  ) : (
                    <p className="text-[13px] text-gray-100">{comment.content}</p>
                  )}
                </div>
              </div>

              {comment.author?.id === user?.id && (
                <div className="relative flex">
                  {editingId !== comment.id && (
                    <button
                      onClick={() =>setMenuOpenId((prev) => (prev === comment.id ? null : comment.id))}
                      className="text-lg text-white hover:text-gray-300">
                      ⋯
                    </button>
                  )}
                  {menuOpenId === comment.id && (
                    <div className="flex absolute right-0 top-7 mt-2 bg-gray-700 rounded shadow-lg text-sm z-10">
                      <button
                        onClick={() => handleEditStart(comment.id, comment.content)}
                        className="w-13 block px-2 py-2 hover:bg-gray-600 text-sm text-white">
                        <img src={pencil} />
                      </button>
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="block px-2 py-2 hover:bg-gray-600 text-red-400">
                        <img src={trash} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}

        {isFetchingNextPage && <CommentSkeleton count={3} />}
      </div>

      <div ref={sentinelRef} style={{ height: 1 }} />
    </div>
  );
}
