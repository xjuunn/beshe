<template>
  <div>
    <!-- 页面标题 -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">订单列表</h1>
        <p class="opacity-60 mt-1">管理所有订单信息</p>
      </div>
    </div>

    <!-- 订单列表 -->
    <div class="card bg-base-100 shadow-sm">
      <div class="overflow-x-auto">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>订单号</th>
              <th>客户信息</th>
              <th>订单金额</th>
              <th>支付状态</th>
              <th>订单状态</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id" class="hover">
              <td>{{ order.orderNo }}</td>
              <td>{{ order.customerName }}</td>
              <td>¥{{ order.amount }}</td>
              <td>
                <div class="badge" :class="order.isPaid ? 'badge-success' : 'badge-warning'">
                  {{ order.isPaid ? '已支付' : '待支付' }}
                </div>
              </td>
              <td>
                <div class="badge badge-ghost">{{ order.status }}</div>
              </td>
              <td>{{ order.createdAt }}</td>
              <td>
                <button class="btn btn-ghost btn-xs">查看</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'admin'
})

// 模拟订单数据
const orders = ref([
  {
    id: 1,
    orderNo: 'ORD202401001',
    customerName: '张三',
    amount: 2999,
    isPaid: true,
    status: '已发货',
    createdAt: '2024-01-15 10:30'
  },
  {
    id: 2,
    orderNo: 'ORD202401002',
    customerName: '李四',
    amount: 1599,
    isPaid: false,
    status: '待付款',
    createdAt: '2024-01-15 11:20'
  }
])
</script> 