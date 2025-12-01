import { useRef, useCallback } from "react";

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
  const lastExecuted = useRef(0);

  const throttledFn = useCallback(
    (...args: any[]) => {
      const now = Date.now();

      if (now - lastExecuted.current >= delay) {
        lastExecuted.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  );

  return throttledFn;
}
