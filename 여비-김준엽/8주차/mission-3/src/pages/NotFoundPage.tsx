import { useRouteError, Link } from "react-router-dom";

// 404 페이지 컴포넌트
const NotFoundPage = () => {
  // 라우터 오류 정보 가져오기
  const error = useRouteError();
  
  // 오류 정보를 콘솔에 출력 (디버깅용)
  console.error("Route Error:", error);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-4">페이지를 찾을 수 없습니다</h2>
        <p className="text-gray-400 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          홈으로 돌아가기
        </Link>
        {error && (
          <div className="mt-8 p-4 bg-gray-900 rounded text-left text-sm">
            <p className="text-red-400">오류 정보:</p>
            <pre className="text-gray-300 mt-2 overflow-auto">
              {JSON.stringify(error, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotFoundPage;
