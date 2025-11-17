import type { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Like = {
  id: number;
  userId: number;
  lpId: number;
};

export type ResponseLpListDto = CursorBasedResponse<{
  data: {
    id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Like[];
  }[];
}>;

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Like[];
}

// 작성자 타입
export type Author = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

// 상세 조회용 LP 타입 (기존 Lp 확장)
export type LpDetail = Lp & {
  author: Author;
};

export type LpComment = CursorBasedResponse<{
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

export type RequestCreateLp = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}

export type ResponseCreateLp = CommonResponse<{
  data: {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
  }
}>

export type ResponsePostComment = {
  id: number,
  content: string,
  lpId: number,
  authorId: number,
  createdAt: string,
  updatedAt: string;
  author: Author, 
}

export type RequestPostComment = {
  lpId: number;
  content: string;
}

export type ResponseLpDetail = CommonResponse<{
  data : {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    tags: Tag[];
  }
}>