import { useEffect, useState } from "react";
import axios from "axios";
import type { MovieDetail, Credits } from "../types/movies";

type MovieDetailState = {
  detail?: MovieDetail;
  credit?: Credits;
  isLoading: boolean;
  isError: boolean;
};

export const useMovieDetail = (movieId: string | undefined): MovieDetailState => {
  const [detail, setDetail] = useState<MovieDetail>();
  const [credit, setCredit] = useState<Credits>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetail = async () => {
      setIsLoading(true);
      try {
        const [detailData, creditData] = await Promise.all([
          axios.get<MovieDetail>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
              },
            }
          ),
          axios.get<Credits>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
              },
            }
          ),
        ]);

        setDetail(detailData.data);
        setCredit(creditData.data);
        setIsError(false);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  return { detail, credit, isLoading, isError };
};
