export default function CommentSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-start gap-3 mt-2.5">
          <div className="w-7 h-7 rounded-full bg-gray-700 mt-1" />
          <div className="flex flex-col gap-2">
            <div className="w-24 h-3 bg-gray-700 rounded-md" />
            <div className="w-100 h-3 bg-gray-700 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
