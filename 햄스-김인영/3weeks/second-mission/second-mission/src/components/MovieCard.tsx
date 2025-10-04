import { useState } from "react";
import { type Movie } from "../types/movies"

type MovieCardProps = {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative rounded-xl w-50 overflow-hidden
        transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
      {isHovered &&
        <div key={movie.id} className="absolute top-0 left-0 bg-gradient-to-t from-black/50 to-transparent
          text-white flex flex-col justify-center item-center p-4 h-full">
          <h1 className="text-lg font-bold text-center leading-snug">{movie.title}</h1>
          <p className="text-sm text-gray-300 mt-2 line-clamp-5 text-center">{movie.overview}</p>
        </div>
      }
    </div>
  )
}
