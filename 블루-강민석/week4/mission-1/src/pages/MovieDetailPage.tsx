import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { DetailCard } from "../components/DetailCard";
import type { MovieCredits, MovieDetails } from "../types/movie";
import { useCustomFetch } from "../hooks/useCustomFetch";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const url1 = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-Ko`;
  const url2 = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KO`;

  const { data: details, loading, error } = useCustomFetch<MovieDetails>(url1);
  const { data: credits, loading: creditsLoading, error: creditsError } = useCustomFetch<MovieCredits>(url2);

  if (error || creditsError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다</span>
      </div>
    );
  }

  return (
    <div>
      {loading ||
        (creditsLoading && (
          <div className="flex items-center justify-center h-dvh">
            <LoadingSpinner />
          </div>
        ))}
      {!loading && !creditsLoading && details && credits && (
        <div>
          <DetailCard detail={details} credits={credits}></DetailCard>
        </div>
      )}
    </div>
  );
};
export default MovieDetailPage;
