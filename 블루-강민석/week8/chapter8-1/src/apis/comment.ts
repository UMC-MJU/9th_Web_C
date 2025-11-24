// src/apis/comment.ts

import { axiosInstance } from "./axios";
import { PAGINATION_ORDER } from "../enums/common";

export interface AuthorDto {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CommentDto {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: AuthorDto;
}

export interface GetCommentListResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    data: CommentDto[];
    nextCursor: number;
    hasNext: boolean;
  };
}

export function getCommentList(params: { lpId: number; cursor: number; limit: number; order: PAGINATION_ORDER }) {
  const { lpId, cursor, limit, order } = params;
  return axiosInstance
    .get<GetCommentListResponse>(`/v1/lps/${lpId}/comments`, {
      params: { cursor, limit, order },
    })
    .then((res) => res.data);
}

export interface PostCommentRequest {
  lpId: number;
  content: string;
}

export interface PostCommentResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: CommentDto;
}

export async function postComment({ lpId, content }: PostCommentRequest): Promise<PostCommentResponse> {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });
  return data;
}
