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
        <tr v-for="(item, index) in userlist" :key="index">
          <td>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </td>
          <td>
            <div class="avatar">
              <div class="mask mask-squircle h-12 w-12">
                <img :class="isloading ? '' : 'skeleton'" :src="User.getUserCover(item.avatar + '')" alt="头像" />
              </div>
            </div>
          </td>
          <th>
            <div class="font-bold">{{ item.username }}</div>
            <div class="text-sm opacity-50">ID: {{ item.id }}</div>
          </th>
          <td>{{ item.roleId == 1 ? '管理员' : '普通用户' }}</td>
          <td>{{ item.email == '' ? '未设置' : item.email }}</td>
          <td class="line-clamp-1">{{ item.address == '' ? '未设置' : item.address }}</td>
          <td>{{ item.phone == '' ? '未绑定' : item.phone }}</td>
          <td>
            {{ item.createTime }}
          </td>
          <td>
            <div class="join">
              <button class="btn btn-sm btn-primary" @click="navigateTo('/admin/userinfo/' + item.username)">修改</button>
              <button class="btn btn-sm btn-error" onclick="del_dialog.showModal()"
                @click="btnDelete(item.id)">删除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-show="isloading" class="w-full flex justify-center mt-10">
      <div class="loading"></div>
    </div>
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
        <p class="py-4">是否要删除id为 {{ delid }} 的用户</p>
        <div class="modal-action">
          <button class="btn btn-ghost" onclick="del_dialog.close()">取消</button>
          <button class="btn btn-error" onclick="del_dialog.close()" @click="doDelete">删除</button>
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
import * as User from '../../api/user';
let userlist: Ref<User.UserDTO[]> = ref([]);
let delid = ref(-1);
let isloading = ref(true);
onMounted(async () => {
  await initList();
})
async function initList() {
  isloading.value = true;
  let { data } = await User.getUsers();
  userlist.value = data.data;
  isloading.value = false;
}

function btnDelete(id: number | string | undefined) {
  if (id == undefined) return;
  delid.value = Number(id);

}

async function doDelete() {
  let { data } = await User.deleteUser(delid.value)
  if (data.code == 200) {
    createToast('删除成功', { icon: 'ep--success-filled', type: 'success', style: 'dash' })
  } else {
    createToast(data.message, { icon: 'icon-park-solid:error', type: 'error', style: 'soft' })
  }
  initList();
}




</script>
