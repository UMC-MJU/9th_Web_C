import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { LoadingSpinner } from "../components/LoadingSpinner";
import pencil from "../assets/pencil.png";
import trash from "../assets/trash-can.png";
import { IsError } from "../components/IsError";
import { usePatchLpDetail } from "../hooks/queries/usePatchLpDetail";
import { useDeleteLp } from "../hooks/queries/useDeleteLp";
import type { RequestCreateLp } from "../types/lp";
import { uploadImagePublic } from "../apis/image";
import { useTags } from "../hooks/useTag";
import { AuthContext } from "../context/AuthContext";
import { useToggleLike } from "../hooks/useToggleLikes";

export const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const numberId = Number(lpid);

  const { user } = useContext(AuthContext);

  const { data: lp, isLoading, isError, refetch } = useGetLpDetail(numberId);
  const { mutate: patchLpDetail } = usePatchLpDetail(numberId);
  const { mutate: deleteLp } = useDeleteLp(numberId);

  const [isEditMode, setIsEditMode] = useState(false);
  const { tags, input, setInput, addTag, removeTag, resetTags } = useTags([]);

  // 수정 상태
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  // 좋아요 상태 계산
  const isLiked = lp?.likes?.some((like) => like.userId === user?.id) ?? false;

  // 좋아요 훅 적용
  const { mutate: toggleLike } = useToggleLike(numberId, isLiked);

  // lp 로딩 후 초기값 세팅
  useEffect(() => {
    if (lp) {
      setContent(lp.content);
      resetTags(lp.tags.map((t) => t.name));
    }
  }, [lp]);

  if (isLoading) return <LoadingSpinner />;
  if (isError || !lp) return <IsError refetch={refetch} />;

  const daysAgo = Math.floor(
    (Date.now() - new Date(lp.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  const handleSave = async () => {
    try {
      let thumbnailUrl = lp.thumbnail;

      if (thumbnail) {
        thumbnailUrl = await uploadImagePublic(thumbnail);
      }

      const updateData: RequestCreateLp = {
        title: lp.title,
        content,
        thumbnail: thumbnailUrl,
        tags,
        published: true,
      };

      patchLpDetail(updateData);
      setIsEditMode(false);

    } catch (err) {
      console.error("LP 수정 중 오류:", err);
      alert("LP 수정 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="flex item-center justify-center mt-5">
      <div className="flex flex-col items-center bg-gray-400 w-[700px] rounded-2xl p-6 shadow-[0_0_25px_rgba(0,0,0,0.7)]">

        {/* 상단 사용자 + 날짜 */}
        <div className="flex items-center justify-between w-full max-w-[700px]">
          <div className="flex items-center gap-3">
            <img
              src={lp?.author?.avatar || "/default-profile.png"}
              alt={lp?.author?.name || "작성자"}
              className="w-10 h-10 rounded-full border border-gray-500 object-cover"
            />
            <p className="font-semibold text-white">{lp.author?.name}</p>
          </div>
          <p className="text-white text-sm">{daysAgo === 0 ? "오늘" : `${daysAgo}일 전`}</p>
        </div>

        {/* 수정/삭제 버튼 */}
        <div className="flex justify-end w-full gap-2 m-2">
          {!isEditMode ? (
            <>
              <img
                src={pencil}
                className="w-4 cursor-pointer"
                onClick={() => setIsEditMode(true)}
              />
              <img
                src={trash}
                className="w-4 cursor-pointer"
                onClick={() => {
                  if (confirm("정말 삭제하시겠습니까?")) {
                    deleteLp();
                  }
                }}
              />
            </>
          ) : (
            <>
              <button
                className="px-3 py-1 bg-gray-600 text-white rounded"
                onClick={handleSave}
              >
                저장
              </button>
              <button
                className="px-3 py-1 bg-red-400 text-white rounded"
                onClick={() => setIsEditMode(false)}
              >
                취소
              </button>
            </>
          )}
        </div>

        {/* LP 이미지 */}
        <div className=" flex items-center justify-center w-[350px] h-[350px] border-gray-800 shadow-2xl mb-9 mt-2.5">
          <div className="relative w-[300px] h-[300px]">
            <div
              className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-500 shadow-2xl"
              style={{
                backgroundImage: `url(${thumbnail ? URL.createObjectURL(thumbnail) : lp.thumbnail
                  })`,
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


        {isEditMode && (
          <input
            type="file"
            className="text-sm mb-4"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
          />
        )}

        {/* 내용 (보기/수정 토글) */}
        {!isEditMode ? (
          <p className="max-w-[700px] text-center text-white leading-relaxed mb-6 text-sm">
            {lp.content}
          </p>
        ) : (
          <textarea
            className="max-w-[700px] w-full h-7 border pl-1.5 pt-0.5 rounded mb-6 text-black text-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}

        {/* 태그 (보기/수정 토글) */}
        {!isEditMode ? (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {lp.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-gray-600 rounded-full text-sm text-gray-200"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 mb-6 w-full">
            <div className="flex gap-2 flex-wrap justify-center">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center bg-gray-600 px-3 py-1 rounded-xl text-white text-sm"
                >
                  #{tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-red-300 pb-0.5"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>

            <div>
              <input
                type="text"
                className="border p-2 rounded w-60 text-sm h-8"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-gray-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-gray-500 ml-2.5"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {/* 좋아요 */}
        {!isEditMode && (
          <div className="flex items-center gap-2">
            <button 
            onClick={() => toggleLike()}
            className="text-pink-600 text-lg hover:scale-120 transition">
              {isLiked ? "♥" : "♡"}
            </button>
            <span className="text-white">{lp.likes?.length || 0}</span>
          </div>
        )}
      </div>
    </div>
  );
};
