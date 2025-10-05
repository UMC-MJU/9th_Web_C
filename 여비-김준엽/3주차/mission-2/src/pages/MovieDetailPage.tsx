import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  // 필요한 필드 추가
};

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsPending(true); 
      try {
        const { data } = await axios.get<MovieDetail>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovie(data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  if (isError) {
    return <div className="text-red-500 text-2xl">에러가 발생했습니다.</div>;
  }

  if (isPending || !movie) {
    return <div className="flex items-center justify-center h-dvh">로딩중...</div>;
  }

  return (
    <div className="p-10 flex flex-col items-center">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-64 rounded-lg shadow-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="mb-2 text-gray-600">개봉일: {movie.release_date}</p>
      <p className="mb-2 text-yellow-600">평점: {movie.vote_average}</p>
      <p className="max-w-xl">{movie.overview}</p>
    </div>
  );
};

export default MovieDetailPage;