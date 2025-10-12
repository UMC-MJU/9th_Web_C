import { useState, useEffect } from "react";
import axios from "axios";
import type { Movie, MovieResponse } from "../types/movies";

export const useMoviePage = (category: string | undefined, page: number) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!category) return;

    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          }
        );
        setMovies(data.results);
        setIsError(false);
      } catch (err) {
        console.error(err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]);

  return { movies, isLoading, isError };
};
