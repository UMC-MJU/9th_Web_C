import type { MovieCredits, MovieDetails } from "../types/movie";

interface DetailCardProps {
  detail: MovieDetails;
  credits: MovieCredits;
}

export const DetailCard = ({ detail, credits }: DetailCardProps) => {
  const director = credits.crew.find((member) => member.job === "Director");
  const cast = credits.cast.slice(0, 10);

  return (
    <div className="bg-white text-gray-800 p-8 rounded-xl shadow-lg md:flex md:space-x-12 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
      {/* Left side: Movie poster */}
      <div className="w-full md:w-1/3 flex-shrink-0 mb-6 md:mb-0">
        <img
          src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}
          alt={detail.title}
          className="rounded-lg w-full h-auto object-cover"
        />
      </div>

      {/* Right side: Main content */}
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">{detail.title}</h1>
        <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4 dark:text-gray-400">
          <span>{detail.release_date.split("-")[0]}</span>
          <span>|</span>
          <span className="text-gray-700 dark:text-gray-300">⭐ {detail.vote_average.toFixed(1)}</span>
          <span>|</span>
          <span>{detail.runtime}분</span>
        </div>

        {/* Overview section */}
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">{detail.overview}</p>

        {/* Director and Cast section */}
        <div className="space-y-8">
          {/* Director */}
          {director && (
            <div>
              <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">감독</h3>
              <div className="flex items-center space-x-4">
                <img
                  src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                  alt={director.name}
                  className="w-16 h-16 rounded-full object-cover shadow-sm"
                />
                <div>
                  <p className="font-semibold">{director.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">연출</p>
                </div>
              </div>
            </div>
          )}

          {/* Cast */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">주요 출연진</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
              {cast.map((actor) => (
                <div key={actor.id} className="flex flex-col items-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="w-20 h-20 rounded-full object-cover mb-2"
                  />
                  <p className="font-medium text-center text-sm">{actor.name}</p>
                  <p className="text-xs text-gray-500 text-center dark:text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
