import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// ---------------------------
// 1. 데이터 타입 정의 업데이트
// ---------------------------
type Genre = { id: number; name: string };
type ProductionCompany = { id: number; logo_path: string | null; name: string };

type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  // 새로 추가된 필드
  backdrop_path: string; 
  release_date: string;
  vote_average: number;
  runtime: number;
  tagline: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
};

type Cast = {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
  known_for_department: string;
};

type Crew = {
  id: number;
  name: string;
  profile_path: string | null;
  job: string; // 'Director' 등을 확인하는 데 사용
  department: string;
};

type Credits = {
  cast: Cast[];
  crew: Crew[];
};

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  // ---------------------------
  // 2. 데이터 페칭 로직
  // ---------------------------
  useEffect(() => {
    if (!movieId) return;
    const fetchMovie = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        // 영화 상세 정보와 크레딧 정보를 Promise.all로 병렬 요청
        const [movieRes, creditsRes] = await Promise.all([
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
        setMovie(movieRes.data);
        setCredits(creditsRes.data);
      } catch (error) {
        console.error("Failed to fetch movie details or credits:", error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  // ---------------------------
  // 3. 로딩 및 에러 처리
  // ---------------------------
  if (isError) {
    return <div className="text-red-500 text-2xl p-10">데이터를 불러오는 중 에러가 발생했습니다.</div>;
  }

  if (isPending || !movie) {
    return <div className="flex items-center justify-center h-dvh text-xl">로딩중...</div>;
  }

  // ---------------------------
  // 4. 데이터 가공
  // ---------------------------
  // 감독 추출
  const directors = credits?.crew.filter((c) => c.job === "Director") ?? [];
  // 출연진 7명만 표시
  const castList = credits?.cast.slice(0, 7) ?? [];
  // 장르 이름 목록
  const genreNames = movie.genres.map(g => g.name).join(', ');
  // 개봉 년도
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  // ---------------------------
  // 5. 렌더링 (사진과 동일한 레이아웃)
  // ---------------------------
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 사진과 동일한 어두운 오버레이 */}
      <div className="min-h-screen bg-black/90">
        <div className="max-w-6xl mx-auto px-8 py-16 text-white">
          
          {/* 영화 제목과 기본 정보 섹션 */}
          <div className="mb-12">
            <h1 className="text-6xl font-bold mb-4 text-white">{movie.title}</h1>
            
            {/* 평점, 개봉일, 상영시간 */}
            <div className="flex items-center space-x-4 mb-4 text-lg">
              <span className="text-white font-semibold">평균 {movie.vote_average.toFixed(1)}</span>
              <span className="text-gray-400">|</span>
              <span className="text-white">{movie.release_date}</span>
              <span className="text-gray-400">|</span>
              <span className="text-white">{movie.runtime}분</span>
            </div>
            
            {/* 줄거리 */}
            <p className="text-gray-200 leading-relaxed max-w-4xl text-lg">
              {movie.overview}
            </p>
          </div>

          {/* 감독 | 출연진 섹션 */}
          <div className="mt-16">
            <h2 className="text-4xl font-bold mb-8 text-white">감독 | 출연</h2>
            <div className="flex gap-8 flex-wrap justify-start">
              
              {/* 감독 */}
              {directors.map((person) => (
                <div key={person.id} className="flex flex-col items-center w-24 text-center">
                  <img
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                        : "https://via.placeholder.com/92x92?text=Director"
                    }
                    alt={person.name}
                    className="w-24 h-24 rounded-full object-cover mb-2"
                  />
                  <span className="text-white font-semibold text-sm">{person.name}</span>
                  <span className="text-gray-400 text-xs">감독</span>
                </div>
              ))}
              
              {/* 출연진 */}
              {castList.map((person) => (
                <div key={person.id} className="flex flex-col items-center w-24 text-center">
                  <img
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                        : "https://via.placeholder.com/92x92?text=Actor"
                    }
                    alt={person.name}
                    className="w-24 h-24 rounded-full object-cover mb-2"
                  />
                  <span className="text-white text-sm font-medium">{person.name}</span>
                  <span className="text-gray-400 text-xs truncate w-full">{person.character}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;