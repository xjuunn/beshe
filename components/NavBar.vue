<template>
  <div class="navbar backdrop-blur-2xl border-b bg-[#00000010] border-[#ffffff10]">
    <div class="ps-4">
      <a class="text-lg font-bold" href="/">
        <Icon name="noto-shopping-bags"></Icon> {{ appName }}
      </a>
    </div>
    <div class="ps-4">
      <ul class="menu menu-horizontal">
        <li>
          <NuxtLink class="btn btn-ghost" to="/">首页</NuxtLink>
        </li>
        <li v-show="user.role === 'admin'"><a class="btn btn-ghost">后台管理</a></li>
        <li v-show="user.username !== ''"><a class="btn btn-ghost">
            <Icon name="lets-icons-order"></Icon>
            我的订单
          </a></li>
      </ul>
    </div>
    <div class="flex grow justify-end px-2">
      <div class="flex items-stretch gap-3">
        <label class="input hidden md:flex">
          <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" placeholder="搜索" />
        </label>

        <label class="swap swap-rotate">
          <input v-model="isDark" type="checkbox" @click="toggleTheme" />
          <svg class="swap-on h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg class="swap-off h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        <div class="dropdown dropdown-end" v-show="user.username !== ''">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span class="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div tabindex="0" class="card card-compact dropdown-content bg-base-200 z-1 mt-3 w-52 shadow">
            <div class="card-body">
              <span class="text-lg font-bold">8 Items</span>
              <span class="text-info">Subtotal: $999</span>
              <div class="card-actions">
                <button class="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>

        <div class="dropdown dropdown-end" v-show="user.username !== ''">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <img alt="Profile" :src="user.avatar" class="w-8 rounded-full" />
          </div>
          <ul tabindex="0" class="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
            <li>
              <a class="flex" title="View profile">
                <img alt="Profile" :src="user.avatar" class="w-8 rounded-full" />
                <div class="flex flex-col">
                  <h3 class="font-bold">{{ user.username }}</h3>
                  <span class="text-xs text-accent">{{ user.email }}</span>
                </div>
              </a>
            </li>
            <div class="divider my-0"></div>
            <li><a>Settings</a></li>
            <li><a>Keyboard shortcut</a></li>
            <div class="divider my-0"></div>
            <li><a>Company profile</a></li>
            <li><a>Team</a></li>
            <li><a>Invite Colleagues</a></li>
            <div class="divider my-0"></div>
            <li><a>Help</a></li>
            <li><a>Sign out</a></li>
          </ul>
        </div>

        <NuxtLink to="/login?type=login" class="btn btn-ghost" v-show="user.username === ''">
          登录
        </NuxtLink>
        <NuxtLink to="/login?type=register" class="btn btn-ghost" v-show="user.username === ''">
          注册
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
let isDark = ref(true);
const { appName, user } = useAppStore();
function toggleTheme() {
  document.getElementsByTagName('body')[0]
    .setAttribute('data-theme', isDark.value ? 'light' : 'dark')
}


</script>

<style></style>