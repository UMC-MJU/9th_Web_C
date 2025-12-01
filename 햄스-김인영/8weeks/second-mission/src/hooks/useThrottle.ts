import { useEffect, useRef, useState } from 'react';

export function useThrottle<T>(value:T, delay:number):T{
  const [throttleValue, setThrottleValue] = useState<T>(value);

  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    if(Date.now() >= lastExecuted.current + delay){
      lastExecuted.current = Date.now();
      setThrottleValue(value);
    }else{
      const timerId:number = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottleValue(value);
      }, delay);

      return () => clearTimeout(timerId);
    }

  }, [value, delay]);

  return throttleValue;
}