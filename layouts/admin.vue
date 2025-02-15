<template>
  <div class="overflow-hidden">

    <!-- 左侧菜单 -->
    <div class="drawer lg:drawer-open">
      <input id="left-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <!-- 顶部导航 -->
        <div class="navbar bg-base-200">
          <label for="left-drawer" class="lg:hidden btn btn-ghost drawer-button">
            <Icon name="material-symbols-menu-rounded" size="20"></Icon>
          </label>
          <NuxtLink to="/" class="btn btn-sm btn-ghost">
            <Icon name="mingcute-back-fill"></Icon>
            返回前台
          </NuxtLink>
          <Breadcrumbs :items="[{ name: '后台', path: '/admin' },{ name: '用户管理', path: '/admin/userlist' }]">
          </Breadcrumbs>
          <div class="flex justify-end w-full gap-2 items-center">
            <!-- 日志统计 -->
            <button class="btn btn-ghost btn-sm">
              <Icon name="icon-park-outline-log"></Icon>
              日志统计
            </button>
            <!-- 主题切换 -->
            <label class="swap swap-rotate btn btn-ghost btn-sm btn-circle ml-2 pt-1 ">
              <input type="checkbox" v-model="isDark" @change="setTheme(isDark)" />
              <div class="swap-on">
                <Icon name="solar-moon-bold-duotone" size="20"></Icon>
              </div>
              <div class="swap-off">
                <Icon name="solar-sun-bold-duotone" size="20"></Icon>
              </div>
            </label>
            <!-- 通知 -->
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button"
                class="btn btn-ghost btn-sm btn-circle indicator indicator-top indicator-end">
                <div class="indicator-item badge badge-xs badge-primary">1</div>
                <Icon name="mingcute-notification-fill" size="20">
                </Icon>
              </div>

              <ul tabindex="0" class="dropdown-content menu shadow bg-base-200 rounded-box w-80 gap-2">
                <li>
                  <a class="flex items-start">
                    <img alt="Profile" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      class="w-8 rounded-full" />
                    <div class="flex flex-col gap-2">
                      <span class="text-wrap">
                        <span class="font-bold">李华</span>
                        申请退货
                        <span class="text-primary line-clamp-1">无印良品 MUJI 自动泡沫洗手机 智能感应 洗手液自动感应器</span>
                      </span>

                      <span class="text-xs text-accent">两分钟前</span>
                    </div>
                  </a>
                </li>
                <a class="btn btn-primary">
                  查看所有通知
                </a>
              </ul>
            </div>
            <!-- 用户头像 -->
            <div class="ml-2 dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                  <img alt="头像" :src="avatar" />
                </div>
              </div>
              <ul tabindex="0" class="menu dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <a class="flex" title="View profile">
                    <img alt="头像" :src="avatar" class="w-8 rounded-full" />

                    <div class="flex flex-col">
                      <h3 class="font-bold">{{ user?.username }}</h3>
                      <span class="text-xs text-accent">{{ user?.email }}</span>
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
                  <NuxtLink to="/setting">
                    <Icon name="weui-setting-filled"></Icon>
                    设置
                  </NuxtLink>
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
        </div>
        <div class="h-[calc(100vh-64px)] overflow-auto scrollbar-thin">
          <slot></slot>
        </div>
      </div>
      <div class="drawer-side z-40">
        <label for="left-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <div class="bg-base-200 text-base-content min-h-full w-80 p-4">
          <aside class="sticky top-0 overflow-y-auto w-60 py-6 px-4 bg-base-200">
            <a class="btn btn-ghost relative">
              <span class="ml-2 text-lg font-bold">校夕夕后台</span>
            </a>

            <ul class="menu px-0">
              <li class="menu-title">可视化</li>
              <li>
                <NuxtLink to="/admin">
                  <Icon name="mingcute-dashboard-fill" size="18"></Icon>
                  仪表盘
                </NuxtLink>
              </li>
              <li class="menu-title">用户管理</li>
              <li>
                <NuxtLink to="/admin/userlist">
                  <Icon name="mdi-users" size="18"></Icon>
                  用户列表
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/admin/review">
                  <Icon name="mdi-comments" size="18"></Icon>
                  评价反馈
                </NuxtLink>
              </li>

              <li class="menu-title">商品管理</li>
              <li>
                <NuxtLink to="/admin/products">
                  <Icon name="lsicon-goods-filled" size="18"></Icon>
                  商品列表
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/admin/category">
                  <Icon name="mingcute-classify-2-fill" size="18"></Icon>
                  商品分类
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/admin/limit">
                  <Icon name="mingcute:time-fill" size="18"></Icon>
                  限购管理
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/admin/inventory">
                  <Icon name="ic-baseline-inventory" size="18"></Icon>
                  库存警告
                </NuxtLink>
              </li>
              <li class="menu-title">订单管理</li>
              <li>
                <NuxtLink to="/admin/order">
                  <Icon name="mingcute-truck-fill" size="18"></Icon>
                  订单列表
                </NuxtLink>
              </li>
              <li>
                <a>
                  <Icon name="tdesign-service-filled" size="18"></Icon>
                  退款和售后
                </a>
              </li>
              <li class="menu-title">系统设置</li>
              <li>
                <NuxtLink to="/admin/sysTheme">
                  <Icon name="icon-park-solid-theme" size="18"></Icon>
                  全局主题
                </NuxtLink>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { isDark, setTheme } = useThemeStore();
const { isLogin, logout, isAdmin, avatar, user } = useUserStore();
</script>