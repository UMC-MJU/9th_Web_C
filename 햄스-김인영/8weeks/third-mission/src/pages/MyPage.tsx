import { useEffect, useState } from "react";
import { useGetMyInfo } from "../hooks/queries/useGetMyInfo";
import { usePatchUser } from "../hooks/queries/usePatchUser";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/key";

export const MyPage = () => {
  const { data: user, isLoading, isError } = useGetMyInfo();
  const { mutate: patchUser, isPending } = usePatchUser();
  const queryClient = useQueryClient();

  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    if (user?.data) {
      setName(user.data.name || "");
      setBio(user.data.bio || "");
    }
  }, [user]);

  const handleEditToggle = () => setIsEditMode((prev) => !prev);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    if (avatar) formData.append("avatar", avatar);

    patchUser(formData, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
        setIsEditMode(false);
        setAvatar(null);
      },
    });
  };

  if (isLoading) return <p className="text-center mt-10">내 정보를 불러오는 중...</p>;
  if (isError) return <p className="text-center mt-10 text-red-400">내 정보 불러오기 실패</p>;

  return (
    <div className="flex flex-col items-center justify-center p-8 text-gray-700">

      <div className="flex flex-col items-center gap-4 bg-gray-200 p-6 rounded-2xl shadow-md w-[400px]">
        <div className="relative">
          <img
            src={
              avatar
                ? URL.createObjectURL(avatar)
                : user?.data?.avatar || "/default-profile.png"
            }
            alt="프로필 이미지"
            className="w-32 h-32 rounded-full border border-gray-400 object-cover"
          />
          {isEditMode && (
            <input
              type="file"
              accept="image/*"
              className="mt-2 text-sm"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
            />
          )}
        </div>

        {isEditMode ? (
          <input
            type="text"
            className="border border-gray-400 rounded-md p-2 text-sm w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <p className="text-lg font-semibold">{name}</p>
        )}

        <p className="text-gray-600 text-sm">{user?.data?.email}</p>

        {isEditMode ? (
          <textarea
            className="border border-gray-400 rounded-md p-2 text-sm w-full resize-none h-20"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        ) : (
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {bio || "자기소개가 없습니다."}
          </p>
        )}

        <div className="flex gap-2 mt-4 w-full">
          {isEditMode ? (
            <>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isPending}
                className="flex-1 bg-blue-400 text-white py-2 rounded-lg font-semibold hover:bg-blue-500 disabled:bg-gray-400"
              >
                {isPending ? "저장 중..." : "저장하기"}
              </button>
              <button
                type="button"
                onClick={handleEditToggle}
                className="flex-1 bg-gray-400 text-white py-2 rounded-lg font-semibold hover:bg-gray-500"
              >
                취소
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleEditToggle}
              className="w-full bg-blue-400 text-white py-2 rounded-lg font-semibold hover:bg-blue-500"
            >
              수정하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
