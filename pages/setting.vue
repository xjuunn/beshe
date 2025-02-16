<!-- <template>
  <div class="w-full max-w-[1400px] mx-auto p-5">
    <div v-show="isloading" class="w-full text-center mt-20 mb-20">
      <div class="loading"></div>
    </div>
    <div v-show="!isloading" class="p-10 text-center cursor-pointer ">
      <div class="avatar w-30 h-30 rounded-full overflow-hidden outline-4 select-none outline-primary relative">
        <img class="w-full h-full absolute" :src="User.getUserCover(userData?.avatar ?? '')" alt="头像">
        <div class="floattxt flex items-center justify-center absolute w-full pt-10 bg-[rgba(0,0,0,0.7)]">
          设置头像
        </div>
      </div>
      <div class="border">
        test
      </div>

    </div>
  </div>
</template> -->
<template>
  <div class="w-full max-w-[1400px]  mx-auto p-5 text-center flex items-center justify-center">
    <div v-show="isloading" class="w-full text-center mt-20 mb-20">
      <div class="loading"></div>
    </div>
    <div v-show="!isloading"
      class="p-5 gap-3 md:p-10 text-center cursor-pointer w-full max-w-[900px] lg:flex lg:flex-row-reverse justify-center">
      <!-- 头像部分 -->
      <div @click="isShowupdateAvatar = true"
        class="avatar w-32 h-32 rounded-full ml-10 mt-10 overflow-hidden outline-4 select-none outline-primary relative mx-auto mb-8">
        <img class="w-full h-full absolute" :src="User.getUserCover(userData?.avatar ?? '')" alt="头像">
        <div
          class="floattxt pt-10 flex items-center justify-center absolute w-full h-full bg-[rgba(0,0,0,0.7)] transition-opacity duration-300">
          <span class="text-white">设置头像</span>
        </div>
      </div>

      <!-- 用户信息表单 -->
      <div class="bg-base-200 p-6 rounded-lg shadow-lg">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          <!-- 用户名 -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">用户名</span>
            </label>
            <input type="text" v-model="username" class="input input-bordered w-full">
          </div>


          <!-- 邮箱 -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">邮箱</span>
            </label>
            <input v-model="email" type="email" class="input input-bordered w-full">
          </div>

          <!-- 地址 -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">地址</span>
            </label>
            <input type="text" v-model="address" class="input input-bordered w-full">
          </div>

          <!-- 电话 -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">电话</span>
            </label>
            <input type="text" v-model="phone" class="input input-bordered w-full">
          </div>
          <!-- 用户ID -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">用户ID</span>
            </label>
            <input type="text" v-model="id" class="input input-bordered w-full" disabled>
          </div>

          <!-- 创建时间 -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">创建时间</span>
            </label>
            <input type="text" :value="userData?.createTime" class="input input-bordered w-full" disabled>
          </div>

          <!-- 角色ID -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">角色</span>
            </label>
            <input type="text" :value="userData?.roleId == 1 ? '管理员' : '普通用户'" class="input input-bordered w-full"
              disabled>
          </div>
        </div>

        <!-- 保存按钮 -->
        <div class="mt-8">
          <button class="btn btn-primary w-full md:w-auto" @click="btnUpdate">保存更改</button>
        </div>
      </div>
    </div>
    <ModalVue title="点击选择头像" :show="isShowupdateAvatar" @update:show="(e) => { isShowupdateAvatar = e }">
      <template #body>
        <div class="p-7 flex justify-center">
          <div @click="showSelector" class="w-40 cursor-pointer border h-40 rounded-full overflow-hidden">
            <img :src="updateAvatarUrl" alt="头像">
          </div>
          <input type="file" ref="avatarFileSelector" @change="onSelectorChange" hidden>
        </div>
      </template>
      <template #bottom>
        <div class="join">
          <button class="btn btn-sm btn-ghost" @click="isShowupdateAvatar = false;">取消</button>
          <button class="btn btn-sm btn-accent" @click="isShowupdateAvatar = false; btnUpdateAvatar()">上传</button>
        </div>
      </template>
    </ModalVue>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'frontend'
})
import * as User from '../api/user';
let userData: Ref<User.UserDTO | null> = ref(null);
let isloading = ref(true);
let id = ref('');
let username = ref('');
let email = ref('');
let address = ref('');
let phone = ref('');
let isShowupdateAvatar = ref(false);
let updateAvatarUrl = ref('')
let avatarFileSelector: Ref<HTMLFieldSetElement | undefined> = ref();
let avatarFile: File | undefined = undefined;
onMounted(() => {
  initData();
})
const { user, setUser, setAvatar } = useUserStore();
watch(() => user.value.id, () => initData())
async function initData() {
  isloading.value = true;
  let { data } = await User.getUserInfoByID(user.value.id);
  userData.value = data.data;
  id.value = userData.value?.id + '';
  username.value = userData.value?.username + '';
  email.value = userData.value?.email + '';
  address.value = userData.value?.address + '';
  phone.value = userData.value?.phone + '';
  updateAvatarUrl.value = User.getUserCover(userData.value?.avatar ?? '');
  isloading.value = false;
}

async function btnUpdate() {
  if (email.value.length > 30) {
    createToast('邮箱过长', { style: 'soft', type: 'error', icon: 'mdi:error' });
    return;
  }
  if (phone.value.length > 20) {
    createToast('手机号过长', { style: 'soft', type: 'error', icon: 'mdi:error' });
    return;
  }
  if (address.value.length > 200) {
    createToast('地址信息过长', { style: 'soft', type: 'error', icon: 'mdi:error' });
    return;
  }
  if (username.value.length > 20) {
    createToast('用户名过长', { style: 'soft', type: 'error', icon: 'mdi:error' });
    return;
  }
  if (username.value.length <= 0) {
    createToast('请输入用户名', { style: 'soft', type: 'error', icon: 'mdi:error' });
    return;
  }

  let { data } = await User.updateUser({
    id: user.value.id,
    email: email.value,
    phone: phone.value,
    address: address.value,
    username: username.value,
  })
  if (data.code == 200) {
    createToast(data.message, {
      style: 'soft',
      type: 'success',
      icon: 'mdi:success'
    })
    initData();
  } else {
    createToast(data.message, {
      style: 'soft',
      type: 'error',
      icon: 'mdi:error'
    })
  }
}
function showSelector() {
  avatarFileSelector.value?.click();
}

function onSelectorChange(e: Event) {
  let target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    let file = target.files[0];
    setAvatarFile(file);
  }
}

function setAvatarFile(file: File) {
  avatarFile = file;
  let url = URL.createObjectURL(file);
  updateAvatarUrl.value = url;

}

async function btnUpdateAvatar() {
  if (!avatarFile) return;
  let { data } = await User.updateAvatar(user.value.id, avatarFile)
  if (data.code == 200) {
    createToast(data.message, {
      style: 'soft',
      type: 'success',
      icon: 'mdi:success'
    })
    initData();
    updateAppAvatar();
  } else {
    createToast(data.message, {
      style: 'soft',
      type: 'error',
      icon: 'mdi:error'
    })
  }
}
async function updateAppAvatar() {
  let { data } = await User.getUserInfoByID(user.value.id);
  localStorage.setItem('avatar', User.getUserCover(data.data.avatar));
  localStorage.setItem('user', JSON.stringify(data.data));
  setUser(data.data);
  setAvatar(User.getUserCover(data.data.avatar))
}

</script>
<style scoped lang="css">
.avatar .floattxt {
  display: none;
}

.avatar:hover .floattxt {
  display: block;
}

.loading {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>