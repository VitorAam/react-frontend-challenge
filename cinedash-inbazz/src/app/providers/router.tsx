import {
  createRouter,
  createRootRoute,
  createRoute,
  redirect,
} from '@tanstack/react-router'

import { RootLayout } from '../layouts/root-layout'
import { LoginPage } from '@/pages/login'
import { DashboardPage } from '@/pages/dashboard'
import { useAuthStore } from '@/features/auth'

const isAuthenticated = () => {
  return useAuthStore.getState().isAuthenticated
}

const rootRoute = createRootRoute({
  component: RootLayout,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LoginPage,
})

const privateRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'private',
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({ to: '/' })
    }
  },
})

const dashboardRoute = createRoute({
  getParentRoute: () => privateRoute,
  path: '/movies',
  component: DashboardPage,
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  privateRoute.addChildren([dashboardRoute]),
])

export const router = createRouter({
  routeTree,
})