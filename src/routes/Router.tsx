import { Providers } from '@/providers/Providers'
import {
  createBrowserRouter,
  Outlet,
  type RouteObject,
  RouterProvider,
} from 'react-router-dom'
import Main from '.'

function Root() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  )
}

const publicRoutes: RouteObject[] = [
  {
    element: <Outlet />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
    ],
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Outlet />,
    children: [],
  },
]

const router = createBrowserRouter([
  { element: <Root />, children: [...publicRoutes, ...privateRoutes] },
])

export default function Router() {
  return <RouterProvider router={router} />
}
