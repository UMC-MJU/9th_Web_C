// src/pages/MyPage.tsx
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log("🎯 getMyInfo response:", response);

      setData(response);
    };
    getData();
  }, []);

  // const handleLogout = async () => {
  //   await logout();
  //   navigate("/");
  // };

  return (
    <div className="min-h-screen bg-black text-white p-8 relative">
      {/* 좌상단 로고: 클릭 시 홈으로 이동 */}

      {/* 정보 칸 */}
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
    </div>
  );
};

export default MyPage;
