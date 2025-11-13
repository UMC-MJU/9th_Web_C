import type { PaginationDto } from "../types/common";
import type { RequestCreateLp, LpDetail, RequestPostComment, ResponsePostComment, ResponseCreateLp } from "../types/lp";
import { axiosInstance } from "./axiosInstance";

export const getLpList = async (paginationDto: PaginationDto) => {
  const {data} = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });
  return data;
}

// LP 상세 조회
export const getLpDetail = async (lpid: number): Promise<LpDetail> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);
  return data.data;
};

export const getCommentList = async (
  lpid: number,
  params?: Record<string, any>
) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}/comments`, {
    params,
  });
  return data;
};

export const postLp = async (body: RequestCreateLp) :Promise<ResponseCreateLp> => {
  const { data } = await axiosInstance.post("/v1/lps", body);
  return data.data;
};

export const postLpComment = async (body:RequestPostComment) : Promise<ResponsePostComment> => {
  const {data} = await axiosInstance.post(`/v1/lps/${body.lpId}/comments`, body);
  return data.data;
}