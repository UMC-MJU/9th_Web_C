import { useState, useEffect } from 'react';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { MovieDetail, Credits, MovieDetailWithCredits } from '../types/movieDetail';

// 영화 상세 정보 커스텀 훅의 반환 타입
interface UseMovieDetailResult {
  data: MovieDetailWithCredits | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// 영화 상세 정보와 크레딧을 동시에 가져오는 커스텀 훅
export function useMovieDetail(movieId: string): UseMovieDetailResult {
  // 데이터 상태 관리
  const [data, setData] = useState<MovieDetailWithCredits | null>(null);
  // 로딩 상태 관리
  const [loading, setLoading] = useState<boolean>(false);
  // 에러 상태 관리
  const [error, setError] = useState<string | null>(null);

  // 데이터를 가져오는 함수
  const fetchMovieDetail = async (): Promise<void> => {
    if (!movieId) return;
    
    setLoading(true);
    setError(null);

    try {
      // 영화 상세 정보와 크레딧 정보를 병렬로 요청
      const [movieRes, creditsRes]: [AxiosResponse<MovieDetail>, AxiosResponse<Credits>] = 
        await Promise.all([
          axios.get<MovieDetail>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
          axios.get<Credits>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
        ]);

      // 데이터를 하나의 객체로 합쳐서 저장
      setData({
        movie: movieRes.data,
        credits: creditsRes.data,
      });
    } catch (err) {
      // 에러 발생 시 사용자 친화적인 메시지 설정
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 404) {
          setError('요청한 영화를 찾을 수 없습니다.');
        } else if (status === 401) {
          setError('인증에 실패했습니다.');
        } else if (status && status >= 500) {
          setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } else {
          setError('영화 정보를 불러오는 중 오류가 발생했습니다.');
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
    fetchMovieDetail();
  };

  // movieId가 변경될 때마다 데이터 재요청
  useEffect(() => {
    fetchMovieDetail();
  }, [movieId]);

  return { data, loading, error, refetch };
}



