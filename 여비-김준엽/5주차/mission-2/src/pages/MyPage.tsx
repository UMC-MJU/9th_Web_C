import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// 마이페이지 컴포넌트
// - 내 정보 API를 호출하여 사용자 정보를 표시
// - 로그아웃 기능 제공
const MyPage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    // 내 정보 응답 상태 (초기값 null)
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    
    useEffect(() => {
        // 내 정보 불러오기
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);
            setData(response);
        };
        getData();
    }, []);
   
    // 로그아웃 처리
    const handleLogout = async () => {
        await logout();
    };
   
    return (
        <div>
            <h1>{data?.data?.name}님 환영합니다.</h1>
            {data?.data?.avatar && (
                <img src={data.data.avatar as string} alt={"프로필 이미지"} />
            )}
            <h1>{data?.data?.email}</h1>
            <button
                className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
                onClick={handleLogout}
            >
                로그아웃
            </button>
        </div>
    );
};

export default MyPage;