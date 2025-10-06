import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { DetailCard } from "../components/DetailCard";
import type { MovieCredits, MovieDetails } from "../types/movie";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [detailData, setDetailData] = useState<MovieDetails>();
  const [creditsData, setCreditsData] = useState<MovieCredits>();

  useEffect(() => {
    const fetchDetail = async () => {
      setIsPending(true);
      try {
        const { data: dataDetail } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-Ko`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        const { data: dataCredit } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KO`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        console.log(dataCredit);
        setDetailData(dataDetail);
        setCreditsData(dataCredit);
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
      {!isPending && detailData && creditsData && (
        <div>
          <DetailCard detail={detailData} credits={creditsData}></DetailCard>
        </div>
      )}
    </div>
  );
};
export default MovieDetailPage;
