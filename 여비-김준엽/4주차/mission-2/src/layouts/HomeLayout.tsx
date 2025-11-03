import {Outlet} from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col bg-white">
        {/* 네비게이션 바 - 상단 왼쪽에 텍스트 */}
        <nav className="bg-white px-4 py-2">
          <div className="text-black text-sm">네비게이션 바 입니다.</div>
        </nav>
        
        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1 bg-white">
            <Outlet/>
        </main>
        
        {/* 푸터 제거 (사진에는 푸터가 없음) */}
    </div>
 );
};

export default HomeLayout;