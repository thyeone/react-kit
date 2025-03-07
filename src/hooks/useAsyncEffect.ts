import { type DependencyList, useEffect } from 'react';

type Function = void | (() => void);

export function useAsyncEffect<T>(
  effect: () => Promise<Function>,
  deps: DependencyList,
) {
  useEffect(() => {
    const promise = effect();
    let cleanup: Function;

    promise.then((__cleanup) => {
      cleanup = __cleanup;
    });

    return () => {
      cleanup?.();
    };
  }, deps);
}
