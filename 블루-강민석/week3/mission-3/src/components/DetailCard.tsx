import type { MovieDetails } from "../types/movie";

interface DetailCardProps {
  detail: MovieDetails;
}

export const DetailCard = ({ detail }: DetailCardProps) => {
  return (
    <div className="bg-white text-gray-800 p-8 rounded-lg shadow-md md:flex md:space-x-8 dark:bg-gray-900 dark:text-gray-200">
      {/* 좌측에 영화포스터 크게*/}
      <div className="w-full md:w-1/3 flex-shrink-0">
        <img
          src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
          alt={detail.title}
          className="rounded-lg w-full h-auto object-cover shadow-lg"
        />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 mt-6 md:mt-0">
        <h1 className="text-4xl font-extrabold mb-2 text-gray-900 dark:text-white">{detail.title}</h1>
        <div className="flex items-center text-sm text-gray-500 mb-4 dark:text-gray-400">
          <span className="mr-4">{detail.release_date.split("-")[0]}</span>
          {/* Add a pipe character as a separator, similar to the example */}
          <span className="mr-4">|</span>
          <span className="mr-4">⭐ {detail.vote_average.toFixed(1)}</span>
          <span className="mr-4">|</span>
          <span>{detail.runtime}분</span>
        </div>

        {/* This section mimics the 'member score' and 'your rating' section */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex items-center space-x-2">
            <div className="text-xl font-bold bg-green-500 text-white w-14 h-14 flex items-center justify-center rounded-full border-2 border-green-700">
              {Math.round(detail.vote_average * 10)}%
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              회원
              <br />
              점수
            </span>
          </div>
        </div>

        {/* Overview section with bold title */}
        <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">개요</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">{detail.overview}</p>

        <p>hello</p>
      </div>
    </div>
  );
};
