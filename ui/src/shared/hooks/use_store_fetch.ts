import { useCallback, useState } from "react";
import { catchError } from "../lib";

export function useStoreFetch<T extends (...args: unknown[]) => Promise<any>>(
  callback: T
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Awaited<ReturnType<T>>>();
  const [error, setError] = useState<Error>();

  const modified = useCallback<T>(
    // @ts-ignore
    async (...args) => {
      setLoading(true);
      setError(undefined);
      const [error, json] = await catchError<Awaited<ReturnType<T>>, any>(
        callback(args)
      );
      setLoading(false);
      if (error) {
        setError(error);
        return;
      }
      setData(json);
      return json;
    },
    [callback]
  );

  return [data, loading, error, modified] as const;
}
