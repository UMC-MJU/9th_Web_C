import { getMyInfo } from "../apis/auth";

export const MyPage = () => {
  const handleCheck = async () => {
    try {
      const data = await getMyInfo();
      console.log("내 정보:", data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  return (
    <div>
      <h1>My Page</h1>
      <button onClick={handleCheck}>내 정보 불러오기</button>
    </div>
  );
};
