<template>
  <div class="product-review">
    <!-- 评价统计 -->
    <div class="stats shadow mb-6">
      <div class="stat">
        <div class="stat-title">总评价数</div>
        <div class="stat-value">{{ stats.totalRatings }}</div>
      </div>
      <div class="stat">
        <div class="stat-title">平均评分</div>
        <div class="stat-value text-primary">{{ stats.averageRating.toFixed(1) }}</div>
        <div class="stat-desc">
          <div class="rating rating-sm">
            <input type="radio" class="mask mask-star-2 bg-orange-400" :checked="Math.round(stats.averageRating) >= i" disabled v-for="i in 5" :key="i" />
          </div>
        </div>
      </div>
    </div>

    <!-- 评分分布 -->
    <div class="mb-8">
      <div v-for="i in 5" :key="i" class="flex items-center gap-4 mb-2">
        <div class="rating rating-sm w-24">
          <input type="radio" class="mask mask-star-2 bg-orange-400" :checked="true" disabled v-for="j in i" :key="j" />
        </div>
        <progress class="progress progress-primary w-56" :value="stats.ratingDistribution[i]" :max="stats.totalRatings"></progress>
        <span class="text-sm opacity-60">{{ stats.ratingDistribution[i] }}</span>
      </div>
    </div>

    <!-- 评价列表 -->
    <div class="divider">用户评价</div>
    <div v-if="reviews.items.length === 0" class="text-center py-8 opacity-60">
      暂无评价
    </div>
    <div v-else class="space-y-6">
      <div v-for="review in reviews.items" :key="review.id" class="card bg-base-100 shadow-sm">
        <div class="card-body">
          <div class="flex items-center gap-4 mb-4">
            <div class="avatar">
              <div class="w-12 rounded-full">
                <img :src="review.user.avatar || '/default-avatar.png'" :alt="review.user.name">
              </div>
            </div>
            <div>
              <div class="font-bold">{{ review.user.name }}</div>
              <div class="rating rating-sm">
                <input type="radio" class="mask mask-star-2 bg-orange-400" :checked="review.rating >= i" disabled v-for="i in 5" :key="i" />
              </div>
            </div>
            <div class="ml-auto text-sm opacity-60">
              {{ formatDate(review.createdAt) }}
            </div>
          </div>
          <p class="whitespace-pre-wrap">{{ review.content }}</p>
          <div v-if="review.images && review.images.length > 0" class="grid grid-cols-4 gap-4 mt-4">
            <div v-for="(image, index) in review.images" :key="index" class="aspect-square rounded-lg overflow-hidden">
              <img :src="image" class="w-full h-full object-cover" @click="showImage(image)">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div v-if="reviews.totalPages > 1" class="flex justify-center mt-6">
      <div class="join">
        <button 
          class="join-item btn" 
          :disabled="reviews.page === 1"
          @click="changePage(reviews.page - 1)"
        >
          «
        </button>
        <button class="join-item btn">{{ reviews.page }} / {{ reviews.totalPages }}</button>
        <button 
          class="join-item btn" 
          :disabled="reviews.page === reviews.totalPages"
          @click="changePage(reviews.page + 1)"
        >
          »
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  productId: string
}>()

const reviews = ref({
  items: [],
  total: 0,
  page: 1,
  pageSize: 10,
  totalPages: 0
})

const stats = ref({
  totalRatings: 0,
  averageRating: 0,
  ratingDistribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  }
})

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 加载评价
const loadReviews = async (page = 1) => {
  const { data } = await useFetch(`/api/products/${props.productId}/reviews`, {
    query: { page }
  })
  if (data.value) {
    reviews.value = data.value
  }
}

// 加载统计
const loadStats = async () => {
  const { data } = await useFetch(`/api/products/${props.productId}/reviews/stats`)
  if (data.value) {
    stats.value = data.value
  }
}

// 切换页面
const changePage = (page: number) => {
  loadReviews(page)
}

// 显示图片
const showImage = (url: string) => {
  // TODO: 实现图片预览
}

// 初始化
onMounted(() => {
  loadReviews()
  loadStats()
})
</script>
