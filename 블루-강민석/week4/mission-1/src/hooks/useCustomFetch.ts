import axios from "axios";
import { useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}
export function useCustomFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  useEffect(() => {
    const fetchData = async () => {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const response = await axios.get(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setState({
          data: response.data,
          loading: false,
          error: null,
        });
      } catch (e) {
        console.error(e);
        setState({
          data: null,
          loading: false,
          error: e instanceof Error ? e : new Error("An unknown error occurred"),
        });
      }
    };
    fetchData();
  }, [url]);
  return state;
}
