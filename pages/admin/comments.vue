<template>
  <div class="overflow-x-auto scrollbar-hidden h-[calc(100vh-64px)] table-pin-cols">
    <!-- 搜索 -->
    <div class="p-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-4 gap-3 sticky left-0">
      <label class="floating-label">
        <span>用户名</span>
        <input type="text" placeholder="用户名" class="input" />
      </label>
      <label class="floating-label">
        <span>邮箱</span>
        <input type="text" placeholder="邮箱" class="input" />
      </label>
      <label class="floating-label">
        <span>手机号</span>
        <input type="text" placeholder="手机号" class="input" />
      </label>
      <div class="join">
        <button class="btn btn-ghost">重置</button>
        <button class="btn btn-primary">搜索</button>
      </div>
    </div>
    <!-- 列表 -->
    <table class="table table-pin-rows table-zebra z-1">
      <!-- 表头 -->
      <thead>
        <tr>
          <td>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </td>
          <td>头像</td>
          <th class="min-w-20">用户</th>
          <td>角色</td>
          <td>邮箱</td>
          <td>邮寄地址</td>
          <td>手机号</td>
          <td>注册时间</td>
          <td class="min-w-[120px]">操作</td>
        </tr>
      </thead>
      <tbody>
        <!-- 行 -->
        <tr v-for="item in 20" :key="item">
          <td>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </td>
          <td>
            <div class="avatar">
              <div class="mask mask-squircle h-12 w-12">
                <img class="skeleton" :src="`https://picsum.photos/100/100?seed=` + item"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </td>
          <th>
            <div class="font-bold">用户{{ item }}</div>
            <div class="text-sm opacity-50">ID: {{ item }}</div>
          </th>
          <td>普通用户</td>
          <td>test@163.com</td>
          <td class="line-clamp-1">中国村</td>
          <td>123123123123</td>
          <td>
            2025-01-01
          </td>
          <td>
            <div class="join">
              <button class="btn btn-sm btn-primary">修改</button>
              <button class="btn btn-sm btn-error" onclick="del_dialog.showModal()">删除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex items-center justify-center pt-9 pb-20">
      <div class="join">
        <button class="join-item btn">1</button>
        <button class="join-item btn">2</button>
        <button class="join-item btn btn-disabled">...</button>
        <button class="join-item btn">99</button>
        <button class="join-item btn">100</button>
      </div>
    </div>

    <dialog id="del_dialog" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="text-lg font-bold">删除用户</h3>
        <p class="py-4">是否要删除id为 1 的用户</p>
        <div class="modal-action">
          <button class="btn btn-ghost" onclick="del_dialog.close()">取消</button>
          <button class="btn btn-error" onclick="del_dialog.close()" @click="createToast('删除成功',{icon:'ep--success-filled'})">删除</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

</script>
