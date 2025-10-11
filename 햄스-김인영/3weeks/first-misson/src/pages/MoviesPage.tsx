import { useEffect, useState } from "react"
import type { Movie, MovieResponse } from "../types/movies";
import axios from "axios";
import { MovieCard } from "../components/MovieCard";

export const MoviesPage = (): React.ReactElement => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const {data} = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular',
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.TMDB_API_KEY}`,
          },
        }
      )
      setMovies(data.results);
    }
    fetchMovies();
  },[]);

  console.log(movies);
  return (
    <div>
      <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />
          })}
      </div>
    </div>
  )
}
