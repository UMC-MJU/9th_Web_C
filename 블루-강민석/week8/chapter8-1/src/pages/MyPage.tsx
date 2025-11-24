// src/pages/MyPage.tsx
import { useState, useEffect, useRef } from "react";
import { Plus, Settings, Check, Camera } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import useGetLikedLpList from "../hooks/queries/useGetLikedLpList";
import useUpdateProfile from "../hooks/mutations/useUpdateProfile";
import LpCard from "../components/LpCard/LpCard";
import { Lp } from "../types/lp";

export default function MyPage() {
  /** --- 1) Auth & 내 정보 조회 --- */
  const { accessToken } = useAuth();
  const { data: myInfoRes, isLoading: myInfoLoading, error: myInfoError } = useGetMyInfo(accessToken);
  const profile = myInfoRes?.data;

  /** --- 2) 인라인 편집 상태 --- */
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 프로필이 로드되면 draftName 초기화 (편집 중이 아닐 때만)
  useEffect(() => {
    if (profile && !isEditing) {
      setDraftName(profile.name);
      setSelectedAvatar(null);
    }
  }, [profile, isEditing]);

  /** --- 3) 이름 업데이트 뮤테이션 (optimistic) --- */
  const updateProfile = useUpdateProfile();

  const handleSaveProfile = () => {
    if (!profile) return;

    const payload: { name?: string; avatar?: File } = {};
    if (draftName !== profile.name) payload.name = draftName;
    if (selectedAvatar) payload.avatar = selectedAvatar;

    console.log("💾 저장 시도:", payload);

    if (Object.keys(payload).length > 0) {
      updateProfile.mutate(payload, {
        onSuccess: (data) => {
          console.log("✅ 저장 성공:", data);
          setIsEditing(false);
        },
        onError: (error) => {
          console.error("❌ 저장 실패:", error);
          alert("프로필 업데이트에 실패했습니다: " + error.message);
        },
      });
    } else {
      console.log("변경사항 없음");
      setIsEditing(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedAvatar(file);
    }
  };

  const avatarPreview = selectedAvatar
    ? URL.createObjectURL(selectedAvatar)
    : profile?.avatar || "https://via.placeholder.com/96";

  /** --- 4) 탭 & 정렬 상태 --- */
  const [tab, setTab] = useState<"liked" | "written">("liked");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  /** --- 5) 내가 좋아요한 LP 목록 조회 --- */
  const { data: likedRes, isLoading: likedLoading, error: likedError } = useGetLikedLpList({ order, limit: 10 });
  const list = (
    tab === "liked"
      ? likedRes?.data ?? [] // CursorBasedResponse<Lp[]>["data"] 또는 []
      : []
  ) as Lp[];

  if (myInfoLoading) return <div>프로필 로딩중…</div>;
  if (myInfoError || !profile) return <div>프로필을 불러올 수 없습니다.</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8 relative">
      {/* — 프로필 카드 */}
      <div className="flex items-center gap-6 bg-gray-900 p-6 rounded-lg w-fit mx-auto shadow-lg">
        {/* 프로필 이미지 */}
        <div className="relative">
          <img
            src={avatarPreview}
            alt="avatar"
            className="w-24 h-24 rounded-full border-2 border-pink-400 object-cover"
          />
          {isEditing && (
            <>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-pink-500 hover:bg-pink-600 p-2 rounded-full shadow-lg"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </>
          )}
        </div>

        {/* 이름 & 이메일 */}
        <div className="flex flex-col">
          {isEditing ? (
            <input
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              className="px-2 py-1 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            />
          ) : (
            <h1 className="text-3xl font-bold mb-1">{profile.name}</h1>
          )}
          <p className="text-sm text-gray-400">{profile.email}</p>
        </div>

        {/* 톱니바퀴 / 체크 토글 */}
        <div className="ml-4 flex items-center">
          {isEditing ? (
            <Check
              className={`w-6 h-6 text-pink-500 cursor-pointer ${
                updateProfile.status === "pending" ? "opacity-50" : ""
              }`}
              onClick={handleSaveProfile}
            />
          ) : (
            <Settings
              className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
          )}
        </div>
      </div>

      {/* — 탭 네비게이션 */}
      <div className="mt-12 max-w-4xl mx-auto">
        <nav className="flex justify-center border-b border-gray-700">
          <button
            onClick={() => setTab("liked")}
            className={`px-6 pb-2 -mb-px ${
              tab === "liked" ? "border-b-2 border-white text-white font-semibold" : "text-gray-500"
            }`}
          >
            내가 좋아요 한 LP
          </button>
          <button
            onClick={() => setTab("written")}
            className={`px-6 pb-2 -mb-px ${
              tab === "written" ? "border-b-2 border-white text-white font-semibold" : "text-gray-500"
            }`}
          >
            내가 작성한 LP
          </button>
        </nav>

        {/* — 정렬 버튼 */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setOrder("asc")}
            className={`px-3 py-1 border rounded ${
              order === "asc" ? "bg-gray-800 text-white" : "border-gray-600 text-gray-400"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder("desc")}
            className={`px-3 py-1 rounded ${
              order === "desc" ? "bg-white text-black" : "border border-gray-600 text-gray-400"
            }`}
          >
            최신순
          </button>
        </div>

        {/* — LP 카드 그리드 */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {tab === "liked" && likedLoading && <p>로딩 중…</p>}
          {tab === "liked" && likedError && <p>오류 발생: {likedError.message}</p>}
          {!likedLoading && list.length === 0 && (
            <p className="col-span-2 text-center text-gray-500">표시할 LP가 없습니다.</p>
          )}
          {list.map((lp) => (
            <LpCard
              key={lp.id}
              lp={lp}
            />
          ))}
        </div>
      </div>

      {/* — 새 LP 작성 + 버튼 */}
      <button className="fixed bottom-8 right-8 bg-pink-500 hover:bg-pink-600 p-4 rounded-full shadow-lg">
        <Plus className="text-white" />
      </button>
    </div>
  );
}
