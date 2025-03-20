import { Providers } from '@/providers/Providers';
import { Outlet } from '@tanstack/react-router';

import { createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <Outlet />
      <TanStackRouterDevtools />
    </Providers>
  ),
});
