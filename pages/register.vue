<template>
  <div class="min-h-[calc(100vh-204px)] relative">
    <div
      class="w-full h-full absolute top-0 left-0 z-1 transition duration-1000 bg-[url(/assets/imgs/loginbg.jpg)] bg-cover bg-center "
      :class="isDark ? 'opacity-100' : 'opacity-0'"></div>
    <div
      class="w-full h-full absolute top-0 left-0 z-1 transition duration-1000 bg-[url(/assets/imgs/loginbg-light.jpg)] bg-cover bg-center"
      :class="isDark ? 'opacity-0' : 'opacity-100'">
    </div>
    <div class="w-full h-full absolute top-0 left-0 z-2 bg-gradient-to-b from-base-200 via-transparent to-base-200">
    </div>
    <div class="w-full h-full absolute top-0 left-0 z-40 flex items-center justify-center">


      <div class="card w-full max-w-lg h-fit backdrop-blur-2xl border border-base-content/10">
        <div class="card-title self-center text-2xl mt-5">注 册</div>
        <div class="card-body items-center gap-5 mt-5 border-t pb-5 border-base-content/10">
          <label class="floating-label w-full max-w-xs">
            <span>头像</span>
            <input @change="selectFile" type="file"
              class="file-input file-input-ghost active:bg-transparent focus:ring-0 focus:outline-0" />
          </label>
          <label class="floating-label w-full max-w-xs">
            <span>用户名</span>
            <input v-model="username" type="text" placeholder="" class="input input-bordered focus:outline-0" />
          </label>
          <label class="floating-label w-full max-w-xs">
            <span>密码</span>
            <input v-model="password" type="password" placeholder="密码" class="input input-bordered focus:outline-0" />
          </label>
          <label class="floating-label w-full max-w-xs">
            <span>确认密码</span>
            <input v-model="password2" type="password" placeholder="密码" class="input input-bordered focus:outline-0" />
          </label>
          <div class="validator-hint text-error">{{ log }}</div>
        </div>
        <div class="border-t border-base-content/10 flex pt-7 pb-0 justify-center">
          <div class="loading" v-show="isloading"></div>
          <button @click="register" v-show="!isloading"
            class="btn btn-outline  border-base-content/30 hover:border-base-content min-w-[100px]">注册</button>
        </div>
        <div class="card-actions mb-3 mt-4 text-xs self-end pe-8">
          <span class="text-base-content/60">有账号了？</span>
          <NuxtLink to="/login" class="text-primary">直接登录</NuxtLink>
        </div>
      </div>


    </div>
  </div>
</template>

<script lang="ts" setup>
const { isDark, setNavBlur } = useThemeStore();
setNavBlur(false);
definePageMeta({
  layout: "frontend"
})
import { register as register1 } from '../api/auth';
let log: Ref<string> = ref('');
let isloading: Ref<boolean> = ref(false);
let tx: File | null = null;
let username: Ref<string> = ref('');
let password: Ref<string> = ref('');
let password2: Ref<string> = ref('');


function selectFile(e: Event) {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    tx = input.files[0];
  }
}

async function register() {
  if (tx === null) {
    log.value = '请选择头像';
    return;
  }

  if (username.value === '') {
    log.value = "请输入用户名";
    return;
  }

  if (username.value.length >= 20) {
    log.value = "用户名过长";
    return;
  }

  if (username.value.length >= 20) {
    log.value = "用户名过长";
    return;
  }

  if (password.value === '') {
    log.value = "请输入密码"
    return;
  }

  if (password.value !== password2.value) {
    log.value = "两次输入的密码不一致"
    return;
  }
  isloading.value = true;
  let { data } = await register1(username.value, password.value, tx);
  console.log(111,data);
  isloading.value = false;
  log.value = data.message;
  if (data.code === 200) {
    navigateTo('/login')
  }
}
</script>