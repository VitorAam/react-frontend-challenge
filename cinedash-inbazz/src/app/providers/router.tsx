import { Loginpage } from '@/pages/login'
import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router'

const rootRoute = createRootRoute({
  component: () => <Loginpage />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div>Home</div>,
})

const routeTree = rootRoute.addChildren([indexRoute])

export const router = createRouter({
  routeTree,
})