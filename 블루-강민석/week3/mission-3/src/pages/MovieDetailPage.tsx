import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { DetailCard } from "../components/DetailCard";
import type { MovieDetails } from "../types/movie";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [detailData, setDetailData] = useState<MovieDetails>();

  useEffect(() => {
    const fetchDetail = async () => {
      setIsPending(true);
      try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setDetailData(data);
        setIsPending(false);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchDetail();
  }, [movieId]);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다</span>
      </div>
    );
  }

  return (
    <div>
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}
      {!isPending && detailData && (
        <div>
          <DetailCard detail={detailData}></DetailCard>
        </div>
      )}
    </div>
  );
};
export default MovieDetailPage;
