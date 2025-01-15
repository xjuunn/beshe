<template>
  <div>
    <!-- 页面标题 -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">订单详情</h1>
        <p class="opacity-60 mt-1">查看订单详细信息</p>
      </div>
      <NuxtLink to="/admin/orders" class="btn btn-ghost btn-sm">
        返回列表
      </NuxtLink>
    </div>

    <div v-if="!loading">
      <!-- 订单状态时间线 -->
      <div class="card bg-base-100 shadow-sm mb-6">
        <div class="card-body">
          <h2 class="card-title mb-4">订单状态</h2>
          <ul class="steps steps-vertical lg:steps-horizontal">
            <li class="step" :class="{ 'step-primary': isStepCompleted('PENDING') }">
              待付款
              <span class="text-xs opacity-60">{{ getStepTime('PENDING') }}</span>
            </li>
            <li class="step" :class="{ 'step-primary': isStepCompleted('PAID') }">
              已付款
              <span class="text-xs opacity-60">{{ getStepTime('PAID') }}</span>
            </li>
            <li class="step" :class="{ 'step-primary': isStepCompleted('SHIPPING') }">
              发货中
              <span class="text-xs opacity-60">{{ getStepTime('SHIPPING') }}</span>
            </li>
            <li class="step" :class="{ 'step-primary': isStepCompleted('DELIVERED') }">
              已送达
              <span class="text-xs opacity-60">{{ getStepTime('DELIVERED') }}</span>
            </li>
            <li class="step" :class="{ 'step-primary': isStepCompleted('COMPLETED') }">
              已完成
              <span class="text-xs opacity-60">{{ getStepTime('COMPLETED') }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 订单信息 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- 基本信息 -->
        <div class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <h2 class="card-title mb-4">基本信息</h2>
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="opacity-60">订单编号</span>
                <span class="font-mono">{{ order?.id }}</span>
              </div>
              <div class="flex justify-between">
                <span class="opacity-60">创建时间</span>
                <span>{{ formatDateTime(order?.created_at) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="opacity-60">订单状态</span>
                <div :class="{
                  'badge': true,
                  'badge-warning': order?.status === 'PENDING',
                  'badge-info': order?.status === 'PAID',
                  'badge-primary': order?.status === 'SHIPPING',
                  'badge-success': order?.status === 'COMPLETED',
                  'badge-error': order?.status === 'CANCELLED',
                  'badge-ghost': order?.status === 'DELIVERED'
                }">{{ orderStatusMap[order?.status || ''] }}</div>
              </div>
              <div class="flex justify-between">
                <span class="opacity-60">订单金额</span>
                <span class="text-primary font-bold">¥{{ order?.total }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 客户信息 -->
        <div class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <h2 class="card-title mb-4">客户信息</h2>
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="opacity-60">客户名称</span>
                <span>{{ order?.user?.nickname || order?.user?.username }}</span>
              </div>
              <div class="flex justify-between">
                <span class="opacity-60">联系电话</span>
                <span>{{ order?.user?.phone }}</span>
              </div>
              <div class="flex justify-between">
                <span class="opacity-60">用户ID</span>
                <span class="font-mono">{{ order?.user?.id }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品清单 -->
      <div class="card bg-base-100 shadow-sm mb-6">
        <div class="card-body">
          <h2 class="card-title mb-4">商品清单</h2>
          <div class="overflow-x-auto">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th>商品信息</th>
                  <th>单价</th>
                  <th>数量</th>
                  <th>小计</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in order?.items" :key="item.id" class="hover">
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                          <img :src="item.product.image || '/images/default-product.png'" :alt="item.product.name" />
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">{{ item.product.name }}</div>
                        <div class="text-sm opacity-50">ID: {{ item.product.id }}</div>
                      </div>
                    </div>
                  </td>
                  <td>¥{{ item.price }}</td>
                  <td>{{ item.quantity }}</td>
                  <td class="text-primary font-bold">¥{{ Number(item.price) * item.quantity }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right font-bold">总计：</td>
                  <td class="text-primary font-bold text-xl">¥{{ order?.total }}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <h2 class="card-title mb-4">订单操作</h2>
          <div class="flex gap-4">
            <button 
              v-if="order?.status === 'PENDING'"
              class="btn btn-error"
              @click="updateStatus('CANCELLED')"
            >取消订单</button>
            <button 
              v-if="order?.status === 'PAID'"
              class="btn btn-primary"
              @click="updateStatus('SHIPPING')"
            >发货</button>
            <button 
              v-if="order?.status === 'SHIPPING'"
              class="btn btn-primary"
              @click="updateStatus('DELIVERED')"
            >确认送达</button>
            <button 
              v-if="order?.status === 'DELIVERED'"
              class="btn btn-success"
              @click="updateStatus('COMPLETED')"
            >完成订单</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-else class="flex justify-center items-center h-[400px]">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '~/stores/order'
import type { Order, OrderStatus } from '@prisma/client'

// 页面元数据
definePageMeta({
  layout: 'admin'
})

const route = useRoute()
const orderId = Number(route.params.id)
const orderStore = useOrderStore()

// 加载状态
const loading = ref(true)
const order = ref<Order | null>(null)

// 订单状态映射
const orderStatusMap = {
  'PENDING': '待付款',
  'PAID': '已付款',
  'SHIPPING': '发货中',
  'DELIVERED': '已送达',
  'COMPLETED': '已完成',
  'CANCELLED': '已取消'
}

// 格式化日期时间
const formatDateTime = (date: string | Date | undefined) => {
  if (!date) return ''
  return new Date(date).toLocaleString()
}

// 检查步骤是否完成
const isStepCompleted = (status: OrderStatus) => {
  if (!order.value) return false
  const statusOrder = ['PENDING', 'PAID', 'SHIPPING', 'DELIVERED', 'COMPLETED']
  const currentIndex = statusOrder.indexOf(order.value.status)
  const targetIndex = statusOrder.indexOf(status)
  return currentIndex >= targetIndex
}

// 获取步骤时间
const getStepTime = (status: OrderStatus) => {
  // 这里需要后端提供状态变更历史记录
  // 暂时返回空字符串
  return ''
}

// 更新订单状态
const updateStatus = async (status: OrderStatus) => {
  try {
    await orderStore.updateOrderStatus(orderId, status)
    await fetchOrder()
    ElMessage.success('状态更新成功')
  } catch (error) {
    ElMessage.error('状态更新失败')
  }
}

// 获取订单详情
const fetchOrder = async () => {
  try {
    loading.value = true
    order.value = await orderStore.fetchOrder(orderId)
  } catch (error) {
    ElMessage.error('获取订单详情失败')
  } finally {
    loading.value = false
  }
}

// 初始化
onMounted(() => {
  fetchOrder()
})
</script>
