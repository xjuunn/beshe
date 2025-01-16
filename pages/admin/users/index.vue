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
          <div class="stat-value text-primary">test</div>
          <div class="stat-desc">↗︎ test% 较上月</div>
        </div>
      </div>
      <div class="stats bg-base-100 shadow">
        <div class="stat">
          <div class="stat-title">今日活跃</div>
          <div class="stat-value text-secondary">test</div>
          <div class="stat-desc">↗︎ test% 较昨日</div>
        </div>
      </div>
      <div class="stats bg-base-100 shadow">
        <div class="stat">
          <div class="stat-title">新增用户</div>
          <div class="stat-value text-accent">test</div>
          <div class="stat-desc">本月新增</div>
        </div>
      </div>
      <div class="stats bg-base-100 shadow">
        <div class="stat">
          <div class="stat-title">消费用户</div>
          <div class="stat-value">test</div>
          <div class="stat-desc">完成订单的用户</div>
        </div>
      </div>
    </div>

    <!-- 筛选工具栏 -->
    <div class="bg-base-100 p-4 rounded-lg shadow-sm mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1 flex flex-wrap gap-4">
          <select class="select select-bordered w-full max-w-[200px]" @change="null">
            <option value="">全部角色</option>
            <option v-for="item in 20" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
          <select class="select select-bordered w-full max-w-[200px]" @change="null">
            <option value="">全部状态</option>
            <option value="active">活跃</option>
            <option value="inactive">非活跃</option>
            <option value="blocked">已封禁</option>
          </select>
        </div>
        <div class="join">
          <input type="text" placeholder="搜索用户名/手机号" class="input input-bordered join-item w-full md:w-80"
            @keyup.enter="null" />
          <button class="btn join-item" @click="null" :disabled="false">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                  <input type="checkbox" class="checkbox" @change="null" />
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
            <template v-if="!false">
              <tr v-for="item in 20" :key="item" class="hover">
                <td>
                  <label>
                    <input type="checkbox" class="checkbox" :value="item" />
                  </label>
                </td>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle w-12 h-12">
                        <img :src="'/images/default-avatar.png'" :alt="item + ''" />
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">{{ item }}</div>
                      <div class="text-sm opacity-60">{{ item }}</div>
                      <div class="text-xs opacity-50">{{ item }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="badge badge-ghost">test</div>
                </td>
                <td>
                  <!-- <div :class="{
                    'badge': true,
                    'badge-success': user.status === 'active',
                    'badge-warning': user.status === 'inactive',
                    'badge-error': user.status === 'blocked'
                  }">test</div> -->
                </td>
                <td>
                  <div>test</div>
                  <div class="text-xs opacity-50">test</div>
                </td>
                <td>
                  <div class="flex gap-2">
                    <button class="btn btn-ghost btn-sm" @click="null">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <div class="dropdown dropdown-end">
                      <button tabindex="0" class="btn btn-ghost btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                      <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                          <a @click="null" class="text-error">封禁用户</a>
                        </li>
                        <li>
                          <a @click="null" class="text-success">解除封禁</a>
                        </li>
                        <li>
                          <a @click="null">重置密码</a>
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
          <span class="text-sm opacity-60">已选择 test 项</span>
          <div class="dropdown">
            <button class="btn btn-sm" :disabled="!false">
              批量操作
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a @click="null" class="text-error">批量封禁</a></li>
              <li><a @click="null" class="text-success">批量解封</a></li>
              <li><a @click="null">批量重置密码</a></li>
            </ul>
          </div>
        </div>
        <div class="join">
          <button class="join-item btn btn-sm" :disabled="false" @click="null">«</button>
          <button v-for="item in 20" :key="item" class="join-item btn btn-sm" :class="'btn-active'" @click="null">
            {{ item }}
          </button>
          <button class="join-item btn btn-sm" :disabled="false" @click="null">»</button>
        </div>
      </div>
    </div>

    <!-- 编辑用户对话框 -->
    <dialog ref="editDialog" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">编辑用户</h3>
        <form @submit.prevent="null">
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">用户名</span>
            </label>
            <input type="text" class="input input-bordered" readonly />
          </div>
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">昵称</span>
            </label>
            <input type="text" class="input input-bordered" />
          </div>
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">手机号</span>
            </label>
            <input type="tel" class="input input-bordered" />
          </div>
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">邮箱</span>
            </label>
            <input type="email" class="input input-bordered" />
          </div>
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">角色</span>
            </label>
            <select class="select select-bordered">
              <option v-for="item in 20" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">状态</span>
            </label>
            <select class="select select-bordered">
              <option v-for="item in 20" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
          <div class="modal-action">
            <button type="button" class="btn" @click="null">取消</button>
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
definePageMeta({
  layout: 'admin'
})

</script>
