import { useEffect, useState } from "react"
import type { Movie, MovieResponse } from "../types/movies";
import axios from "axios";
import { MovieCard } from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";

export const MoviesPage = (): React.ReactElement => {
  const [movies, setMovies] = useState<Movie[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);

  const {category} = useParams<{category: string}>();


  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.TMDB_API_KEY}`,
            },
          }
        )
        setMovies(data.results);
        setIsError(false);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, [page, category]);


  console.log(movies);
  return (
    <>
      <div className="flex items-center justify-center mt-5 space-x-4">
        <button
          disabled={page === 1}
          onClick={(): void => setPage((prev): number => prev - 1)}
          className="bg-[#ccbaec] w-14 h-12 rounded-md text-white pb-0.5
          hover:bg-[#addff1] duration-200 disabled:bg-gray-200 cursor-pointer"
          >
          {`<`}</button>
        <span>{page} 페이지</span>
        <button
          onClick={(): void => setPage((prev): number => prev + 1)}
          className="bg-[#addff1] w-14 h-12 rounded-md text-white pb-0.5
          hover:bg-[#ccbaec] duration-200 cursor-pointer"
          >
          {`>`}</button>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}
      <div>
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />
          })}
        </div>
      </div>
    </>
  )
}
