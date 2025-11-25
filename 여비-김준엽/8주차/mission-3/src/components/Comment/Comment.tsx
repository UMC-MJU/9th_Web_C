// src/components/Comment/Comment.tsx
import React from "react";
import { CommentDto } from "../../apis/comment";
import { formatDistanceToNow } from "date-fns";

interface CommentProps {
  comment: CommentDto;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  // author 정보가 없으면 빈 Fragment
  if (!comment.author) return <></>;

  return (
    <div className="flex items-start space-x-3">
      <img
        src={comment.author.avatar ?? ""}
        alt={comment.author.name}
        className="w-8 h-8 rounded-full bg-gray-700 object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-white font-medium">{comment.author.name}</span>
          <span className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
        <p className="text-gray-300 mt-1">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
