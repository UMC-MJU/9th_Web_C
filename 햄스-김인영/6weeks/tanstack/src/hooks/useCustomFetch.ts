import { useEffect, useMemo, useRef, useState } from "react";

const STALE_TIME = 5 * 60 * 1000;

const MAX_RETRIES = 3;
//1초마다 재시도
const INITIAL_RETRY_DELAY = 1000;

//로컬 스토리지에 저장할 데이터 구조
interface CacheEntry<T> {
  data: T;
  lastFetched: number;
}

export const useCustomFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  const storageKey = useMemo(() => url, [url]);

  const abortControllerRef = useRef<AbortController | null>(null);

  const retryTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    setIsError(false);

    const fetchData = async (currentRetry = 0): Promise<void> => {
      const currentTime = new Date().getTime();
      const cachedItem = localStorage.getItem(storageKey);

      //캐시 데이터 확인, 신선도 검증
      if (cachedItem) {
        try {
          const cachedData: CacheEntry<T> = JSON.parse(cachedItem);

          if (currentTime - cachedData.lastFetched < STALE_TIME) {
            setData(cachedData.data);
            setIsPending(false);
            console.log("캐시된 데이터 사용", url)
            return;
          }

          //캐시가 만료된 경우
          setData(cachedData.data);
          console.log("만료된 캐시 데이터 사용", url);
        } catch {
          localStorage.removeItem(storageKey);
          console.warn('캐시 에러: 캐시 삭제함', url);
        }
      }

      setIsPending(true);

      try {
        const res = await fetch(url, {
          signal: abortControllerRef.current?.signal,
        });

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const newData = await res.json();
        setData(newData);

        const newCacheEntry: CacheEntry<T> = {
          data: newData,
          lastFetched: new Date().getTime(),
        };

        localStorage.setItem(storageKey, JSON.stringify(newCacheEntry));

      } catch (error) {
        if(error instanceof Error && error.name === 'AbortError') {
          console.log("요청 취소됨.",url);

          return;
        }

        if(currentRetry < MAX_RETRIES){
          //1 2 4 8
          const retryDelay = INITIAL_RETRY_DELAY * Math.pow(2, currentRetry);
          console.log(`재시도, ${retryDelay}ms later` );

          retryTimeoutRef.current = setTimeout(() => {
            fetchData(currentRetry + 1);
          }, retryDelay);
        } else {
          setIsError(true);
          setIsPending(false);
          console.log('최대 재시도 횟수 초과');
        }

        console.log(error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();

    return () => {
      abortControllerRef.current?.abort();

      //예약된 재시도 타이머 취소
      if(retryTimeoutRef.current !== null){
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, [url, storageKey]);

  return { data, isPending, isError };
}