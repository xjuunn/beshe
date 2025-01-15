export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()
  
  // 需要登录的路由
  const requiresAuth = to.path.startsWith('/admin') || 
                      to.path.startsWith('/orders') || 
                      to.path.startsWith('/favorites')
  
  if (requiresAuth && !userStore.token) {
    return navigateTo('/auth/login')
  }
}) 