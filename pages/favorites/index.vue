<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- 面包屑导航 -->
    <div class="text-sm breadcrumbs mb-6">
      <ul>
        <li><a>首页</a></li>
        <li>我的收藏</li>
      </ul>
    </div>

    <!-- 收藏夹工具栏 -->
    <div class="flex justify-between items-center mb-6">
      <div class="tabs">
        <a class="tab tab-bordered" :class="{ 'tab-active': activeTab === 'products' }"
           @click="activeTab = 'products'">商品收藏</a>
        <a class="tab tab-bordered" :class="{ 'tab-active': activeTab === 'shops' }"
           @click="activeTab = 'shops'">店铺收藏</a>
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm">共 {{ totalFavorites }} 个收藏</span>
        <button class="btn btn-sm btn-error" @click="showDeleteModal = true">
          批量删除
        </button>
      </div>
    </div>

    <!-- 收藏商品列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="item in favorites" :key="item.id" 
           class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
        <figure class="relative">
          <img :src="item.image" :alt="item.name" class="h-[200px] w-full object-cover" />
          <button class="btn btn-circle btn-sm absolute top-2 right-2 btn-ghost"
                  @click="toggleFavorite(item.id)">
            <span class="text-red-500">❤️</span>
          </button>
        </figure>
        <div class="card-body">
          <h2 class="card-title text-base">{{ item.name }}</h2>
          <p class="text-primary font-bold">¥{{ item.price }}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary btn-sm">加入购物车</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="favorites.length === 0" class="text-center py-16">
      <div class="text-4xl mb-4">🤍</div>
      <p class="text-gray-500">暂无收藏商品</p>
      <button class="btn btn-primary mt-4">去逛逛</button>
    </div>

    <!-- 删除确认弹窗 -->
    <dialog class="modal" :class="{ 'modal-open': showDeleteModal }">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg">确认删除</h3>
        <p class="py-4">确定要删除选中的收藏商品吗？此操作不可恢复。</p>
        <div class="modal-action">
          <button class="btn" @click="showDeleteModal = false">取消</button>
          <button class="btn btn-error" @click="confirmDelete">确认删除</button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'frontend'
})

const activeTab = ref('products')
const totalFavorites = ref(8)
const showDeleteModal = ref(false)

const favorites = ref([
  {
    id: 1,
    name: '2024新款智能手机',
    price: 2999,
    image: 'https://picsum.photos/seed/phone1/300/200'
  },
  {
    id: 2,
    name: '无线蓝牙耳机',
    price: 799,
    image: 'https://picsum.photos/seed/headphone/300/200'
  },
  {
    id: 3,
    name: '智能手表',
    price: 599,
    image: 'https://picsum.photos/seed/watch/300/200'
  },
  // ... 可以添加更多收藏商品
])

const toggleFavorite = (id) => {
  // 实现取消收藏功能
  favorites.value = favorites.value.filter(item => item.id !== id)
  totalFavorites.value--
}

const confirmDelete = () => {
  // 实现批量删除功能
  showDeleteModal.value = false
}
</script> 