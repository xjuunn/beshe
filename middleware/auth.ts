import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()

  // 如果用户未登录且访问的不是登录/注册页面，重定向到登录页
  if (!userStore.isLoggedIn && !to.path.startsWith('/auth/')) {
    return navigateTo('/auth/login')
  }

  // 如果用户已登录且访问登录/注册页面，重定向到首页
  if (userStore.isLoggedIn && to.path.startsWith('/auth/')) {
    return navigateTo('/')
  }
})
