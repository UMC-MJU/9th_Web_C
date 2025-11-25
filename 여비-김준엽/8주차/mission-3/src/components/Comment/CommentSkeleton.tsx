import React from "react";

const CommentSkeleton: React.FC = () => (
  <div className="flex items-start space-x-3 animate-pulse">
    <div className="w-8 h-8 bg-gray-700 rounded-full" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-gray-700 rounded w-1/4" />
      <div className="h-5 bg-gray-700 rounded w-full" />
    </div>
  </div>
);

export default CommentSkeleton;
