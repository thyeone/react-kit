import { forwardRef, type Ref, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { OverlayContext, useOverlayContext } from '../providers/OverlayProvider';

export type CreateOverlayElement = (props: { isOpen: boolean; close: VoidFunction; exit: VoidFunction }) => JSX.Element;

type Props = {
  overlayElement: CreateOverlayElement;
  onExit: VoidFunction;
  historyOnMount: boolean;
};

export type OverlayControlRef = {
  close: VoidFunction;
};

type Options = {
  exitOnUnmount?: boolean;
  delay?: number;
  historyOnMount?: boolean;
};

let elementId = 1;

export function useOverlay({ exitOnUnmount = true, delay = 0, historyOnMount = false }: Options = {}) {
  const context = useOverlayContext();

  const { mount, unmount } = context;

  const overlayRef = useRef<OverlayControlRef | null>(null);

  const [id] = useState(() => String(elementId++));

  useEffect(() => {
    return () => {
      if (exitOnUnmount) {
        unmount(id);
      }
    };
  }, [exitOnUnmount, id, unmount]);

  return useMemo(
    () => ({
      open: (overlayElement: CreateOverlayElement) => {
        mount(
          id,
          <OverlayController
            key={Date.now()}
            ref={overlayRef}
            overlayElement={overlayElement}
            historyOnMount={historyOnMount}
            onExit={() => {
              unmount(id);
            }}
          />
        );

        if (delay) {
          setTimeout(() => {
            overlayRef.current?.close();
          }, delay);
        }
      },
      close: () => {
        overlayRef.current?.close();
      },
      exit: () => {
        unmount(id);
      },
    }),
    [mount, id, unmount]
  );
}

const OverlayController = forwardRef(function OverlayController(
  { overlayElement: OverlayElement, onExit, historyOnMount }: Props,
  ref: Ref<OverlayControlRef>
) {
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const handleOverlayClose = useCallback(() => setIsOpenOverlay(false), []);

  useImperativeHandle(
    ref,
    () => {
      return { close: handleOverlayClose };
    },
    [handleOverlayClose]
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsOpenOverlay(true);
    });
  }, []);

  useEffect(() => {
    if (historyOnMount) window.history.pushState(null, 'history', window.location.href);
  }, [isOpenOverlay]);

  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      if (e.state) requestAnimationFrame(() => setIsOpenOverlay(false));
    };

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return <OverlayElement isOpen={isOpenOverlay} close={handleOverlayClose} exit={onExit} />;
});
