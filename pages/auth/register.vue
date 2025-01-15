<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center px-4 py-8">
    <div class="card w-full max-w-sm bg-base-100">
      <div class="card-body p-8">
        <!-- Logo -->
        <div class="flex flex-col items-center gap-3 mb-10">
          <div class="avatar">
            <div class="w-24 rounded-full ring ring-primary ring-offset-2">
              <div class="text-3xl flex items-center justify-center bg-primary text-primary-content h-full">
                商城
              </div>
            </div>
          </div>
          <h2 class="text-2xl font-semibold mt-2">创建账号</h2>
          <p class="text-sm text-base-content/60">填写信息完成注册</p>
        </div>

        <!-- 注册表单 -->
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- 用户名 -->
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">用户名</span>
              <span class="label-text-alt text-error">*</span>
            </div>
            <input type="text" v-model="form.username" 
                   placeholder="请输入用户名" 
                   class="input input-bordered w-full h-12" />
          </label>

          <!-- 密码 -->
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">设置密码</span>
              <span class="label-text-alt text-error">*</span>
            </div>
            <input type="password" v-model="form.password" 
                   placeholder="请设置登录密码" 
                   class="input input-bordered w-full h-12" />
            <div class="label">
              <span class="label-text-alt text-base-content/60">
                密码长度8-20位，包含字母和数字
              </span>
            </div>
          </label>

          <!-- 确认密码 -->
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">确认密码</span>
              <span class="label-text-alt text-error">*</span>
            </div>
            <input type="password" v-model="form.confirmPassword" 
                   placeholder="请再次输入密码" 
                   class="input input-bordered w-full h-12" />
          </label>

          <!-- 用户协议 -->
          <div class="flex items-start gap-3 pt-2">
            <input type="checkbox" v-model="form.agreement" 
                   class="checkbox checkbox-sm checkbox-primary mt-1" />
            <span class="text-sm text-base-content/80">
              我已阅读并同意
              <a class="link link-primary link-hover">《用户协议》</a>
              和
              <a class="link link-primary link-hover">《隐私政策》</a>
            </span>
          </div>

          <!-- 错误提示 -->
          <div v-if="error" class="alert alert-error shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{{ error }}</span>
          </div>

          <!-- 注册按钮 -->
          <button class="btn btn-primary w-full h-12" 
                  :class="{ loading: loading }"
                  type="submit"
                  :disabled="loading">
            {{ loading ? '注册中...' : '注册' }}
          </button>
        </form>

        <!-- 登录链接 -->
        <div class="text-center text-sm mt-8">
          <span class="text-base-content/60">已有账号？</span>
          <NuxtLink to="/auth/login" class="link link-primary link-hover ml-1">
            立即登录
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const form = ref({
  username: '',
  password: '',
  confirmPassword: '',
  agreement: false
})

const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  // 表单验证
  if (!form.value.username || !form.value.password || !form.value.confirmPassword) {
    error.value = '请填写完整信息'
    return
  }

  if (form.value.password !== form.value.confirmPassword) {
    error.value = '两次输入的密码不一致'
    return
  }

  if (!form.value.agreement) {
    error.value = '请阅读并同意用户协议'
    return
  }

  if (!/^[a-zA-Z0-9_]{4,16}$/.test(form.value.username)) {
    error.value = '用户名只能包含字母、数字和下划线，长度4-16位'
    return
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(form.value.password)) {
    error.value = '密码必须包含字母和数字，长度8-20位'
    return
  }

  loading.value = true
  error.value = ''

  try {
    await userStore.register({
      username: form.value.username,
      password: form.value.password
    })
    
    router.push('/')
  } catch (err: any) {
    error.value = err.message || '注册失败'
  } finally {
    loading.value = false
  }
}
</script>
