// src/hooks/queries/useGetInfiniteCommentList.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentList } from "../../apis/comment";
import { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";
import type { GetCommentListResponse } from "../../apis/comment";

export default function useGetInfiniteCommentList(
  lpId: number,
  limit: number,
  order: PAGINATION_ORDER
) {
  return useInfiniteQuery({
    // ⚠️ as const 로 튜플 타입 고정
    queryKey: [QUERY_KEY.comments, lpId, order] as const,

    // pageParam 은 number | undefined 로 자동 추론됩니다
    queryFn: ({ pageParam = 0 }) =>
      getCommentList({ lpId, cursor: pageParam, limit, order }),

    // 최초 커서는 0
    initialPageParam: 0,

    // 다음 페이지가 있으면 nextCursor, 없으면 undefined
    getNextPageParam: (lastPage: GetCommentListResponse) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
  });
}
