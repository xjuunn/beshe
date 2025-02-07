<template>
  <div class="overflow-x-auto scrollbar-hidden h-[calc(100vh-64px)] table-pin-cols flex pt-10 justify-center">
    <div class="w-96 p-10">
      <div class="w-full text-center">
        <div
          class="w-40 h-40 border m-auto rounded-box flex items-center justify-center border-dashed border-[#ffffff2a] cursor-pointer overflow-hidden"
          :class="isAvatarOver ? 'ring-8 ring-primary' : ''" @click="btnInputAvatar" ref="zropzone">
          <img :src="avatarurl" alt="头像">
          <input type="file" ref="avatarinput" @change="avatarChange" hidden>
        </div>
        <div class="dropdown mt-3">
          <div tabindex="0" role="button" class="btn m-1">用户角色：{{ userinfo.roleId == 1 ? '管理员' : '普通用户' }}</div>
          <ul tabindex="0" class="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm border">
            <li><a @click="userinfo.roleId = 1">管理员</a></li>
            <li><a @click="userinfo.roleId = 0">普通用户</a></li>
          </ul>
        </div>
      </div>
      <label class="floating-label mt-3">
        <span>用户名</span>
        <input v-model="userinfo.username" type="text" placeholder="Your name" class="input input-md" />
      </label>
      <label class="floating-label mt-3">
        <span>邮寄地址</span>
        <input v-model="userinfo.address" type="text" placeholder="Your name" class="input input-md" />
      </label>
      <label class="floating-label mt-3">
        <span>邮箱</span>
        <input v-model="userinfo.email" type="text" placeholder="Your name" class="input input-md" />
      </label>
      <label class="floating-label mt-3">
        <span>手机号</span>
        <input v-model="userinfo.phone" type="text" placeholder="Your name" class="input input-md" />
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as User from '../../../api/user';
definePageMeta({
  layout: 'admin'
})
let username = ref('');
let userinfo: Ref<User.UserDTO> = ref({});
let isloading = ref(true);
let avatarinput: Ref<HTMLElement | undefined> = ref();
let avatarFile: Ref<File | undefined> = ref();
let avatarurl = ref('');
let zropzone = ref();
let isAvatarOver: Ref<boolean> = ref(false);
onMounted(async () => {
  username.value = useRoute().params.name + '';
  // await getUserInfo();

  let { isOverDropZone } = useDropZone(zropzone, {
    dataTypes: ['image/jpeg', 'image/png', 'image/webp'],
    multiple: false,
    onDrop,
  })
  watch(isOverDropZone, value => {
    isAvatarOver.value = value;

  })

})

function btnInputAvatar() {
  avatarinput.value?.click();
}
function avatarChange(e: Event) {
  let target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    avatarFile.value = target.files[0];
  }
}
function onDrop(files: File[] | null) {
  if (files && files.length > 0) {
    avatarFile.value = files[0];

  }

}


watch(avatarFile, (value) => {
  if (value) avatarurl.value = URL.createObjectURL(value)
})

async function getUserInfo() {
  isloading.value = true;
  let { data } = await User.getUserInfo(username.value)
  userinfo.value = data.data;
  isloading.value = false;
}

</script>