import { axiosInstance } from "./axiosInstance";

export const patchUsers = async (formData: FormData) => {
  const { data } = await axiosInstance.patch("/v1/users", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
