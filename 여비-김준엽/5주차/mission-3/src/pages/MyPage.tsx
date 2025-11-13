import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response);
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  //console.log("아바타주소:", data?.data?.avatar);
  return (
    <div className="min-h-screen bg-black text-white p-8 relative">
      {/* 좌상단 로고고 */}
      <div className="text-pink-400 text-2xl font-bold mb-8">띵페이지</div>

      {/* 정보칸칸 */}
      <div className="flex items-center gap-6 bg-gray-900 p-6 rounded-lg w-fit shadow-lg">
        <img
          src={data?.data.avatar}
          alt="구글 로고"
          className="w-24 h-24 rounded-full border-2 border-pink-400"
        />
        <div>
          <h1 className="text-xl font-semibold mb-2">
            {data?.data.name}님 환영합니다.
          </h1>
          <p className="text-sm text-gray-300">{data?.data.email}</p>
        </div>
      </div>

      {/* 우상ㄷ난난 로그아웃 버튼 */}
      <button
        className="absolute top-8 right-8 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-md"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
