<template>
  <div class="flex flex-col">
    <div class="navbar sticky top-0 z-50 gap-1" :class="isNavBlur ? 'backdrop-blur-2xl' : 'bg-base-200'">
      <div class="flex-1">
        <NuxtLink to="/" class="btn btn-ghost text-xl">
          <!-- <Icon name="noto-shopping-bags"></Icon> -->
          <!-- <img src="/favicon.png" class=" h-full" /> -->
          <div class="bg-[url('../public/favicon.png')] w-15 bg-cover bg-center h-full"></div>
          <span class="hidden sm:inline">校夕夕</span>
        </NuxtLink>
      </div>

      <NuxtLink class="hidden sm:flex" to="/"><button class="btn btn-ghost btn-sm">首页</button></NuxtLink>
      <NuxtLink class="hidden sm:flex" to="/products"><button class="btn btn-ghost btn-sm">全部商品</button></NuxtLink>
      <NuxtLink v-show="isLogin" to="/order">
        <button class="btn btn-ghost btn-sm">
          <Icon name="lets-icons-order" size="15"></Icon>我的订单
        </button>
      </NuxtLink>
      <NuxtLink v-show="isAdmin" class="hidden lg:flex" to="/admin">
        <button class="btn btn-ghost btn-sm">
          <Icon name="ri-admin-fill" size="15"></Icon>
          管理后台
        </button>
      </NuxtLink>
      <div class="input input-bordered input-md input-ghost bg-base-300 hidden lg:flex">
        <Icon name="ic-round-search" size="20"></Icon>
        <input type="text" placeholder="搜索" class="" />
      </div>
      <NuxtLink class="hidden sm:flex" to="/products">
        <button class="btn btn-ghost btn-sm lg:hidden">
          <Icon name="ic-round-search" size="15"></Icon>
          搜索
        </button>
      </NuxtLink>
      <label class="swap swap-rotate btn btn-ghost btn-sm btn-circle ml-2 pt-1 ">
        <input type="checkbox" v-model="isDark" @change="setTheme(isDark)" />
        <div class="swap-on">
          <Icon name="solar-moon-bold-duotone" size="20"></Icon>
        </div>
        <div class="swap-off">
          <Icon name="solar-sun-bold-duotone" size="20"></Icon>
        </div>
      </label>
      <div v-show="isLogin" class="flex gap-3 ml-3">
        <div class="dropdown dropdown-end">
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
          <div tabindex="0" class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
            <div class="card-body">
              <span class="text-lg font-bold">8 件商品</span>
              <span class="text-info">价钱: 999</span>
              <div class="card-actions">
                <NuxtLink to="/cart"><button class="btn btn-sm btn-primary btn-block">查看</button></NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="头像" :src="avatar" />
            </div>
          </div>
          <ul tabindex="0" class="menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a class="flex" title="View profile">
                <img alt="头像" :src="avatar" class="w-8 rounded-full" />

                <div class="flex flex-col">
                  <h3 class="font-bold">{{ user.username }}</h3>
                  <span class="text-xs text-accent">{{ user.email }}</span>
                </div>
              </a>
            </li>
            <div class="divider my-0"></div>
            <li>
              <NuxtLink to="/">
                <Icon name="lsicon-home-filled" size="15"></Icon>
                首页
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/products">
                <Icon name="lsicon-goods-filled" size="15"></Icon>
                全部商品
              </NuxtLink>
            </li>
            <div class="divider my-0"></div>
            <li v-show="isAdmin">
              <NuxtLink to="/admin">
                <Icon name="ri-admin-fill" size="15"></Icon>
                管理后台
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cart">
                <Icon name="icon-park-solid-shopping"></Icon>
                购物车
              </NuxtLink>
            </li>
            <div class="divider my-0"></div>
            <li>
              <NuxtLink to="/order">
                <Icon name="lets-icons-order-fill" size="15"></Icon>
                我的订单
              </NuxtLink>
            </li>
            <li>
              <a>
                <Icon name="weui-setting-filled"></Icon>
                设置
              </a>
            </li>
            <div class="divider my-0"></div>
            <li>
              <a @click="logout(); navigateTo('/login')">
                <Icon name="material-symbols-logout"></Icon>
                登出
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div v-show="!isLogin" class="join ml-3">
        <NuxtLink to="/login"><button class="btn btn-ghost btn-sm">
            <Icon name="material-symbols-login" size="15"></Icon>
            登录
          </button></NuxtLink>
        <NuxtLink to="/register"><button class="btn btn-ghost btn-sm">注册</button></NuxtLink>
      </div>
    </div>
    <div class="min-h-[calc(100vh-204px)]">
      <slot></slot>
    </div>

    <footer class="flex flex-col sm:flex-row gap-8 justify-between p-9 bg-base-200">
      <aside>
        <div class="text-3xl flex items-center gap-2">
          <!-- <Icon name="noto-shopping-bags"></Icon> -->
          <div class="w-28 h-16 bg-[url('/public/favicon.png')] bg-cover bg-center"></div>
          校夕夕
        </div>
        <!-- <small class="text-xs">Copyright © 2025 - 校夕夕</small> -->
      </aside>

      <nav class="flex gap-4">
        <a class="btn btn-ghost btn-sm btn-circle">
          <Icon name="mingcute-qq-fill" size="20"></Icon>
        </a>
        <a class="btn btn-ghost btn-sm btn-circle">
          <Icon name="mingcute-wechat-fill" size="20"></Icon>
        </a>
        <a class="btn btn-ghost btn-sm btn-circle">
          <Icon name="mingcute-tiktok-fill" size="20"></Icon>
        </a>
        <a class="btn btn-ghost btn-sm btn-circle">
          <Icon name="material-symbols-share" size="20"></Icon>
        </a>
      </nav>
    </footer>
  </div>
</template>
<script setup lang="ts">
const { isDark, setTheme, isNavBlur } = useThemeStore();
const { isLogin, logout, isAdmin, avatar,user } = useUserStore();
</script>