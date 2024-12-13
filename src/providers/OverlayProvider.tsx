import { AnimatePresence } from 'framer-motion';
import React, { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';

type ContextValue = {
  mount(id: string, element: ReactNode): void;
  unmount(id: string): void;
};

export const OverlayContext = createContext<ContextValue | null>(null);

export const useOverlayContext = () => {
  const context = useContext(OverlayContext);

  if (!context) {
    throw new Error();
  }
  return context;
};

export default function OverlayProvider({ children }: PropsWithStrictChildren) {
  const [overlayById, setOverlayById] = useState<Map<string, ReactNode>>(new Map());

  const mount = useCallback((id: string, element: ReactNode) => {
    setOverlayById((overlayById) => {
      const cloned = new Map(overlayById);
      cloned.set(id, element);
      return cloned;
    });
  }, []);

  const unmount = useCallback((id: string) => {
    setOverlayById((overlayById) => {
      const cloned = new Map(overlayById);
      cloned.delete(id);
      return cloned;
    });
  }, []);

  const context = useMemo(() => ({ mount, unmount }), [mount, unmount]);

  return (
    <OverlayContext.Provider value={context}>
      {children}
      <AnimatePresence>
        {[...overlayById.entries()].map(([id, element]) => (
          <React.Fragment key={id}>{element}</React.Fragment>
        ))}
      </AnimatePresence>
    </OverlayContext.Provider>
  );
}
