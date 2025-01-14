<template>
  <div v-show="type === 'login'" class="min-h-[calc(100vh-330px)] flex items-center justify-center">
    <fieldset
      class="fieldset w-full h-full sm:w-sm sm:bg-base-300 sm:border sm:border-base-300 p-20 sm:p-9 rounded-box">
      <legend class="fieldset-legend hidden sm:block">登录</legend>

      <label class="floating-label w-full">
        <span>用户名</span>
        <input v-model="username" type="text" placeholder="用户名" class="input input-md validator w-full" required />
      </label>

      <label class="floating-label mt-5 w-full">
        <span>密码</span>
        <input v-model="password" type="password" placeholder="密码" class="input input-md validator w-full" required />
      </label>
      <button class="btn btn-neutral mt-4" @click="login">登 录</button>
    </fieldset>
  </div>

  <div v-show="type === 'register'" class="min-h-[calc(100vh-330px)] flex items-center justify-center">
    <fieldset
      class="fieldset w-full h-full sm:w-sm sm:bg-base-300 sm:border sm:border-base-300 p-20 sm:p-9 rounded-box">
      <legend class="fieldset-legend hidden sm:block">注册</legend>

      <label class="floating-label w-full">
        <span>用户名</span>
        <input v-model="username2" type="text" placeholder="用户名" class="input input-md validator w-full" required />
      </label>

      <label class="floating-label mt-5 w-full">
        <span>密码</span>
        <input v-model="password2" type="password" placeholder="密码" class="input input-md validator w-full" required />
      </label>
      <label class="floating-label mt-5 w-full">
        <span>重复密码</span>
        <input v-model="password3" type="password" placeholder="重复密码" class="input input-md validator w-full"
          required />
      </label>
      <p class="validator-hint text-error">
        {{ registerhint }}
      </p>
      <button class="btn btn-neutral mt-4" @click="register">注 册</button>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'frontend'
})
const route = useRoute();
const type = computed(() => route.query.type === 'register' ? 'register' : 'login');
let username = ref('');
let password = ref('');
const { token:appToken ,setToken } = useAppStore();
async function login() {
  // if (logina({
  //   username: username.value, avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
  //   role: 'admin'
  // }))
  //   navigateTo('/')

  // @ts-ignore
  let {token} = await $fetch('/api/login', {
    method:"post",
    body: {
      username: username.value,
      password: password.value,
    }
  })
  console.log(token);
  setToken(token);
  localStorage.setItem('authToken',token)
}
let username2 = ref('');
let password2 = ref('');
let password3 = ref('');
let registerhint = ref('');
function register() {
  if (password2.value !== password3.value) {
    registerhint.value = "两次输入的密码不一致!"
    return;
  }

}


</script>
