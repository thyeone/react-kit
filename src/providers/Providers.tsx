import { OverlayProvider } from 'overlay-kit';
import { QueryProvider } from './QueryProvider';

export function Providers({ children }: PropsWithStrictChildren) {
  return (
    <QueryProvider>
      <OverlayProvider>{children}</OverlayProvider>
    </QueryProvider>
  );
}
