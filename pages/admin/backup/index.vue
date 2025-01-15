<template>
  <div>
    <!-- 页面标题 -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">数据备份</h1>
        <p class="opacity-60 mt-1">管理系统数据备份和恢复</p>
      </div>
      <div class="space-x-2">
        <button class="btn btn-primary" @click="createBackup">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          创建备份
        </button>
      </div>
    </div>

    <!-- 备份列表 -->
    <div class="card bg-base-100 shadow-sm">
      <div class="card-body">
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>备份文件</th>
                <th>大小</th>
                <th>创建时间</th>
                <th>备份类型</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="backup in backups" :key="backup.id">
                <td>{{ backup.filename }}</td>
                <td>{{ formatSize(backup.size) }}</td>
                <td>{{ formatDate(backup.createdAt) }}</td>
                <td>
                  <div class="badge" :class="{
                    'badge-primary': backup.type === 'full',
                    'badge-secondary': backup.type === 'incremental'
                  }">
                    {{ backup.type === 'full' ? '全量备份' : '增量备份' }}
                  </div>
                </td>
                <td>
                  <div class="badge" :class="{
                    'badge-success': backup.status === 'completed',
                    'badge-warning': backup.status === 'running',
                    'badge-error': backup.status === 'failed'
                  }">
                    {{ 
                      backup.status === 'completed' ? '完成' :
                      backup.status === 'running' ? '进行中' :
                      backup.status === 'failed' ? '失败' : ''
                    }}
                  </div>
                </td>
                <td>
                  <div class="flex items-center gap-2">
                    <button 
                      class="btn btn-sm btn-ghost btn-square"
                      @click="downloadBackup(backup)"
                      :disabled="backup.status !== 'completed'"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button 
                      class="btn btn-sm btn-ghost btn-square"
                      @click="restoreBackup(backup)"
                      :disabled="backup.status !== 'completed'"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button 
                      class="btn btn-sm btn-ghost btn-square text-error"
                      @click="deleteBackup(backup)"
                      :disabled="backup.status === 'running'"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 备份设置 -->
    <div class="card bg-base-100 shadow-sm mt-6">
      <div class="card-body">
        <h2 class="card-title mb-4">备份设置</h2>
        <form @submit.prevent="saveSettings">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 自动备份 -->
            <div>
              <div class="form-control mb-4">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" v-model="settings.autoBackup" class="checkbox" />
                  <span class="label-text">启用自动备份</span>
                </label>
              </div>
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">备份频率</span>
                </label>
                <select v-model="settings.backupFrequency" class="select select-bordered w-full">
                  <option value="daily">每天</option>
                  <option value="weekly">每周</option>
                  <option value="monthly">每月</option>
                </select>
              </div>
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">备份时间</span>
                </label>
                <input type="time" v-model="settings.backupTime" class="input input-bordered" />
              </div>
            </div>

            <!-- 备份保留 -->
            <div>
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">保留备份数量</span>
                </label>
                <input type="number" v-model="settings.keepBackups" class="input input-bordered" min="1" />
              </div>
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">备份存储位置</span>
                </label>
                <input type="text" v-model="settings.backupPath" class="input input-bordered" />
              </div>
              <div class="form-control mb-4">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" v-model="settings.compressBackup" class="checkbox" />
                  <span class="label-text">压缩备份文件</span>
                </label>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <!-- 远程存储 -->
          <div class="form-control mb-4">
            <label class="label cursor-pointer justify-start gap-4">
              <input type="checkbox" v-model="settings.enableRemoteStorage" class="checkbox" />
              <span class="label-text">启用远程存储</span>
            </label>
          </div>

          <div v-if="settings.enableRemoteStorage" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">存储类型</span>
                </label>
                <select v-model="settings.remoteStorageType" class="select select-bordered w-full">
                  <option value="ftp">FTP</option>
                  <option value="sftp">SFTP</option>
                  <option value="s3">Amazon S3</option>
                </select>
              </div>
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">服务器地址</span>
                </label>
                <input type="text" v-model="settings.remoteHost" class="input input-bordered" />
              </div>
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">端口</span>
                </label>
                <input type="number" v-model="settings.remotePort" class="input input-bordered" />
              </div>
            </div>
            <div>
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">用户名</span>
                </label>
                <input type="text" v-model="settings.remoteUsername" class="input input-bordered" />
              </div>
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">密码</span>
                </label>
                <input type="password" v-model="settings.remotePassword" class="input input-bordered" />
              </div>
              <div class="form-control mb-4">
                <label class="label">
                  <span class="label-text">远程路径</span>
                </label>
                <input type="text" v-model="settings.remotePath" class="input input-bordered" />
              </div>
            </div>
          </div>

          <div class="mt-6">
            <button type="submit" class="btn btn-primary">保存设置</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

// 备份列表
const backups = ref([
  {
    id: 1,
    filename: 'backup_2025_01_15_120000.sql',
    size: 1024 * 1024 * 5, // 5MB
    createdAt: new Date(),
    type: 'full',
    status: 'completed'
  },
  {
    id: 2,
    filename: 'backup_2025_01_15_130000.sql',
    size: 1024 * 1024 * 2, // 2MB
    createdAt: new Date(),
    type: 'incremental',
    status: 'running'
  }
])

// 备份设置
const settings = ref({
  autoBackup: true,
  backupFrequency: 'daily',
  backupTime: '03:00',
  keepBackups: 7,
  backupPath: '/backups',
  compressBackup: true,
  enableRemoteStorage: false,
  remoteStorageType: 'ftp',
  remoteHost: '',
  remotePort: 21,
  remoteUsername: '',
  remotePassword: '',
  remotePath: '/backups'
})

// 格式化文件大小
const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 格式化日期
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}

// 创建备份
const createBackup = async () => {
  try {
    // await backupStore.createBackup()
    ElMessage.success('备份创建成功')
  } catch (error) {
    ElMessage.error('备份创建失败')
  }
}

// 下载备份
const downloadBackup = async (backup: any) => {
  try {
    // await backupStore.downloadBackup(backup.id)
    ElMessage.success('备份下载成功')
  } catch (error) {
    ElMessage.error('备份下载失败')
  }
}

// 恢复备份
const restoreBackup = async (backup: any) => {
  try {
    // await backupStore.restoreBackup(backup.id)
    ElMessage.success('备份恢复成功')
  } catch (error) {
    ElMessage.error('备份恢复失败')
  }
}

// 删除备份
const deleteBackup = async (backup: any) => {
  try {
    // await backupStore.deleteBackup(backup.id)
    ElMessage.success('备份删除成功')
  } catch (error) {
    ElMessage.error('备份删除失败')
  }
}

// 保存设置
const saveSettings = async () => {
  try {
    // await backupStore.saveSettings(settings.value)
    ElMessage.success('设置保存成功')
  } catch (error) {
    ElMessage.error('设置保存失败')
  }
}

// 初始化
onMounted(async () => {
  try {
    // const data = await backupStore.getBackups()
    // backups.value = data.backups
    // settings.value = data.settings
  } catch (error) {
    ElMessage.error('获取数据失败')
  }
})
</script>
