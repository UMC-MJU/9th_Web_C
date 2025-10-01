import { useEffect, useState } from "react"
import type { Movie, MovieResponse } from "../types/movies";
import axios from "axios";

export const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const {data} = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular',
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2ZkZmExNzZkNWZjYTM2NmYwM2UxNTc4MWVjNDcyZSIsIm5iZiI6MTc1OTMwMTMxNy4wNjIsInN1YiI6IjY4ZGNjZWM1YjcwMDcxZjVjMGJiMTlhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9qLVd072zerrDkguCVdTJasPl2CWfdNL8Pzzgq3cBpg`,
          },
        }
      )
      setMovies(data.results);
    }
    fetchMovies();
  },[]);

  console.log(movies);
  return (
    <div></div>
  )
}
