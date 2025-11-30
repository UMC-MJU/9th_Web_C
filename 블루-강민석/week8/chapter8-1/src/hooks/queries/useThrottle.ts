import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay: number = 500): T {
  // 1. 상태 변수: throttledValue: 최종으로 쓰로틀링 적용된 값 저장.
  // 초기값은 전달받은 value
  const [throttledValue, setThrottledValue] = useState<T>(value);

  // 2. Ref lastExecuted: 마지막으로 실행된 시간을 기록하는 변수
  // useRef 사용하여 컴포넌트 리렌더링 되어도 리렌더링을 트리거하지않아요.
  const lastExecuted: React.RefObject<number> = useRef<number>(Date.now());

  // 3. useEffect: value, delay가 변경될때 아래 로직 실행.
  useEffect(() => {
    // 현재 시각이 lastExecuted.current에 저장된 마지막 시각 + delay보다 비교합니다.
    // 충분한 시간이 지나면 바로업데이트
    if (Date.now() >= lastExecuted.current + delay) {
      // 현재 시각이 지난 경우,
      // 현재 시각으로 lastExecuted 업데이트
      lastExecuted.current = Date.now();
      // 최신 value를 throttledValue에 저장해서 컴포넌트 리렌더링
      setThrottledValue(value);
    } else {
      // 충분한 시각이 지나지 않은 경우, delay 시간 후에 업데이트 (최신 value로)
      const timerId: number = setTimeout(() => {
        // 타이머가 만료되면, 마지막 업데이트 시각으로 갱신합니다.
        lastExecuted.current = Date.now();
        // 최신 value를 throttledValue에 저장해서 컴포넌트 리렌더링
        setThrottledValue(value);
      }, delay);

      // CleanUp Function 이펙트가 재실행되기 전에 타이머가 실행되지 않았다면
      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle;
