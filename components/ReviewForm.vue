<template>
  <div class="review-form">
    <form @submit.prevent="submitReview" class="space-y-4">
      <!-- 评分 -->
      <div>
        <label class="label">
          <span class="label-text">评分</span>
        </label>
        <div class="rating rating-lg">
          <input 
            v-for="i in 5" 
            :key="i"
            type="radio" 
            :class="['mask mask-star-2 bg-orange-400']"
            :checked="rating === i"
            @change="rating = i"
          />
        </div>
      </div>

      <!-- 评价内容 -->
      <div>
        <label class="label">
          <span class="label-text">评价内容</span>
        </label>
        <textarea 
          v-model="content"
          class="textarea textarea-bordered w-full" 
          rows="4"
          placeholder="请输入您的评价内容（至少5个字）"
        ></textarea>
      </div>

      <!-- 图片上传 -->
      <div>
        <label class="label">
          <span class="label-text">上传图片（可选）</span>
        </label>
        <div class="grid grid-cols-4 gap-4">
          <div 
            v-for="(image, index) in images" 
            :key="index" 
            class="aspect-square relative rounded-lg overflow-hidden border border-base-300"
          >
            <img :src="image" class="w-full h-full object-cover">
            <button 
              class="btn btn-circle btn-sm absolute top-1 right-1"
              @click.prevent="removeImage(index)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <label 
            v-if="images.length < 4"
            class="aspect-square flex items-center justify-center border-2 border-dashed border-base-300 rounded-lg cursor-pointer hover:border-primary"
          >
            <input 
              type="file" 
              accept="image/*" 
              class="hidden"
              @change="handleImageUpload"
            >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </label>
        </div>
      </div>

      <!-- 提交按钮 -->
      <div class="text-right">
        <button type="submit" class="btn btn-primary" :disabled="submitting">
          {{ submitting ? '提交中...' : '提交评价' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  orderId: string
  productId: string
}>()

const emit = defineEmits<{
  (e: 'success'): void
}>()

const rating = ref(5)
const content = ref('')
const images = ref<string[]>([])
const submitting = ref(false)

// 处理图片上传
const handleImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  // TODO: 实现图片上传
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    images.value.push(data.url)
  } catch (error) {
    console.error('图片上传失败:', error)
    alert('图片上传失败')
  }
}

// 移除图片
const removeImage = (index: number) => {
  images.value.splice(index, 1)
}

// 提交评价
const submitReview = async () => {
  if (!content.value || content.value.trim().length < 5) {
    alert('评价内容至少5个字')
    return
  }

  submitting.value = true
  try {
    await useFetch('/api/reviews', {
      method: 'POST',
      body: {
        orderId: props.orderId,
        productId: props.productId,
        rating: rating.value,
        content: content.value.trim(),
        images: images.value
      }
    })
    
    emit('success')
  } catch (error) {
    console.error('提交评价失败:', error)
    alert('提交评价失败')
  } finally {
    submitting.value = false
  }
}
</script>
