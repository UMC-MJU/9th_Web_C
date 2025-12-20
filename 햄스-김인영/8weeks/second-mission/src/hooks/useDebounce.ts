import { useEffect, useState } from "react";

export function useDebounce<T>(value:T, delay:number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  //value나 delay가 변경될 때마다 실행!
  useEffect(() => {
    //delay 후에 실행
    //delay 시간 후에 value를 debouncedValue로 업데이트하는 타이머 시작.
    const handler:number = setTimeout(() => setDebouncedValue(value), delay)

    //value가 변경되면 기존 타이머를 지워서 업데이트를 취소합니다.
    //값이 바뀔 때마다 마지막에 멈춘 값만 업데이트.
    return () => clearTimeout(handler); //clean up 함수
  },[value, delay]);

  return debouncedValue;
} 