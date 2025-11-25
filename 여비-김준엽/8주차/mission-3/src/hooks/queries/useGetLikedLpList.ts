// src/hooks/queries/useGetLikedLpList.ts
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import { Lp } from "../../types/lp";
import { CursorBasedResponse } from "../../types/common";

export type GetLikedLpListParams = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: "asc" | "desc";
};

interface LikesMeResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: CursorBasedResponse<Lp[]>;
}

const fetchLikedLpList = async (params: GetLikedLpListParams) => {
  const res = await axiosInstance.get<LikesMeResponse>("/v1/lps/likes/me", {
    params,
  });
  return res.data.data;
};

const useGetLikedLpList = (params: GetLikedLpListParams = {}) => {
  return useQuery<CursorBasedResponse<Lp[]>, Error>({
    // 1) queryKey
    queryKey: ["likedLpList", params],

    // 2) queryFn
    queryFn: () => fetchLikedLpList(params),

    // 3) 기타 옵션
    //keepPreviousData: true,
  });
};

export default useGetLikedLpList;
