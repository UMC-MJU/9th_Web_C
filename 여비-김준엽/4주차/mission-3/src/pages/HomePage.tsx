// 홈페이지 컴포넌트
const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <div className="text-center">
        {/* 메인 제목 */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          홈페이지에 오신 것을 환영합니다
        </h1>
        
        {/* 부제목 */}
        <p className="text-lg text-gray-600 mb-8">
          로그인하거나 회원가입을 진행해주세요
        </p>
        
        {/* 버튼 그룹 */}
        <div className="flex gap-4 justify-center">
          {/* 로그인 버튼 */}
          <button 
            onClick={() => window.location.href = '/login'}
            className="px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
          >
            로그인
          </button>
          
          {/* 회원가입 버튼 */}
          <button 
            onClick={() => window.location.href = '/signup'}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
