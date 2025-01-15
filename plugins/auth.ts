

export default defineNuxtPlugin(async (nuxtApp) => {
  // 确保在客户端才执行
  if (process.client) {
    const userStore = useUserStore()
    // 初始化用户状态
    await userStore.init()
  }
})
