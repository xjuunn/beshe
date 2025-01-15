<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center px-4 py-8">
    <div class="card w-full max-w-sm bg-base-100 shadow-xl">
      <div class="card-body p-8">
        <!-- Logo -->
        <div class="flex flex-col items-center gap-3 mb-10">
          <div class="avatar">
            <div class="w-24 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
              <div class="text-3xl flex items-center justify-center bg-primary text-primary-content h-full font-bold">
                商城
              </div>
            </div>
          </div>
          <h2 class="text-2xl font-bold mt-2">欢迎回来</h2>
          <p class="text-sm text-base-content/60">登录你的账号</p>
        </div>

        <!-- 登录表单 -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- 用户名 -->
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text font-medium">用户名</span>
            </div>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
              </span>
              <input type="text" v-model="form.username" 
                     placeholder="请输入用户名" 
                     class="input input-bordered w-full h-12 pl-10 pr-4" />
            </div>
          </label>

          <!-- 密码 -->
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text font-medium">密码</span>
              <a class="link link-primary link-hover text-sm">忘记密码？</a>
            </div>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </span>
              <input type="password" v-model="form.password" 
                     placeholder="请输入密码" 
                     class="input input-bordered w-full h-12 pl-10 pr-4" />
            </div>
          </label>

          <!-- 记住我 -->
          <div class="flex items-center gap-2">
            <input type="checkbox" v-model="form.remember" 
                   class="checkbox checkbox-sm checkbox-primary" />
            <span class="label-text">记住我</span>
          </div>

          <!-- 错误提示 -->
          <div v-if="error" class="alert alert-error shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ error }}</span>
          </div>

          <!-- 登录按钮 -->
          <button class="btn btn-primary w-full h-12" 
                  :class="{ loading: loading }"
                  type="submit"
                  :disabled="loading">
            {{ loading ? '登录中...' : '登录' }}
          </button>
        </form>

        <!-- 分割线 -->
        <div class="divider text-xs text-base-content/50 my-8">其他登录方式</div>

        <!-- 第三方登录 -->
        <div class="flex justify-center gap-6">
          <button class="btn btn-circle btn-outline hover:btn-primary transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.6 14c-.2-.1-2.1-.6-2.4-.7-.3-.1-.5-.1-.7.1-.2.2-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C9 9.3 8.3 7.4 8 6.9c-.3-.5-.6-.4-.8-.4h-.7c-.2 0-.6.1-.9.5C5.3 7.5 4.7 8.4 4.7 9.3c0 .9.6 1.8.7 1.9.1.1 1.7 2.6 4.2 3.7.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.6-.3z"/>
            </svg>
          </button>
          <button class="btn btn-circle btn-outline hover:btn-primary transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.3 12c0 4.6-3.7 8.3-8.3 8.3S3.7 16.6 3.7 12 7.4 3.7 12 3.7s8.3 3.7 8.3 8.3zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3.5 14.5c-.7.7-1.5 1.2-2.4 1.5-.9.3-1.8.5-2.8.5-1 0-1.9-.2-2.8-.5-.9-.3-1.7-.8-2.4-1.5-.7-.7-1.2-1.5-1.5-2.4-.3-.9-.5-1.8-.5-2.8 0-1 .2-1.9.5-2.8.3-.9.8-1.7 1.5-2.4.7-.7 1.5-1.2 2.4-1.5.9-.3 1.8-.5 2.8-.5 1 0 1.9.2 2.8.5.9.3 1.7.8 2.4 1.5.7.7 1.2 1.5 1.5 2.4.3.9.5 1.8.5 2.8 0 1-.2 1.9-.5 2.8-.3.9-.8 1.7-1.5 2.4z"/>
            </svg>
          </button>
          <button class="btn btn-circle btn-outline hover:btn-primary transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.6 14c-.2-.1-2.1-.6-2.4-.7-.3-.1-.5-.1-.7.1-.2.2-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C9 9.3 8.3 7.4 8 6.9c-.3-.5-.6-.4-.8-.4h-.7c-.2 0-.6.1-.9.5C5.3 7.5 4.7 8.4 4.7 9.3c0 .9.6 1.8.7 1.9.1.1 1.7 2.6 4.2 3.7.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.6-.3z"/>
            </svg>
          </button>
        </div>

        <!-- 注册链接 -->
        <div class="text-center text-sm mt-8">
          <span class="text-base-content/60">还没有账号？</span>
          <NuxtLink to="/auth/register" class="link link-primary link-hover ml-1">
            立即注册
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const error = ref('')

// 表单数据
const form = ref({
  username: '',
  password: '',
  remember: false
})

// 登录处理
const handleLogin = async () => {
  // 表单验证
  if (!form.value.username || !form.value.password) {
    error.value = '请输入用户名和密码'
    return
  }

  try {
    loading.value = true
    error.value = ''

    // 调用登录接口
    const response = await useFetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: form.value.username,
        password: form.value.password
      }
    })

    const responseData = response.data.value
    
    // 处理响应
    if (responseData?.code === 200 && 'data' in responseData) {
      // 保存token
      const token = responseData.data.token
      localStorage.setItem('token', token)
      
      // 如果选择记住我，保存用户名
      if (form.value.remember) {
        localStorage.setItem('rememberedUser', form.value.username)
      } else {
        localStorage.removeItem('rememberedUser')
      }

      // 跳转到首页
      router.push('/')
    } else {
      error.value = responseData && typeof responseData === 'object' && 'message' in responseData 
        ? (typeof responseData.message === 'string' ? responseData.message : '登录失败')
        : '登录失败'
    }
  } catch (e: any) {
    error.value = '登录失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 页面加载时检查是否有记住的用户
onMounted(() => {
  const rememberedUser = localStorage.getItem('rememberedUser')
  if (rememberedUser) {
    form.value.username = rememberedUser
    form.value.remember = true
  }
})
</script>
