export const LoadingSpinner =()=> {
    return(
    <div className='flex flex-col items-center justify-center space-y-4'>
        {/* 로딩 스피너 */}
        <div className='size-16 animate-spin rounded-full border-8
         border-t-transparent border-[#dda5e3]'
         role='status'
        >
            <span className='sr-only'>로딩 중..</span>
        </div>
        {/* 로딩 메시지 */}
        <p className='text-[#dda5e3] text-lg font-medium animate-pulse'>
            영화 데이터를 불러오는 중...
        </p>
    </div>
    );
};