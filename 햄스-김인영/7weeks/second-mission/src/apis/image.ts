import axios from "axios";

//비인증 이미지 업로드 API
export const uploadImagePublic = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axios.post("http://localhost:8000/v1/uploads/public", formData);

  return data.data.imageUrl;
};
