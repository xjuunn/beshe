<template>
  <div class="overflow-x-auto scrollbar-hidden h-[calc(100vh-64px)] table-pin-cols">
    <!-- 搜索 -->
    <div class="p-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-4 gap-3 sticky left-0">
      <label class="floating-label">
        <span>用户名</span>
        <input v-model="searchValue.username" type="text" placeholder="用户名" class="input" />
      </label>
      <label class="floating-label">
        <span>邮箱</span>
        <input v-model="searchValue.email" type="text" placeholder="邮箱" class="input" />
      </label>
      <label class="floating-label">
        <span>手机号</span>
        <input v-model="searchValue.phone" type="text" placeholder="手机号" class="input" />
      </label>
      <div class="join">
        <button @click="btnReset" class="btn btn-ghost">重置</button>
        <button @click="btnSearch" class="btn btn-primary">搜索</button>
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
        <tr v-show="!isloading" v-for="(item, index) in userlist" :key="item.id">
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
        <!-- <button v-for="(item, index) in maxPageNum" v-show="index <= 6" :disabled="index == 5" class="join-item btn"
          @click="searchValue.pageNum = item; initList();" :class="item == searchValue.pageNum ? 'btn-primary' : ''">{{
            index != 5 ? (index ==
              6 ? maxPageNum : item) : '...'
          }}</button> -->
        <button v-for="(item, index) in pageBtnList" class="join-item btn"
          @click="searchValue.pageNum = item; initList();" :class="item == searchValue.pageNum ? 'btn-primary' : ''">{{
            item }}</button>
        <button class="join-item btn" @click="searchValue.pageNum = maxPageNum; initList()">最后</button>
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
let searchValue: Ref<User.userSearch> = ref({ pageNum: 1, pageSize: 15 });
let dataTotal = ref(15);
onMounted(async () => {
  await initList();
})

let maxPageNum = computed(() => Math.ceil(dataTotal.value / (searchValue.value.pageSize ?? 15)))
let pageBtnList = computed(() => {
  let list = [];
  for (let index = -3; index < 5; index++) {
    list.push((searchValue.value.pageNum ?? 1) + index)
  }
  return list.filter(item => item > 0 && item <= maxPageNum.value);
})

function btnReset() {
  searchValue.value = { pageNum: 1, pageSize: 15 };
  initList();
}

function btnSearch() {
  initList();
}

async function initList() {
  isloading.value = true;
  // let { data } = await User.getUsers();
  let { data } = await User.getUsers2(searchValue.value);
  userlist.value = data.data.records;
  dataTotal.value = data.data.total

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
