import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLpDetail } from "../apis/lp";
import { Lp } from "../types/lp";

export default function LpDetailPage() {
  const { lpId } = useParams<{ lpId: string }>();
  const navigate = useNavigate();

  // LP 상세 정보 상태
  const [lp, setLp] = useState<Lp | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lpId) return;
    setLoading(true);
    getLpDetail(Number(lpId))
      .then((res) => {
        // API 응답 구조에 따라 res.data.data 또는 res.data 사용
        const detail = (res.data.data ?? res.data) as Lp;
        setLp(detail);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("LP 상세 정보를 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [lpId]);

  if (loading) return <div className="p-6">로딩 중…</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!lp) return <div className="p-6">존재하지 않는 LP입니다.</div>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-gray-400 hover:underline"
      >
        &larr; 뒤로가기
      </button>

      <h1 className="text-3xl font-bold mb-4">{lp.title}</h1>

      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full max-w-lg object-cover rounded mb-6"
      />

      <p className="whitespace-pre-line mb-6">{lp.content}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {lp.tags.map((tag) => (
          <span
            key={tag.id}
            className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
          >
            #{tag.name}
          </span>
        ))}
      </div>

      <div className="text-sm text-gray-500">
        작성일: {new Date(lp.createdAt).toLocaleDateString()} &nbsp;|&nbsp;
        수정일: {new Date(lp.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
}
