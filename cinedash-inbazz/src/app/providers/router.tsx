import {
  createRouter,
  createRootRoute,
  createRoute,
  redirect,
  Outlet,
} from '@tanstack/react-router'

import { LoginPage } from '@/pages/login'
import { useAuthStore } from '@/features/auth'

const isAuthenticated = () => {
  return useAuthStore.getState().isAuthenticated
}

const rootRoute = createRootRoute({
  component: Outlet,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LoginPage,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: () => <div>Dashboard</div>,
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  dashboardRoute,
])

export const router = createRouter({
  routeTree,
})