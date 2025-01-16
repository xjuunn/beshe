<template>
  <div class="min-h-screen bg-base-200">
    <!-- 顶部导航栏 -->
    <div class="navbar bg-base-100 shadow-lg fixed top-0 z-50 border-b border-base-300">
      <div class="flex-none">
        <!-- 移动端侧边栏开关按钮 -->
        <label for="admin-drawer" class="btn btn-square btn-ghost drawer-button lg:hidden">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
      </div>
      <div class="flex-1 flex items-center gap-4">
        <div class="flex items-center gap-2">
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span class="text-xl font-bold">后台管理系统</span>
        </div>
        <!-- 搜索框 -->
        <div class="hidden md:flex items-center gap-2 w-96">
          <div class="join w-full">
            <input type="text" placeholder="搜索..." class="input input-bordered join-item w-full" />
            <button class="btn join-item">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <!-- 快捷操作按钮 -->
        <button class="btn btn-ghost btn-circle">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
        <!-- 通知下拉菜单 -->
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="badge badge-primary badge-sm indicator-item">3</span>
            </div>
          </label>
          <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-80 bg-base-100 shadow">
            <div class="card-body">
              <div class="flex justify-between items-center mb-2">
                <span class="card-title text-lg">通知中心</span>
                <button class="btn btn-ghost btn-xs">全部标记已读</button>
              </div>
              <div class="space-y-3">
                <div class="flex items-start gap-3 p-2 hover:bg-base-200 rounded-lg">
                  <span class="text-info">📦</span>
                  <div>
                    <p class="font-bold">新订单通知</p>
                    <p class="text-sm opacity-70">您有一个新的订单待处理</p>
                    <p class="text-xs opacity-50">2分钟前</p>
                  </div>
                </div>
                <div class="flex items-start gap-3 p-2 hover:bg-base-200 rounded-lg">
                  <span class="text-warning">⚠️</span>
                  <div>
                    <p class="font-bold">系统提醒</p>
                    <p class="text-sm opacity-70">系统将在今晚进行维护</p>
                    <p class="text-xs opacity-50">1小时前</p>
                  </div>
                </div>
              </div>
              <div class="card-actions mt-3">
                <button class="btn btn-ghost btn-block btn-sm">查看全部通知</button>
              </div>
            </div>
          </div>
        </div>
        <!-- 用户下拉菜单 -->
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="avatar online placeholder">
              User
            </div>
          </label>
          <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <div class="px-4 py-3 border-b border-base-300">
              <p class="font-bold">管理员</p>
              <p class="text-sm opacity-70">admin@example.com</p>
            </div>
            <li><a>个人信息</a></li>
            <li><a>系统设置</a></li>
            <li><a>主题设置</a></li>
            <li><a class="text-error">退出登录</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 抽屉式侧边栏 -->
    <div class="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" class="drawer-toggle" />
      
      <!-- 页面内容 -->
      <div class="drawer-content flex flex-col">
        <!-- 主要内容区域，添加顶部导航栏高度的 padding -->
        <main class="flex-1 p-6 pt-24 ">
          <!-- 面包屑导航 -->
          <div class="text-sm breadcrumbs mb-4">
            <ul>
              <li><a>主页</a></li>
              <li><a>商品管理</a></li>
              <li>商品列表</li>
            </ul>
          </div>
          <slot />
        </main>
      </div>

      <!-- 侧边栏内容 -->
      <div class="drawer-side z-40">
        <label for="admin-drawer" class="drawer-overlay"></label>
        <aside class="menu bg-base-100 w-80 min-h-full pt-20 shadow-lg border-r border-base-300">
          <!-- 系统 Logo -->
          <div class="px-6 py-4 border-b border-base-300">
            <div class="flex items-center gap-2">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span class="text-xl font-bold">Admin</span>
            </div>
          </div>
          <!-- 侧边栏菜单 -->
          <div class="px-4 py-4">
            <ul class="menu menu-lg bg-base-200 rounded-box">
              <li>
                <NuxtLink to="/admin/dashboard">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  仪表盘
                </NuxtLink>
              </li>
              
              <!-- 商品管理 -->
              <li>
                <h2 class="menu-title">商品管理</h2>
                <ul>
                  <li>
                    <NuxtLink to="/admin/products">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                      商品列表
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/admin/products/category">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                      分类管理
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/admin/products/inventory">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      库存管理
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <!-- 订单管理 -->
              <li>
                <h2 class="menu-title">订单管理</h2>
                <ul>
                  <li>
                    <NuxtLink to="/admin/orders">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      订单列表
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/admin/orders/refund">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" /></svg>
                      退款管理
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <!-- 用户管理 -->
              <li>
                <h2 class="menu-title">用户管理</h2>
                <ul>
                  <li>
                    <NuxtLink to="/admin/users">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      用户列表
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/admin/users/roles">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                      角色权限
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <!-- 营销管理 -->
              <li>
                <h2 class="menu-title">营销管理</h2>
                <ul>
                  <li>
                    <NuxtLink to="/admin/marketing/coupon">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                      优惠券
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/admin/marketing/promotion">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
                      促销活动
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <!-- 内容管理 -->
              <li>
                <h2 class="menu-title">内容管理</h2>
                <ul>
                  <li>
                    <NuxtLink to="/admin/content/banner">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      轮播图
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/admin/content/article">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                      文章管理
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <!-- 数据统计 -->
              <li>
                <h2 class="menu-title">数据统计</h2>
                <ul>
                  <li>
                    <NuxtLink to="/admin/analytics">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      数据分析
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/admin/analytics/sales">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                      销售报表
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <!-- 系统设置 -->
              <li>
                <h2 class="menu-title">系统设置</h2>
                <ul>
                  <li>
                    <NuxtLink to="/admin/settings">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      基础设置
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/admin/settings/payment">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                      支付设置
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/admin/settings/shipping">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                      物流设置
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/admin/backup">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                      数据备份
                    </NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <!-- 底部信息 -->
          <div class="absolute bottom-0 w-full p-4 border-t border-base-300">
            <div class="flex items-center justify-between text-sm opacity-70">
              <span>系统版本</span>
              <span>v1.0.0</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
// 获取当前路由
const route = useRoute()

// 控制菜单展开状态
const activeMenus = ref(new Set(['商品管理'])) // 默认展开商品管理菜单

// 切换菜单展开状态
const toggleMenu = (menuTitle) => {
  if (activeMenus.value.has(menuTitle)) {
    activeMenus.value.delete(menuTitle)
  } else {
    activeMenus.value.add(menuTitle)
  }
}

// 根据当前路径自动展开对应菜单
watchEffect(() => {
  const path = route.path
  activeMenus.value.clear() // 清除之前的状态
  
  if (path.startsWith('/admin/products') || path.startsWith('/admin/categories')) {
    activeMenus.value.add('商品管理')
  }
  if (path.startsWith('/admin/orders')) {
    activeMenus.value.add('订单管理')
  }
  if (path.startsWith('/admin/settings')) {
    activeMenus.value.add('系统设置')
  }
})
</script>

<style scoped>

/* 优化菜单样式 */
.menu :where(li:not(.menu-title) > *:not(ul):not(details):not(.menu-title)) {
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.5rem;
}

/* 菜单样式 */
.menu-dropdown {
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  opacity: 0;
}

.menu-dropdown.menu-dropdown-show {
  max-height: 500px;
  opacity: 1;
}

/* 菜单项样式 */
.menu-dropdown-toggle {
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
  position: relative;
}

.menu-dropdown-toggle:hover {
  background-color: hsl(var(--bc) / 0.1);
}

.menu-dropdown-toggle.menu-dropdown-show {
  background-color: hsl(var(--bc) / 0.1);
}

/* 激活状态样式 */
.menu a.active {
  background-color: hsl(var(--p) / 0.1);
  color: hsl(var(--p));
}
</style>
