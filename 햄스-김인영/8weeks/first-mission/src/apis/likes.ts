import { axiosInstance } from "./axiosInstance";

export const postLike = async (lpId : number) => {
  const {data} = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
}

export const deleteLike = async (lpId : number) => {
  const {data} = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
}