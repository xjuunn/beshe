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

    <div v-if="!false">
      <!-- 订单状态时间线 -->
      <div class="card bg-base-100 shadow-sm mb-6">
        <div class="card-body">
          <h2 class="card-title mb-4">订单状态</h2>
          <ul class="steps steps-vertical lg:steps-horizontal">
            <li class="step" :class="'step-primary'">
              待付款
              <span class="text-xs opacity-60">test</span>
            </li>
            <li class="step" :class="'step-primary'">
              已付款
              <span class="text-xs opacity-60">test</span>
            </li>
            <li class="step" :class="'step-primary'">
              发货中
              <span class="text-xs opacity-60">test</span>
            </li>
            <li class="step" :class="'step-primary'">
              已送达
              <span class="text-xs opacity-60">test</span>
            </li>
            <li class="step" :class="'step-primary'">
              已完成
              <span class="text-xs opacity-60">test</span>
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
                <span class="font-mono">test</span>
              </div>
              <div class="flex justify-between">
                <span class="opacity-60">创建时间</span>
                <span>test</span>
              </div>
              <div class="flex justify-between">
                <span class="opacity-60">订单状态</span>
                <!-- <div :class="{
                  'badge': true,
                  'badge-warning': order?.status === 'PENDING',
                  'badge-info': order?.status === 'PAID',
                  'badge-primary': order?.status === 'SHIPPING',
                  'badge-success': order?.status === 'COMPLETED',
                  'badge-error': order?.status === 'CANCELLED',
                  'badge-ghost': order?.status === 'DELIVERED'
                }">{{ orderStatusMap[order?.status || ''] }}</div> -->
              </div>
              <div class="flex justify-between">
                <span class="opacity-60">订单金额</span>
                <span class="text-primary font-bold">¥test</span>
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
                <span>test</span>
              </div>
              <div class="flex justify-between">
                <span class="opacity-60">联系电话</span>
                <span>test</span>
              </div>
              <div class="flex justify-between">
                <span class="opacity-60">用户ID</span>
                <span class="font-mono">test</span>
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
                <tr v-for="item in 20" :key="item" class="hover">
                  <td>
                    <div class="flex items-center gap-3">
                      <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                          <img :src="'/images/default-product.png'" :alt="item+''" />
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">{{ item }}</div>
                        <div class="text-sm opacity-50">ID: {{ item }}</div>
                      </div>
                    </div>
                  </td>
                  <td>¥{{ item }}</td>
                  <td>{{ item }}</td>
                  <td class="text-primary font-bold">¥test</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right font-bold">总计：</td>
                  <td class="text-primary font-bold text-xl">¥test</td>
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
            <button class="btn btn-error" @click="null">取消订单</button>
            <button class="btn btn-primary" @click="null">发货</button>
            <button class="btn btn-primary" @click="null">确认送达</button>
            <button class="btn btn-success" @click="null">完成订单</button>
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
definePageMeta({
  layout: 'admin'
})
</script>
