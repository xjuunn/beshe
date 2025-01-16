<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- 面包屑导航 -->
    <div class="text-sm breadcrumbs mb-6">
      <ul>
        <li><a>首页</a></li>
        <li>全部商品</li>
      </ul>
    </div>

    <div class="flex gap-6">
      <!-- 左侧筛选栏 -->
      <div class="w-64 flex-shrink-0">
        <div class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <h3 class="font-bold mb-4">商品分类</h3>
            <ul class="menu bg-base-100">
              <li v-for="item in 20" :key="item">
                <a :class="{ 'active': selectedCategory === category.id }"
                   @click="selectedCategory = category.id">
                  {{ category.name }}
                  <span class="badge badge-sm">{{ category.count }}</span>
                </a>
              </li>
            </ul>

            <div class="divider"></div>

            <h3 class="font-bold mb-4">价格区间</h3>
            <div class="flex gap-2 items-center">
              <input type="number" placeholder="最低价" class="input input-bordered input-sm w-24" 
                     v-model="priceRange.min" />
              <span>-</span>
              <input type="number" placeholder="最高价" class="input input-bordered input-sm w-24"
                     v-model="priceRange.max" />
            </div>
            <button class="btn btn-sm btn-primary mt-2 w-full">确定</button>

            <div class="divider"></div>

            <h3 class="font-bold mb-4">商品筛选</h3>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">仅看有货</span>
                <input type="checkbox" class="checkbox checkbox-sm" v-model="filters.inStock" />
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">促销商品</span>
                <input type="checkbox" class="checkbox checkbox-sm" v-model="filters.onSale" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧商品列表 -->
      <div class="flex-1">
        <!-- 排序工具栏 -->
        <div class="flex justify-between items-center mb-6">
          <div class="join">
            <button class="join-item btn btn-sm" 
                    :class="{ 'btn-active': sortBy === 'default' }"
                    @click="sortBy = 'default'">默认</button>
            <button class="join-item btn btn-sm"
                    :class="{ 'btn-active': sortBy === 'sales' }"
                    @click="sortBy = 'sales'">销量</button>
            <button class="join-item btn btn-sm"
                    :class="{ 'btn-active': sortBy === 'price' }"
                    @click="sortBy = 'price'">价格</button>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-sm">共 {{ totalProducts }} 件商品</span>
            <div class="join">
              <button class="join-item btn btn-sm btn-ghost">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button class="join-item btn btn-sm btn-ghost">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 商品网格 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="product in products" :key="product.id" 
               class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <figure class="relative">
              <img :src="product.image" :alt="product.name" class="h-[200px] w-full object-cover" />
              <div class="badge badge-secondary absolute top-2 right-2" v-if="product.tag">
                {{ product.tag }}
              </div>
            </figure>
            <div class="card-body">
              <h2 class="card-title">{{ product.name }}</h2>
              <p class="text-gray-600 line-clamp-2">{{ product.description }}</p>
              <div class="flex justify-between items-center mt-4">
                <div>
                  <span class="text-primary text-xl font-bold">¥{{ product.price }}</span>
                  <span class="text-gray-400 text-sm line-through ml-2">¥{{ product.originalPrice }}</span>
                </div>
                <button class="btn btn-primary btn-sm">加入购物车</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="flex justify-center mt-8">
          <div class="join">
            <button class="join-item btn">«</button>
            <button class="join-item btn btn-active">1</button>
            <button class="join-item btn">2</button>
            <button class="join-item btn">3</button>
            <button class="join-item btn">4</button>
            <button class="join-item btn">»</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'frontend'
})


</script> 