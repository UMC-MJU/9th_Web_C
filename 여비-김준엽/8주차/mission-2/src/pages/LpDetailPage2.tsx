import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import { Likes } from "../types/lp";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";

const LpDetailPage2 = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();
  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });

  const { data: me } = useGetMyInfo(accessToken);
  // mutate -> 비동기 요청을 싱행하고, 콜백 함수를 이용해서 후속 작업 처리함.
  // mutateAsync -> Promise를 반환해서 await 사용 가능.
  const { mutate: likeMutate, mutateAsync } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  // const isLiked = lp?.data.likes
  //   .map((like: Likes) => like.userId)
  //   .includes(me?.data.id as number);
  const isLiked = lp?.data.likes.some(
    (like: Likes) => like.userId === me?.data.id
  );

  const handleLikeLp = () => {
    likeMutate({ lpId: Number(lpId) });
  };

  const handleDisLikeLp = () => {
    disLikeMutate({ lpId: Number(lpId) });
  };

  if (isPending && isError) {
    return <></>;
  }

  return (
    <div className="mt-12 ">
      <h1>{lp?.data.id}</h1>
      <h1>{lp?.data.title}</h1>
      <img
        src={lp?.data.thumbnail}
        className="w-[200px] h-[200px] object-contain"
        alt={lp?.data.title}
      />
      <h2>{lp?.data.content}</h2>

      <button onClick={isLiked ? handleDisLikeLp : handleLikeLp}>
        <Heart
          color={isLiked ? "red" : "white"}
          fill={isLiked ? "red" : "transparent"}
        />
      </button>
    </div>
  );
};

export default LpDetailPage2;
