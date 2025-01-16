<template>
  <div>
    <!-- 顶部导航栏 -->
    <div class="navbar bg-base-100 shadow-lg fixed top-0 z-50">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><NuxtLink to="/" :class="{ 'active': route.path === '/' }">首页</NuxtLink></li>
            <li><NuxtLink to="/products" :class="{ 'active': route.path === '/products' }">全部商品</NuxtLink></li>
            <template v-if="isLoggedIn">
              <li><NuxtLink to="/orders" :class="{ 'active': route.path === '/orders' }">我的订单</NuxtLink></li>
              <li><NuxtLink to="/favorites" :class="{ 'active': route.path === '/favorites' }">收藏夹</NuxtLink></li>
            </template>
          </ul>
        </div>
        <a class="btn btn-ghost normal-case text-xl gap-2">购物商城</a>
      </div>
      
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><NuxtLink to="/" :class="{ 'active': route.path === '/' }">首页</NuxtLink></li>
          <li><NuxtLink to="/products" :class="{ 'active': route.path === '/products' }">全部商品</NuxtLink></li>
          <template v-if="isLoggedIn">
            <li><NuxtLink to="/orders" :class="{ 'active': route.path === '/orders' }">我的订单</NuxtLink></li>
            <li><NuxtLink to="/favorites" :class="{ 'active': route.path === '/favorites' }">收藏夹</NuxtLink></li>
          </template>
        </ul>
      </div>

      <div class="navbar-end">
        <!-- 后台管理入口 - 仅管理员可见 -->
        <template>
          <NuxtLink to="/admin" class="btn btn-ghost btn-sm mr-2">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            后台管理
          </NuxtLink>
        </template>
        
        <!-- 购物车 - 仅登录用户可见 -->
        <template>
          <div class="dropdown dropdown-end mr-4">
            <label tabindex="0" class="btn btn-ghost btn-circle">
              <span>🛒</span>
              <span class="badge badge-sm indicator-item">8</span>
            </label>
            <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div class="card-body">
                <span class="font-bold text-lg">8 件商品</span>
                <span class="text-info">总计: ¥2,899</span>
                <div class="card-actions">
                  <button class="btn btn-primary btn-block">查看购物车</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 用户头像和下拉菜单 - 仅登录用户可见 -->
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="用户头像" />
              </div>
            </label>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><NuxtLink to="/profile">个人资料</NuxtLink></li>
              <li><a @click="userStore.logout()">退出登录</a></li>
            </ul>
          </div>
        </template>

        <!-- 未登录时显示登录注册按钮 -->
        <template>
          <NuxtLink to="/auth/login" class="btn btn-ghost btn-sm">登录</NuxtLink>
          <NuxtLink to="/auth/register" class="btn btn-ghost btn-sm">注册</NuxtLink>
        </template>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <main class="pt-16">
      <slot />
    </main>
  </div>
</template>

<script setup>
const {route} = useRoute()

// 计算属性：是否已登录
const isLoggedIn = computed(() => true)
</script>

<style scoped>
/* 如果需要添加任何样式 */
</style>
