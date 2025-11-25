import React from "react";
import CommentSkeleton from "./CommentSkeleton";

interface CommentSkeletonListProps {
  count: number;
}

const CommentSkeletonList: React.FC<CommentSkeletonListProps> = ({ count }) => (
  <div className="space-y-4">
    {[...Array(count)].map((_, i) => (
      <CommentSkeleton key={i} />
    ))}
  </div>
);

export default CommentSkeletonList;
