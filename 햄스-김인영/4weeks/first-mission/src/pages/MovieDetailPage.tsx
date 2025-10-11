import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import type { Credits, MovieDetail } from "../types/movies";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { DetailCard } from "../components/DetailCard";

export const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState<MovieDetail>();
  const [credit, setCredit] = useState<Credits>();

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsLoading(true);
      try {
        const [detailData, creditData] = await Promise.all([
          axios.get<MovieDetail>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.TMDB_API_KEY}`,
              },
            }
          ),
          axios.get<Credits>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.TMDB_API_KEY}`,
              },
            }
          )
        ]);
          setDetail(detailData.data);
          setCredit(creditData.data);
      } catch (err) {
        console.log(err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieDetail();
  }, [movieId]);

  console.log(detail);
  console.log(credit);

  //에러 메세지
  if (isError) {
    return (
      <div className="text-sm text-red-500 p-3">에러가 발생했습니다.</div>
    )
  }
  //undefined 처리, 로딩 스피너
  if (!detail || !credit) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-black h-vh">
      {isLoading && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}
      <div className="h-[400px] p-5">
        <div className="relative w-full h-full overflow-hidden rounded-xl">
          <img
            src={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`}
            alt={detail.title}
            className="absolute top-0 left-0 w-full h-full object-cover" />
          <div className="absolute top-0 left-0 p-5 w-150 h-full text-white bg-gradient-to-r from-black/70 to-transparent">
            <h1 className="text-4xl font-bold pb-5">{detail.title}</h1>
            <p>평균 {detail.vote_average}</p>
            <p>{detail.release_date}</p>
            <p>{detail.runtime}분</p>
            <p className="pt-5 text-sm">{detail.overview}</p>
          </div>
        </div>
      </div>
      <div className="text-white">
        <h1 className="text-3xl font-bold pl-10 pt-5">감독 | 출연</h1>
        <DetailCard credit={credit}/>
      </div>
    </div>
  )
}