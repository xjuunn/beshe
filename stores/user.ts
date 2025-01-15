import { defineStore } from 'pinia'

interface UserState {
  token: string | null
  user: User | null
  loading: boolean
}

interface User {
  id: number
  username: string
  email?: string
  phone?: string
  role: number
}

interface LoginResponse {
  code: number
  data?: {
    token: string
    user: User
  }
  message?: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: null,
    user: null,
    loading: false
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    userRole: (state) => state.user?.role
  },

  actions: {
    async init() {
      if (process.client) {
        const token = localStorage.getItem('token')
        if (token) {
          this.token = token
          try {
            // TODO: 添加获取用户信息的接口
            // const user = await this.fetchUserInfo()
            // this.user = user
          } catch (error) {
            this.logout()
          }
        }
      }
    },

    async login(username: string, password: string) {
      this.loading = true
      try {
        const response = await $fetch<LoginResponse>('/api/auth/login', {
          method: 'POST',
          body: { username, password }
        })

        if (response.code === 200 && response.data) {
          this.token = response.data.token
          this.user = response.data.user
          if (process.client) {
            localStorage.setItem('token', response.data.token)
          }
          return response.data
        }
        throw new Error(response.message || '登录失败')
      } finally {
        this.loading = false
      }
    },

    async register(userData: { username: string; password: string }) {
      this.loading = true
      try {
        const response = await $fetch<LoginResponse>('/api/auth/register', {
          method: 'POST',
          body: userData
        })

        if (response.code === 200 && response.data) {
          this.token = response.data.token
          this.user = response.data.user
          if (process.client) {
            localStorage.setItem('token', response.data.token)
          }
          return response.data
        }
        throw new Error(response.message || '注册失败')
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.user = null
      if (process.client) {
        localStorage.removeItem('token')
      }
    }
  }
})