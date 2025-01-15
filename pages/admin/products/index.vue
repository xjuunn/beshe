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
          <select v-model="selectedCategory" @change="handleCategoryChange" class="select select-bordered w-full max-w-[200px]">
            <option value="">全部分类</option>
            <option value="1">手机数码</option>
            <option value="2">电脑办公</option>
            <option value="3">家用电器</option>
          </select>
          <select v-model="selectedStatus" @change="handleStatusChange" class="select select-bordered w-full max-w-[200px]">
            <option value="ACTIVE">上架中</option>
            <option value="INACTIVE">已下架</option>
            <option value="DRAFT">草稿</option>
          </select>
        </div>
        <div class="join">
          <input v-model="searchQuery" type="text" placeholder="搜索商品名称" class="input input-bordered join-item w-full md:w-80" @keyup.enter="handleSearch" />
          <button class="btn join-item" @click="handleSearch" :disabled="loading">搜索</button>
        </div>
      </div>
    </div>

    <!-- 批量操作 -->
    <div v-if="selectedProducts.length > 0" class="bg-base-100 p-4 rounded-lg shadow-sm mb-6">
      <div class="flex items-center gap-4">
        <span class="text-sm">已选择 {{ selectedProducts.length }} 件商品</span>
        <button class="btn btn-sm" @click="handleBatchUpdateStatus('ACTIVE')">批量上架</button>
        <button class="btn btn-sm" @click="handleBatchUpdateStatus('INACTIVE')">批量下架</button>
        <button class="btn btn-sm btn-error" @click="handleBatchUpdateStatus('DELETED')">批量删除</button>
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
                  <input type="checkbox" class="checkbox" 
                    :checked="selectedProducts.length === products.length"
                    :indeterminate="selectedProducts.length > 0 && selectedProducts.length < products.length"
                    @change="e => {
                      if (e.target.checked) {
                        selectedProducts = products.map(p => p.id)
                      } else {
                        selectedProducts = []
                      }
                    }"
                  />
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
            <template v-if="!loading">
              <tr v-for="product in products" :key="product.id" class="hover">
                <th>
                  <label>
                    <input type="checkbox" class="checkbox" 
                      v-model="selectedProducts"
                      :value="product.id"
                    />
                  </label>
                </th>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle w-12 h-12">
                        <img :src="product.image || '/images/default-product.png'" :alt="product.name" />
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">{{ product.name }}</div>
                      <div class="text-sm opacity-50">ID: {{ product.id }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="badge badge-ghost">{{ product.category?.name }}</div>
                </td>
                <td>
                  <div class="text-primary font-bold">¥{{ product.price }}</div>
                </td>
                <td>
                  <div :class="product.stock < 10 ? 'text-error' : ''">
                    {{ product.stock }}
                  </div>
                </td>
                <td>
                  <div :class="{
                    'badge': true,
                    'badge-success': product.status === 'ACTIVE',
                    'badge-warning': product.status === 'DRAFT',
                    'badge-ghost': product.status === 'INACTIVE',
                    'badge-error': product.status === 'DELETED'
                  }">{{ {
                    'ACTIVE': '上架中',
                    'INACTIVE': '已下架',
                    'DRAFT': '草稿',
                    'DELETED': '已删除'
                  }[product.status] }}</div>
                </td>
                <td>
                  <div class="flex gap-2">
                    <NuxtLink :to="`/admin/products/${product.id}/edit`" class="btn btn-xs">编辑</NuxtLink>
                    <button @click="handleDelete(product.id)" class="btn btn-xs btn-error">删除</button>
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
          共 {{ totalCount }} 条记录
        </div>
        <div class="join">
          <button 
            v-for="page in Math.ceil(totalCount / pageSize)" 
            :key="page"
            class="join-item btn btn-sm"
            :class="{ 'btn-active': page === currentPage }"
            @click="handlePageChange(page)"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/stores/product'
import { storeToRefs } from 'pinia'
import type { Product } from '@prisma/client'
definePageMeta({
  layout: 'admin'
})

const productStore = useProductStore()
const { products, loading, totalCount, currentPage, pageSize } = storeToRefs(productStore)

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('ACTIVE')

// 获取商品列表
const fetchProducts = async () => {
  await productStore.fetchProducts({
    page: currentPage.value,
    limit: pageSize.value,
    search: searchQuery.value || undefined,
    category_id: selectedCategory.value ? Number(selectedCategory.value) : undefined,
    status: selectedStatus.value as 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'DELETED'
  })
}

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1
  fetchProducts()
}

// 处理分类变化
const handleCategoryChange = () => {
  currentPage.value = 1
  fetchProducts()
}

// 处理状态变化
const handleStatusChange = () => {
  currentPage.value = 1
  fetchProducts()
}

// 处理分页变化
const handlePageChange = (page: number) => {
  currentPage.value = page
  fetchProducts()
}

// 删除商品
const handleDelete = async (id: number) => {
  try {
    await productStore.deleteProduct(id)
    await fetchProducts()
    ElMessage.success('删除成功')
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

// 批量更新状态
const selectedProducts = ref<number[]>([])
const handleBatchUpdateStatus = async (status: 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'DELETED') => {
  if (selectedProducts.value.length === 0) {
    ElMessage.warning('请选择商品')
    return
  }
  try {
    await productStore.batchUpdateStatus(selectedProducts.value, status)
    await fetchProducts()
    selectedProducts.value = []
    ElMessage.success('操作成功')
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

// 初始化加载
onMounted(() => {
  fetchProducts()
})
</script>