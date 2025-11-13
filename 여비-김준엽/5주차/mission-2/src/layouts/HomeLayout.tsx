import {Outlet} from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
        {/* 네비게이션 바 - 상단 왼쪽에 텍스트 */}
        <nav>네비게이션 바 입니다.</nav>
        {/* 메인 콘텐츠 영역 */}
        <main className="flex-1">
            <Outlet/>
        </main>
        <footer>푸터</footer>
    </div>
 );
};

export default HomeLayout;