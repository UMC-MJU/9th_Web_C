// 404 페이지 컴포넌트
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <div className="text-center">
        {/* 404 에러 메시지 */}
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">페이지를 찾을 수 없습니다</h2>
        <p className="text-gray-500 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        
        {/* 홈으로 돌아가기 버튼 */}
        <button 
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
