interface ErrorMessageProps {
  message: string;
  onRetry?: () => void; // 재시도 함수 (선택적)
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[400px] space-y-6 p-8'>
      {/* 에러 아이콘 */}
      <div className='text-red-500 text-6xl'>⚠️</div>
      
      {/* 에러 메시지 */}
      <div className='text-center space-y-2'>
        <h2 className='text-red-500 text-2xl font-bold'>오류가 발생했습니다</h2>
        <p className='text-gray-600 text-lg max-w-md'>
          {message}
        </p>
      </div>
      
      {/* 재시도 버튼 (onRetry가 제공된 경우에만 표시) */}
      {onRetry && (
        <button
          onClick={onRetry}
          className='bg-[#dda5e3] hover:bg-[#b2dab1] text-white 
                   px-8 py-3 rounded-lg shadow-md transition-all duration-200
                   font-medium text-lg'
        >
          다시 시도
        </button>
      )}
    </div>
  );
};



