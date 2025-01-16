<template>
  <div class="bg-base-100">
    <!-- 主要内容区域 -->
    <div class="min-h-screen pb-16">
      <!-- 轮播图升级版 -->
      <div class="w-full bg-base-200 py-4">
        <div class="container mx-auto px-4 flex items-center justify-center">
          <div class="carousel w-full max-w-7xl mx-auto h-[400px] rounded-xl overflow-hidden">
            <div id="slide1" class="carousel-item relative w-full">
              <img src="https://picsum.photos/seed/1/1200/400" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-r from-base-300/50 to-transparent">
                <div class="flex flex-col justify-center h-full max-w-md px-8">
                  <h2 class="text-4xl font-bold mb-4">新品上市</h2>
                  <p class="mb-6">发现更多精彩好物，享受品质生活</p>
                  <button class="btn btn-primary w-40">立即查看</button>
                </div>
              </div>
              <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" class="btn btn-circle">❮</a> 
                <a href="#slide2" class="btn btn-circle">❯</a>
              </div>
            </div> 
            <div id="slide2" class="carousel-item relative w-full">
              <img src="https://picsum.photos/seed/2/1200/400" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-r from-base-300/50 to-transparent">
                <div class="flex flex-col justify-center h-full max-w-md px-8">
                  <h2 class="text-4xl font-bold mb-4">限时特惠</h2>
                  <p class="mb-6">精选商品低至5折，快来抢购</p>
                  <button class="btn btn-primary w-40">查看详情</button>
                </div>
              </div>
              <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" class="btn btn-circle">❮</a> 
                <a href="#slide3" class="btn btn-circle">❯</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品分类 -->
      <div class="max-w-7xl mx-auto p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">热门分类</h2>
          <a class="link link-primary">查看全部</a>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div v-for="category in categories" 
               :key="category.id" 
               class="card bg-base-200 hover:shadow-xl transition-shadow cursor-pointer"
               @click="currentTab = category.name">
            <div class="card-body items-center text-center p-4">
              <span class="text-2xl text-primary">{{ category.emoji }}</span>
              <h3 class="card-title text-sm">{{ category.name }}</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品列表 -->
      <div class="max-w-7xl mx-auto p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">精选推荐</h2>
          <div class="join">
            <button v-for="tab in ['全部', ...categories.map(c => c.name)]" 
                    :key="tab"
                    :class="['join-item btn btn-sm', currentTab === tab ? 'btn-active' : '']"
                    @click="currentTab = tab">
              {{ tab }}
            </button>
          </div>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <span class="loading loading-spinner loading-lg"></span>
        </div>

        <!-- 商品网格 -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="item in 20" 
               :key="item" 
               class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <figure class="relative">
              <img :src="'https://picsum.photos/seed/1/800/600'" 
                   :alt="item" 
                   class="h-[200px] w-full object-cover" />
              <div v-if="item <= 10" 
                   class="badge badge-error absolute top-2 right-2">
                库存紧张
              </div>
            </figure>
            <div class="card-body">
              <h2 class="card-title">{{ item }}</h2>
              <p class="text-gray-600 line-clamp-2">{{ item }}</p>
              <div class="flex justify-between items-center mt-4">
                <div>
                  <span class="text-primary text-xl font-bold">¥{{ item }}</span>
                </div>
                <button class="btn btn-primary btn-sm" 
                        :disabled="item <= 0"
                        @click="addToCart(product)">
                  {{ item > 0 ? '加入购物车' : '暂时缺货' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="!false && false === 0" 
             class="text-center py-12">
          <div class="text-4xl mb-4">😢</div>
          <p class="text-gray-500">暂无商品</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'frontend'
})

const categories = ref([
  { id: 1, name: '手机数码', emoji: '📱' },
  { id: 2, name: '电脑办公', emoji: '💻' },
  { id: 3, name: '家用电器', emoji: '🏠' },
  { id: 4, name: '服装鞋包', emoji: '👔' },
  { id: 5, name: '美妆护肤', emoji: '💄' },
  { id: 6, name: '运动户外', emoji: '⚽' }
])

</script>

<style scoped>
.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 添加轮播图过渡动画 */
.carousel-item {
  transition: transform 0.5s ease-in-out;
}

/* 优化按钮悬停效果 */
.btn-circle:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease-in-out;
}
</style>
