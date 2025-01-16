<template>
  <div>
    <!-- 页面标题和操作按钮 -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">商品列表</h1>
        <p class="opacity-60 mt-1">管理您的所有商品</p>
      </div>
      <NuxtLink to="/admin/products/create" class="btn btn-primary btn-sm">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        添加商品
      </NuxtLink>
    </div>

    <!-- 筛选和搜索工具栏 -->
    <div class="bg-base-100 p-4 rounded-lg shadow-sm mb-6">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1 flex gap-4">
          <select  @change="null"
            class="select select-bordered w-full max-w-[200px]">
            <option value="">全部分类</option>
            <option value="1">手机数码</option>
            <option value="2">电脑办公</option>
            <option value="3">家用电器</option>
          </select>
          <select @change="null"
            class="select select-bordered w-full max-w-[200px]">
            <option value="ACTIVE">上架中</option>
            <option value="INACTIVE">已下架</option>
            <option value="DRAFT">草稿</option>
          </select>
        </div>
        <div class="join">
          <input type="text" placeholder="搜索商品名称"
            class="input input-bordered join-item w-full md:w-80" @keyup.enter="null" />
          <button class="btn join-item" @click="null" :disabled="false">搜索</button>
        </div>
      </div>
    </div>

    <!-- 批量操作 -->
    <div class="bg-base-100 p-4 rounded-lg shadow-sm mb-6">
      <div class="flex items-center gap-4">
        <span class="text-sm">已选择 test 件商品</span>
        <button class="btn btn-sm" @click="null">批量上架</button>
        <button class="btn btn-sm" @click="null">批量下架</button>
        <button class="btn btn-sm btn-error" @click="null">批量删除</button>
      </div>
    </div>

    <!-- 商品表格 -->
    <div class="bg-base-100 rounded-lg shadow-sm">
      <div class="overflow-x-auto">
        <table class="table table-sm">
          <!-- 表头 -->
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" :checked="false" />
                </label>
              </th>
              <th>商品信息</th>
              <th>分类</th>
              <th>价格</th>
              <th>库存</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <!-- 表格内容 -->
          <tbody>
            <template v-if="!false">
              <tr v-for="item in 20" :key="item" class="hover">
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" :value="item" />
                  </label>
                </th>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle w-12 h-12">
                        <img :src="'/images/default-product.png'" :alt="item + ''" />
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">{{ item }}</div>
                      <div class="text-sm opacity-50">ID: {{ item }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="badge badge-ghost">{{ item }}</div>
                </td>
                <td>
                  <div class="text-primary font-bold">¥{{ item }}</div>
                </td>
                <td>
                  <div :class="100 < 10 ? 'text-error' : ''">
                    {{ item }}
                  </div>
                </td>
                <td>
                  <!-- <div :class="{
                    'badge': true,
                    'badge-success': product.status === 'ACTIVE',
                    'badge-warning': product.status === 'DRAFT',
                    'badge-ghost': product.status === 'INACTIVE',
                    'badge-error': product.status === 'DELETED'
                  }">已上架</div> -->
                </td>
                <td>
                  <div class="flex gap-2">
                    <NuxtLink :to="`/admin/products/${item}/edit`" class="btn btn-xs">编辑</NuxtLink>
                    <button @click="null" class="btn btn-xs btn-error">删除</button>
                  </div>
                </td>
              </tr>
            </template>
            <tr v-else>
              <td colspan="7" class="text-center py-4">
                <span class="loading loading-spinner loading-md"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <div class="flex justify-between items-center p-4">
        <div class="text-sm text-gray-600">
          共 test 条记录
        </div>
        <div class="join">
          <button v-for="page in Math.ceil(100 / 10)" :key="page" class="join-item btn btn-sm"
            :class="{ 'btn-active': page === 20 }" @click="null">
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

</script>