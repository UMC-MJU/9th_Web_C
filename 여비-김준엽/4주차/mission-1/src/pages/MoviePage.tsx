import { useState} from "react";
import type { MovieResponse } from '../types/movie';
import Moviecard from "../components/MovieCard";
import {LoadingSpinner} from '../components/LoadingSpinner'
import {ErrorMessage} from '../components/ErrorMessage'
import {useParams} from "react-router-dom";
import { useCustomFetch } from '../hooks/useCustomFetch';



export default function MoviePage(){
    ///3. 페이지 상태
    const [page, setPage] = useState(1);
    
    const { category } = useParams<{
      category: string;  
    }>();

    // 커스텀 훅을 사용하여 영화 데이터 가져오기
    const { data: movieResponse, loading, error, refetch } = useCustomFetch<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
        [page, category] // page나 category가 변경될 때마다 재요청
    );

    // 에러 상태 처리
    if(error){
     return (
       <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center'>
         <ErrorMessage message={error} onRetry={refetch} />
       </div>
     );
    }

    // 로딩 상태 처리
    if(loading){
      return (
        <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center'>
          <LoadingSpinner/>
        </div>
      );
    }

    return(
     <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50'>
      {/* 페이지 네비게이션 */}
      <div className='flex items-center justify-center gap-6 pt-8 pb-8'>
        <button 
          className='bg-[#dda5e3] text-white px-8 py-3 rounded-lg shadow-md
          hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
          cursor-pointer disabled:cursor-not-allowed font-medium text-lg'
          disabled={page ===1}
          onClick={() : void => setPage((prev): number => prev-1)}
          >
          이전 페이지
        </button>
        <span className='text-xl font-semibold text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm'>
          {page} 페이지
        </span>
        <button 
          className='bg-[#dda5e3] text-white px-8 py-3 rounded-lg shadow-md
          hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer font-medium text-lg'
          onClick={() : void => setPage((prev): number => prev+1)}>
          다음 페이지
        </button>
      </div>

      {/* 영화 목록 */}
      {movieResponse && movieResponse.results && movieResponse.results.length > 0 ? (
         <div className="p-10 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
        lg:grid-cols-5 xl:grid-cols-6">
        {movieResponse.results.map((movie) =>(
           <Moviecard key={movie.id} movie={movie}/>    
        ))}
      </div>
     ) : (
       <div className='flex items-center justify-center h-96'>
         <div className='text-center space-y-4'>
           <p className='text-2xl text-gray-600'>영화 데이터가 없습니다.</p>
           <p className='text-gray-500'>
             .env 파일에 VITE_TMDB_KEY를 설정했는지 확인해주세요.
           </p>
         </div>
       </div>
     )}    
     </div>
    );
}