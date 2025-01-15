<template>
  <div>
    <!-- 页面标题 -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">用户管理</h1>
        <p class="opacity-60 mt-1">管理系统用户</p>
      </div>
    </div>

    <!-- 用户统计 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="stats bg-base-100 shadow">
        <div class="stat">
          <div class="stat-title">总用户数</div>
          <div class="stat-value text-primary">{{ stats.totalUsers }}</div>
          <div class="stat-desc">↗︎ {{ stats.userGrowth }}% 较上月</div>
        </div>
      </div>
      <div class="stats bg-base-100 shadow">
        <div class="stat">
          <div class="stat-title">今日活跃</div>
          <div class="stat-value text-secondary">{{ stats.activeUsers }}</div>
          <div class="stat-desc">↗︎ {{ stats.activeGrowth }}% 较昨日</div>
        </div>
      </div>
      <div class="stats bg-base-100 shadow">
        <div class="stat">
          <div class="stat-title">新增用户</div>
          <div class="stat-value text-accent">{{ stats.newUsers }}</div>
          <div class="stat-desc">本月新增</div>
        </div>
      </div>
      <div class="stats bg-base-100 shadow">
        <div class="stat">
          <div class="stat-title">消费用户</div>
          <div class="stat-value">{{ stats.paidUsers }}</div>
          <div class="stat-desc">完成订单的用户</div>
        </div>
      </div>
    </div>

    <!-- 筛选工具栏 -->
    <div class="bg-base-100 p-4 rounded-lg shadow-sm mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1 flex flex-wrap gap-4">
          <select v-model="filterRole" class="select select-bordered w-full max-w-[200px]" @change="handleFilter">
            <option value="">全部角色</option>
            <option v-for="(label, role) in roleMap" :key="role" :value="role">
              {{ label }}
            </option>
          </select>
          <select v-model="filterStatus" class="select select-bordered w-full max-w-[200px]" @change="handleFilter">
            <option value="">全部状态</option>
            <option value="active">活跃</option>
            <option value="inactive">非活跃</option>
            <option value="blocked">已封禁</option>
          </select>
        </div>
        <div class="join">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="搜索用户名/手机号" 
            class="input input-bordered join-item w-full md:w-80" 
            @keyup.enter="handleSearch"
          />
          <button class="btn join-item" @click="handleSearch" :disabled="loading">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 用户列表 -->
    <div class="bg-base-100 rounded-lg shadow-sm">
      <div class="overflow-x-auto">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" v-model="selectAll" @change="handleSelectAll" />
                </label>
              </th>
              <th>用户信息</th>
              <th>角色</th>
              <th>状态</th>
              <th>注册时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="!loading">
              <tr v-for="user in users" :key="user.id" class="hover">
                <td>
                  <label>
                    <input type="checkbox" class="checkbox" v-model="selectedUsers" :value="user.id" />
                  </label>
                </td>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle w-12 h-12">
                        <img :src="user.avatar || '/images/default-avatar.png'" :alt="user.username" />
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">{{ user.nickname || user.username }}</div>
                      <div class="text-sm opacity-60">{{ user.phone }}</div>
                      <div class="text-xs opacity-50">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="badge badge-ghost">{{ roleMap[user.role] }}</div>
                </td>
                <td>
                  <div :class="{
                    'badge': true,
                    'badge-success': user.status === 'active',
                    'badge-warning': user.status === 'inactive',
                    'badge-error': user.status === 'blocked'
                  }">{{ statusMap[user.status] }}</div>
                </td>
                <td>
                  <div>{{ formatDate(user.created_at) }}</div>
                  <div class="text-xs opacity-50">{{ formatTime(user.created_at) }}</div>
                </td>
                <td>
                  <div class="flex gap-2">
                    <button class="btn btn-ghost btn-sm" @click="editUser(user)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <div class="dropdown dropdown-end">
                      <button tabindex="0" class="btn btn-ghost btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                      <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li v-if="user.status !== 'blocked'">
                          <a @click="updateUserStatus(user.id, 'blocked')" class="text-error">封禁用户</a>
                        </li>
                        <li v-else>
                          <a @click="updateUserStatus(user.id, 'active')" class="text-success">解除封禁</a>
                        </li>
                        <li>
                          <a @click="resetPassword(user.id)">重置密码</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="6" class="text-center py-8">
                <span class="loading loading-spinner loading-lg"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 批量操作和分页 -->
      <div class="flex justify-between items-center p-4 border-t">
        <div class="flex items-center gap-4">
          <span class="text-sm opacity-60">已选择 {{ selectedUsers.length }} 项</span>
          <div class="dropdown">
            <button class="btn btn-sm" :disabled="!selectedUsers.length">
              批量操作
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a @click="batchUpdateStatus('blocked')" class="text-error">批量封禁</a></li>
              <li><a @click="batchUpdateStatus('active')" class="text-success">批量解封</a></li>
              <li><a @click="batchResetPassword">批量重置密码</a></li>
            </ul>
          </div>
        </div>
        <div class="join">
          <button 
            class="join-item btn btn-sm"
            :disabled="currentPage === 1"
            @click="handlePageChange(currentPage - 1)"
          >«</button>
          <button 
            v-for="page in displayPages" 
            :key="page"
            class="join-item btn btn-sm"
            :class="{ 'btn-active': page === currentPage }"
            @click="handlePageChange(page)"
          >
            {{ page }}
          </button>
          <button 
            class="join-item btn btn-sm"
            :disabled="currentPage === totalPages"
            @click="handlePageChange(currentPage + 1)"
          >»</button>
        </div>
      </div>
    </div>

    <!-- 编辑用户对话框 -->
    <dialog ref="editDialog" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">编辑用户</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">用户名</span>
            </label>
            <input type="text" v-model="editForm.username" class="input input-bordered" readonly />
          </div>
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">昵称</span>
            </label>
            <input type="text" v-model="editForm.nickname" class="input input-bordered" />
          </div>
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">手机号</span>
            </label>
            <input type="tel" v-model="editForm.phone" class="input input-bordered" />
          </div>
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">邮箱</span>
            </label>
            <input type="email" v-model="editForm.email" class="input input-bordered" />
          </div>
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">角色</span>
            </label>
            <select v-model="editForm.role" class="select select-bordered">
              <option v-for="(label, role) in roleMap" :key="role" :value="role">
                {{ label }}
              </option>
            </select>
          </div>
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">状态</span>
            </label>
            <select v-model="editForm.status" class="select select-bordered">
              <option v-for="(label, status) in statusMap" :key="status" :value="status">
                {{ label }}
              </option>
            </select>
          </div>
          <div class="modal-action">
            <button type="button" class="btn" @click="closeEditDialog">取消</button>
            <button type="submit" class="btn btn-primary">保存</button>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>关闭</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import type { User, UserRole, UserStatus } from '@prisma/client'

definePageMeta({
  layout: 'admin'
})

const userStore = useUserStore()
const { users, loading, totalCount, currentPage, pageSize } = storeToRefs(userStore)

// 统计数据
const stats = ref({
  totalUsers: 0,
  userGrowth: 0,
  activeUsers: 0,
  activeGrowth: 0,
  newUsers: 0,
  paidUsers: 0
})

// 筛选条件
const filterRole = ref<UserRole | ''>('')
const filterStatus = ref<UserStatus | ''>('')
const searchQuery = ref('')

// 角色映射
const roleMap: Record<UserRole, string> = {
  'ADMIN': '管理员',
  'USER': '普通用户',
  'VIP': 'VIP用户'
}

// 状态映射
const statusMap: Record<UserStatus, string> = {
  'active': '活跃',
  'inactive': '非活跃',
  'blocked': '已封禁'
}

// 选择相关
const selectAll = ref(false)
const selectedUsers = ref<number[]>([])

// 编辑相关
const editDialog = ref<HTMLDialogElement>()
const editForm = ref({
  id: 0,
  username: '',
  nickname: '',
  phone: '',
  email: '',
  role: 'USER' as UserRole,
  status: 'active' as UserStatus
})

// 计算总页数
const totalPages = computed(() => Math.ceil(totalCount.value / pageSize.value))

// 计算显示的页码范围
const displayPages = computed(() => {
  const range = 2 // 当前页前后显示的页数
  const start = Math.max(1, currentPage.value - range)
  const end = Math.min(totalPages.value, currentPage.value + range)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

// 格式化日期
const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString()
}

// 格式化时间
const formatTime = (date: string | Date) => {
  return new Date(date).toLocaleTimeString()
}

// 处理全选
const handleSelectAll = () => {
  selectedUsers.value = selectAll.value ? users.value.map(user => user.id) : []
}

// 处理筛选
const handleFilter = () => {
  currentPage.value = 1
  fetchUsers()
}

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1
  fetchUsers()
}

// 处理分页
const handlePageChange = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  fetchUsers()
}

// 获取用户列表
const fetchUsers = async () => {
  await userStore.fetchUsers({
    page: currentPage.value,
    limit: pageSize.value,
    role: filterRole.value || undefined,
    status: filterStatus.value || undefined,
    search: searchQuery.value || undefined
  })
}

// 编辑用户
const editUser = (user: User) => {
  editForm.value = { ...user }
  editDialog.value?.showModal()
}

// 关闭编辑对话框
const closeEditDialog = () => {
  editDialog.value?.close()
}

// 处理表单提交
const handleSubmit = async () => {
  try {
    await userStore.updateUser(editForm.value)
    closeEditDialog()
    ElMessage.success('更新成功')
    fetchUsers()
  } catch (error) {
    ElMessage.error('更新失败')
  }
}

// 更新用户状态
const updateUserStatus = async (id: number, status: UserStatus) => {
  try {
    await userStore.updateUserStatus(id, status)
    ElMessage.success('状态更新成功')
    fetchUsers()
  } catch (error) {
    ElMessage.error('状态更新失败')
  }
}

// 重置密码
const resetPassword = async (id: number) => {
  try {
    await userStore.resetPassword(id)
    ElMessage.success('密码重置成功')
  } catch (error) {
    ElMessage.error('密码重置失败')
  }
}

// 批量更新状态
const batchUpdateStatus = async (status: UserStatus) => {
  try {
    await userStore.batchUpdateStatus(selectedUsers.value, status)
    ElMessage.success('批量更新成功')
    selectedUsers.value = []
    selectAll.value = false
    fetchUsers()
  } catch (error) {
    ElMessage.error('批量更新失败')
  }
}

// 批量重置密码
const batchResetPassword = async () => {
  try {
    await userStore.batchResetPassword(selectedUsers.value)
    ElMessage.success('批量重置密码成功')
    selectedUsers.value = []
    selectAll.value = false
  } catch (error) {
    ElMessage.error('批量重置密码失败')
  }
}

// 监听选中用户变化
watch(selectedUsers, () => {
  selectAll.value = selectedUsers.value.length === users.value.length
})

// 初始化
onMounted(async () => {
  await Promise.all([
    fetchUsers(),
    userStore.fetchUserStats()
  ])
})
</script>
