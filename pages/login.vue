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
        <div class="card-title self-center text-2xl mt-5">登 录</div>
        <div class="card-body items-center gap-5 mt-5 pb-5 border-t border-base-content/10">
          <label class="floating-label w-full max-w-xs">
            <span>用户名</span>
            <input v-model="username" type="text" placeholder="" class="input input-bordered focus:outline-0" />
          </label>
          <label class="floating-label w-full max-w-xs">
            <span>密码</span>
            <input v-model="password" type="password" placeholder="密码" class="input input-bordered focus:outline-0" />
          </label>
          <div class="validator-hint text-error">{{ log }}</div>
        </div>
        <div class="border-t border-base-content/10 flex p-7 pb-0 justify-center">
          <div class="loading" v-show="isloading"></div>
          <button v-show="!isloading"
            class="btn btn-outline border-base-content/30 hover:border-base-content min-w-[100px]"
            @click="btnLogin">登录</button>
        </div>
        <div class="card-actions mb-3 mt-4 text-xs self-end pe-8">
          <span class="text-base-content/60">还没有账号？</span>
          <NuxtLink to="/register" class="text-primary">去注册</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { isDark, setNavBlur } = useThemeStore();
const { login } = useUserStore();
setNavBlur(false);
definePageMeta({
  layout: "frontend"
})
let isloading = ref(false);
let username = ref('admin');
let password = ref('123123');
let log = ref('');
async function btnLogin() {
  isloading.value = true;
  let data = await login(username.value, password.value);
  isloading.value = false;
  log.value = data.message
  if (data.code == 200) {
    navigateTo('/');
  }

}
</script>