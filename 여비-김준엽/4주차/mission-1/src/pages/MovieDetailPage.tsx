import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { useMovieDetail } from "../hooks/useMovieDetail";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  // 커스텀 훅을 사용하여 영화 상세 정보와 크레딧 정보 가져오기
  const { data, loading, error, refetch } = useMovieDetail(movieId || '');

  // ---------------------------
  // 3. 로딩 및 에러 처리
  // ---------------------------
  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  // ---------------------------
  // 4. 데이터 가공
  // ---------------------------
  const { movie, credits } = data;
  
  // 감독 추출
  const directors = credits?.crew.filter((c) => c.job === "Director") ?? [];
  // 출연진 7명만 표시
  const castList = credits?.cast.slice(0, 7) ?? [];

  // ---------------------------
  // 5. 렌더링 (개선된 디자인)
  // ---------------------------
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 그라데이션 오버레이 */}
      <div className="min-h-screen bg-gradient-to-b from-black/95 via-black/90 to-black/95">
        <div className="max-w-7xl mx-auto px-6 py-12 text-white">
          
          {/* 영화 포스터와 기본 정보 섹션 */}
          <div className="flex flex-col lg:flex-row gap-12 mb-16">
            {/* 포스터 */}
            <div className="flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-80 h-auto rounded-xl shadow-2xl mx-auto lg:mx-0"
              />
            </div>
            
            {/* 영화 정보 */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-xl text-gray-300 italic mb-6">"{movie.tagline}"</p>
                )}
              </div>
              
              {/* 평점, 개봉일, 상영시간 */}
              <div className="flex flex-wrap items-center gap-6 text-lg">
                <div className="flex items-center space-x-2 bg-yellow-500/20 px-4 py-2 rounded-full">
                  <span className="text-yellow-400">⭐</span>
                  <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-500/20 px-4 py-2 rounded-full">
                  <span className="text-blue-400">📅</span>
                  <span>{movie.release_date}</span>
                </div>
                <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full">
                  <span className="text-green-400">⏱️</span>
                  <span>{movie.runtime}분</span>
                </div>
              </div>
              
              {/* 장르 */}
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              
              {/* 줄거리 */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">줄거리</h3>
                <p className="text-gray-200 leading-relaxed text-lg">
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>

          {/* 감독 | 출연진 섹션 */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              감독 & 출연진
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
              
              {/* 감독 */}
              {directors.map((person) => (
                <div key={person.id} className="group">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="relative">
                      <img
                        src={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                            : "https://via.placeholder.com/92x92?text=Director"
                        }
                        alt={person.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-purple-400 group-hover:border-pink-400 transition-all duration-300 group-hover:scale-110"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        감독
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-white font-semibold text-sm block group-hover:text-purple-300 transition-colors">
                        {person.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* 출연진 */}
              {castList.map((person) => (
                <div key={person.id} className="group">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="relative">
                      <img
                        src={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                            : "https://via.placeholder.com/92x92?text=Actor"
                        }
                        alt={person.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-400 group-hover:border-cyan-400 transition-all duration-300 group-hover:scale-110"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        출연
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-white font-semibold text-sm block group-hover:text-blue-300 transition-colors">
                        {person.name}
                      </span>
                      <span className="text-gray-400 text-xs block truncate w-full">
                        {person.character}
                      </span>
                    </div>
                  </div>
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