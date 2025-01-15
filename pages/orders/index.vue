<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- 面包屑导航 -->
    <div class="text-sm breadcrumbs mb-6">
      <ul>
        <li><NuxtLink to="/" class="text-primary">首页</NuxtLink></li>
        <li>我的订单</li>
      </ul>
    </div>

    <!-- 订单状态标签 -->
    <div class="tabs tabs-boxed bg-base-100 p-4 rounded-xl mb-6">
      <a class="tab flex-1" :class="{ 'tab-active': activeTab === 'all' }" 
         @click="activeTab = 'all'">
        <div class="flex flex-col items-center gap-1">
          <span class="text-lg font-medium">全部订单</span>
          <span class="text-xs opacity-70">{{ orders.length }}</span>
        </div>
      </a>
      <a class="tab flex-1" :class="{ 'tab-active': activeTab === 'unpaid' }"
         @click="activeTab = 'unpaid'">
        <div class="flex flex-col items-center gap-1">
          <span class="text-lg font-medium">待付款</span>
          <span class="text-xs opacity-70">2</span>
        </div>
      </a>
      <a class="tab flex-1" :class="{ 'tab-active': activeTab === 'unshipped' }"
         @click="activeTab = 'unshipped'">
        <div class="flex flex-col items-center gap-1">
          <span class="text-lg font-medium">待发货</span>
          <span class="text-xs opacity-70">1</span>
        </div>
      </a>
      <a class="tab flex-1" :class="{ 'tab-active': activeTab === 'shipped' }"
         @click="activeTab = 'shipped'">
        <div class="flex flex-col items-center gap-1">
          <span class="text-lg font-medium">待收货</span>
          <span class="text-xs opacity-70">1</span>
        </div>
      </a>
      <a class="tab flex-1" :class="{ 'tab-active': activeTab === 'completed' }"
         @click="activeTab = 'completed'">
        <div class="flex flex-col items-center gap-1">
          <span class="text-lg font-medium">已完成</span>
          <span class="text-xs opacity-70">8</span>
        </div>
      </a>
    </div>

    <!-- 订单列表 -->
    <div class="space-y-6">
      <div v-for="order in filteredOrders" :key="order.id" 
           class="card bg-base-100 shadow-sm hover:shadow-md transition-all">
        <!-- 订单头部 -->
        <div class="card-body p-6">
          <div class="flex items-center justify-between pb-4 border-b border-[#ffffff20]">
            <div class="flex items-center gap-6">
              <div class="flex items-center gap-2">
                <div class="avatar placeholder">
                  <div class="w-8 h-8 rounded-full bg-neutral-focus text-neutral-content">
                    <span class="text-xs">店</span>
                  </div>
                </div>
                <span class="font-medium">{{ order.shop }}</span>
              </div>
              <div class="text-sm opacity-70">订单号：{{ order.orderNo }}</div>
              <div class="text-sm opacity-70">{{ order.createTime }}</div>
            </div>
            <div class="badge badge-lg" :class="getStatusBadgeClass(order.status)">
              {{ order.status }}
            </div>
          </div>

          <!-- 订单商品 -->
          <div class="py-4">
            <div v-for="item in order.items" :key="item.id" 
                 class="flex items-center gap-4 p-4 hover:bg-base-200 rounded-xl transition-colors">
              <div class="avatar">
                <div class="w-20 h-20 rounded-xl">
                  <img :src="item.image" :alt="item.name" class="object-cover" />
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-medium truncate">{{ item.name }}</h3>
                <p class="text-sm opacity-70 mt-1">{{ item.spec }}</p>
                <div class="text-xs opacity-50 mt-1">
                  商品编号：{{ item.sku }}
                </div>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold text-primary">¥{{ item.price }}</div>
                <div class="text-sm opacity-70">x{{ item.quantity }}</div>
              </div>
            </div>
          </div>

          <!-- 订单底部 -->
          <div class="flex justify-between items-center pt-4 border-t border-[#ffffff20]">
            <div class="text-sm">
              共 {{ order.totalItems }} 件商品
              <span class="divider divider-horizontal mx-2"></span>
              合计：
              <span class="text-lg font-bold text-primary">¥{{ order.totalAmount }}</span>
              <span class="text-xs opacity-70 ml-1">(含运费 ¥{{ order.freight }})</span>
            </div>
            <div class="flex gap-2">
              <button v-if="order.canCancel" 
                      class="btn btn-outline btn-sm">取消订单</button>
              <button v-if="order.canPay" 
                      class="btn btn-primary btn-sm">
                <div class="flex items-center gap-2">
                  <span class="countdown font-mono">
                    <span style="--value:15;">15</span>:<span style="--value:00;">00</span>
                  </span>
                  <span>立即付款</span>
                </div>
              </button>
              <button v-if="order.canConfirm" 
                      class="btn btn-accent btn-sm">确认收货</button>
              <button v-if="order.canDelete" 
                      class="btn btn-ghost btn-sm">删除订单</button>
              <button class="btn btn-outline btn-sm">查看详情</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="filteredOrders.length === 0" 
         class="card bg-base-100 p-16">
      <div class="flex flex-col items-center gap-4">
        <div class="text-6xl opacity-20">📦</div>
        <p class="opacity-50">暂无相关订单</p>
        <NuxtLink to="/products" class="btn btn-primary mt-4">
          去购物
        </NuxtLink>
      </div>
    </div>

    <!-- 分页 -->
    <div class="flex justify-center mt-8">
      <div class="join">
        <button class="join-item btn">«</button>
        <button class="join-item btn btn-active">1</button>
        <button class="join-item btn">2</button>
        <button class="join-item btn">3</button>
        <button class="join-item btn">»</button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'frontend'
})

const activeTab = ref('all')

// 获取状态对应的样式
const getStatusBadgeClass = (status) => {
  const classes = {
    '待付款': 'badge-warning',
    '待发货': 'badge-info',
    '待收货': 'badge-primary',
    '已完成': 'badge-success',
    '已取消': 'badge-ghost'
  }
  return classes[status] || 'badge-ghost'
}

// 根据当前标签筛选订单
const filteredOrders = computed(() => {
  if (activeTab.value === 'all') return orders.value
  const statusMap = {
    'unpaid': '待付款',
    'unshipped': '待发货',
    'shipped': '待收货',
    'completed': '已完成'
  }
  return orders.value.filter(order => order.status === statusMap[activeTab.value])
})

const orders = ref([
  {
    id: 1,
    orderNo: 'ORD202401001',
    createTime: '2024-01-15 10:30',
    status: '待付款',
    totalItems: 2,
    totalAmount: 3798,
    freight: 12,
    canCancel: true,
    canPay: true,
    shop: '官方自营店',
    items: [
      {
        id: 1,
        name: '2024新款智能手机',
        spec: '8+256GB 星空黑',
        price: 2999,
        quantity: 1,
        sku: 'SP202401001',
        image: 'https://picsum.photos/seed/phone1/300/200'
      },
      {
        id: 2,
        name: '无线蓝牙耳机',
        spec: '白色',
        price: 799,
        quantity: 1,
        sku: 'SP202401002',
        image: 'https://picsum.photos/seed/headphone/300/200'
      }
    ]
  },
  {
    id: 2,
    orderNo: 'ORD202401002',
    createTime: '2024-01-14 15:20',
    status: '待收货',
    totalItems: 1,
    totalAmount: 599,
    freight: 10,
    canConfirm: true,
    shop: '数码专营店',
    items: [
      {
        id: 3,
        name: '智能手表',
        spec: '典雅黑',
        price: 599,
        quantity: 1,
        sku: 'SP202401003',
        image: 'https://picsum.photos/seed/watch/300/200'
      }
    ]
  }
])
</script>

<style scoped>
.tab {
  @apply transition-colors duration-200;
}

.card {
  @apply transition-all duration-200;
}

.btn {
  @apply transition-all duration-200;
}

.btn:hover {
  transform: translateY(-1px);
}
</style> 