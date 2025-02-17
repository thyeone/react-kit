"use client";

import { Slot } from "@radix-ui/react-slot";
import { useCallback, useEffect, useRef } from "react";

type Props = {
  onClickOutside: (e: MouseEvent) => void;
};

export function ClickOutsideDetector({
  children,
  onClickOutside,
}: PropsWithStrictChildren<Props>) {
  const ref = useRef<HTMLDivElement>(null);

  const onClickScreen = useCallback(
    (e: MouseEvent) => {
      if (
        !e.target ||
        !(e.target instanceof Node) ||
        !ref.current?.contains(e.target)
      ) {
        onClickOutside?.(e);
      }
    },
    [children, onClickOutside]
  );

  useEffect(() => {
    window.addEventListener("mousedown", onClickScreen, { passive: true });

    return () => {
      window.removeEventListener("mousedown", onClickScreen);
    };
  }, [onClickScreen]);

  return <Slot ref={ref}>{children}</Slot>;
}
