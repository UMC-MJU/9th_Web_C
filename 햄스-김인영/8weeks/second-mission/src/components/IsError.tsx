import type { QueryObserverResult } from '@tanstack/react-query';

type ErrorProps = {
  refetch: () => Promise<QueryObserverResult<unknown, unknown>>;
};

export const IsError = ({refetch}: ErrorProps) => {
  return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-gray-600 font-medium">목록을 불러오지 못했습니다.</p>
        <button
          onClick={() => refetch()}
          className="px-5 py-2 bg-blue-300 hover:bg-blue-400 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
        >
          다시 시도하기
        </button>
      </div>
    );
}
