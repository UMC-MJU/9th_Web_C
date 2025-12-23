import type { Movie } from "../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-60">
      {/* 모달 콘텐츠 박스 */}
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-2 right-2 z-50 text-3xl text-gray-800 hover:text-red-500"
          onClick={onClose}
        >
          ✕
        </button>

        {/* 콘텐츠 */}
        <div className="flex gap-6">
          <img
            src={
              movie.poster_path
                ? `${imageBaseUrl}${movie.poster_path}`
                : "https://via.placeholder.com/300x450"
            }
            alt={movie.title}
            className="h-[300px] w-[200px] rounded object-cover"
          />

          <div className="flex flex-col">
            <h2 className="text-xl font-bold">{movie.title}</h2>
            <p className="text-sm text-gray-500 mb-1">{movie.original_title}</p>
            <p className="text-blue-600 font-bold text-sm">
              {movie.vote_average.toFixed(1)}점 ({movie.vote_count}명)
            </p>
            <p className="mt-2 text-sm text-gray-500">
              <strong>개봉일:</strong> {movie.release_date}
            </p>
            <p className="mt-2 text-sm text-gray-700 leading-relaxed">
              {movie.overview || "줄거리가 없습니다."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
