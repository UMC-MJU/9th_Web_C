import type { CommonResponse } from "./common";
import type { Author } from "./lp";

export type ResponsePatchComment = CommonResponse<{
  data: {
      id: number;
      content: string;
      lpId: number;
      authorId: number;
      createdAt: string;
      updatedAt: string;
      author : Author;
    }
}>

export type ResponseDeleteComment = CommonResponse<{
  data : {
    message : string;
  }
}>