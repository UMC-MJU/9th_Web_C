import { useState, useEffect } from 'react';
import axios from 'axios';
import type { AxiosResponse } from 'axios';

// 커스텀 훅의 제네릭 타입 정의
interface UseCustomFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// useCustomFetch 커스텀 훅
export function useCustomFetch<T>(
  url: string, // API URL
  dependencies: unknown[] = [] // 의존성 배열 (URL이나 파라미터가 변경될 때 재요청)
): UseCustomFetchResult<T> {
  // 데이터 상태 관리
  const [data, setData] = useState<T | null>(null);
  // 로딩 상태 관리
  const [loading, setLoading] = useState<boolean>(false);
  // 에러 상태 관리
  const [error, setError] = useState<string | null>(null);

  // 데이터를 가져오는 함수
  const fetchData = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
        },
      });
      setData(response.data);
    } catch (err) {
      // 에러 발생 시 사용자 친화적인 메시지 설정
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 404) {
          setError('요청한 데이터를 찾을 수 없습니다.');
        } else if (status === 401) {
          setError('인증에 실패했습니다.');
        } else if (status && status >= 500) {
          setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } else {
          setError('데이터를 불러오는 중 오류가 발생했습니다.');
        }
      } else {
        setError('네트워크 연결을 확인해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 수동으로 데이터를 다시 가져오는 함수
  const refetch = (): void => {
    fetchData();
  };

  // 의존성이 변경될 때마다 데이터 재요청
  useEffect(() => {
    if (url) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...dependencies]);

  return { data, loading, error, refetch };
}