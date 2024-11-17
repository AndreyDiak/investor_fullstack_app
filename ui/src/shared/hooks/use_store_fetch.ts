import { useCallback, useState } from "react";
import { catchError } from "../lib";

interface UseStoreFetchOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export function useStoreFetch<T extends (...args: any[]) => Promise<any>>(
  callback: T,
  options?: UseStoreFetchOptions
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Awaited<ReturnType<T>>>();
  const [error, setError] = useState<Error>();

  const { onError, onSuccess } = options ?? {};

  const modified = useCallback(
    async (...args: unknown[]) => {
      setLoading(true);
      setError(undefined);
      const [error, json] = await catchError<Awaited<ReturnType<T>>, any>(
        callback(...args)
      );
      setLoading(false);
      if (error) {
        setError(error);
        onError?.(error);
        return;
      }
      onSuccess?.();
      setData(json);
      return json;
    },
    [callback, onSuccess, onError]
  );

  return { data, loading, error, fetch: modified as T };
}
