import { useCallback, useEffect, useState } from "react";
import useThrottle from "../hooks/queries/useThrottle";

const ThrottlePage = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const throttledScrollY = useThrottle(scrollY, 500); // scrollY 값을 500ms마다 업데이트

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  console.log("렌더링! scrollY:", scrollY, "throttledScrollY:", throttledScrollY);

  return (
    <div className="min-h-[300vh] flex flex-col items-center justify-start pt-20">
      <div className="sticky top-10 bg-gray-900 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Throttle Page</h1>
        <p className="text-lg">즉시 ScrollY: {scrollY}px</p>
        <p className="text-lg text-pink-500">쓰로틀된 ScrollY: {throttledScrollY}px</p>
        <p className="text-sm text-gray-400 mt-2">(500ms마다 업데이트)</p>
      </div>
    </div>
  );
};

export default ThrottlePage;
