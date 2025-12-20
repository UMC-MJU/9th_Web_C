import { axiosInstance } from "./axiosInstance";

export const patchUsers = async (formData: FormData) => {
  const { data } = await axiosInstance.patch("/v1/users", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteUsers = async () => {
  const {data} = await axiosInstance.delete("/v1/users");
  return data;
}