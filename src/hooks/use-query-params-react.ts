import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";

type ReplaceOptions = {
  resetQueries?: string[];
  push?: boolean;
  path?: string;
};

export const useQueryParams = <T extends Record<string, string>>() => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const getPath = useCallback(
    (key: string, val: string, options?: ReplaceOptions) => {
      const newParams = new URLSearchParams(searchParams);

      if (options?.resetQueries) {
        options.resetQueries.forEach((k) => newParams.delete(k));
      }

      if (val) {
        newParams.set(key, val);
      } else {
        newParams.delete(key);
      }

      return `${options?.path || location.pathname}?${newParams.toString()}`;
    },
    [location.pathname, searchParams]
  );

  const replaceQuery = useCallback(
    (key: string, val: string, options?: ReplaceOptions) => {
      const newPath = getPath(key, val, options);

      if (options?.push) {
        navigate(newPath);
        return;
      }

      navigate(newPath, { replace: true });
    },
    [getPath, navigate]
  );

  const replaceQueries = useCallback(
    (queries: T, options?: ReplaceOptions) => {
      const newParams = new URLSearchParams(searchParams);

      if (options?.resetQueries) {
        options.resetQueries.forEach((key) => {
          newParams.delete(key);
        });
      }

      Object.entries(queries).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });

      const newPath = `${
        options?.path || location.pathname
      }?${newParams.toString()}`;

      if (options?.push) {
        navigate(newPath);
        return;
      }

      navigate(newPath, { replace: true });
    },
    [location.pathname, searchParams, navigate]
  );

  const query: T = useMemo(() => {
    const obj: T = {} as T;
    for (const [k, v] of searchParams.entries()) {
      obj[k as keyof T] = v as T[keyof T];
    }
    return obj;
  }, [searchParams]);

  const resetQuery = useCallback(
    (exceptKeys?: string[]) => {
      const newParams = new URLSearchParams();

      if (exceptKeys) {
        searchParams.forEach((value, key) => {
          if (exceptKeys.includes(key)) {
            newParams.set(key, value);
          }
        });
      }

      const query = newParams.toString();
      const newPath = query
        ? `${location.pathname}?${query}`
        : location.pathname;

      navigate(newPath, { replace: true });
    },
    [location.pathname, searchParams, navigate]
  );

  return {
    replaceQuery,
    replaceQueries,
    getPath,
    query,
    resetQuery,
  };
};
