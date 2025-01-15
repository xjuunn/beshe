<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">添加商品</h1>
        <p class="opacity-60 mt-1">创建新的商品信息</p>
      </div>
      <NuxtLink to="/admin/products" class="btn btn-ghost btn-sm">
        返回列表
      </NuxtLink>
    </div>

    <div class="bg-base-100 p-6 rounded-lg shadow-sm">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- 基本信息 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-control">
            <label class="label">
              <span class="label-text">商品名称</span>
              <span class="label-text-alt text-error">*</span>
            </label>
            <input 
              v-model="form.name" 
              type="text" 
              class="input input-bordered" 
              :class="{'input-error': errors.name}"
              placeholder="请输入商品名称"
              required
            />
            <label v-if="errors.name" class="label">
              <span class="label-text-alt text-error">{{ errors.name }}</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">商品分类</span>
              <span class="label-text-alt text-error">*</span>
            </label>
            <select 
              v-model="form.category_id" 
              class="select select-bordered"
              :class="{'select-error': errors.category_id}"
              required
            >
              <option value="">请选择分类</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
            <label v-if="errors.category_id" class="label">
              <span class="label-text-alt text-error">{{ errors.category_id }}</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">商品价格</span>
              <span class="label-text-alt text-error">*</span>
            </label>
            <div class="join">
              <span class="join-item flex items-center px-4 bg-base-200">¥</span>
              <input 
                v-model.number="form.price" 
                type="number" 
                class="input input-bordered join-item"
                :class="{'input-error': errors.price}"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
            <label v-if="errors.price" class="label">
              <span class="label-text-alt text-error">{{ errors.price }}</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">库存数量</span>
              <span class="label-text-alt text-error">*</span>
            </label>
            <input 
              v-model.number="form.stock" 
              type="number" 
              class="input input-bordered"
              :class="{'input-error': errors.stock}"
              placeholder="0"
              min="0"
              required
            />
            <label v-if="errors.stock" class="label">
              <span class="label-text-alt text-error">{{ errors.stock }}</span>
            </label>
          </div>
        </div>

        <!-- 商品图片 -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">商品图片</span>
          </label>
          <div class="flex items-start gap-4">
            <div class="w-32 h-32 relative">
              <img 
                :src="form.image || '/images/default-product.png'" 
                class="w-full h-full object-cover rounded-lg"
                alt="商品图片"
              />
              <input 
                type="file" 
                accept="image/*"
                @change="handleImageUpload" 
                class="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <div class="text-sm opacity-60">
              <p>支持 jpg、png、gif 格式，最大 2MB</p>
              <p>建议尺寸：800x800 像素</p>
            </div>
          </div>
        </div>

        <!-- 商品描述 -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">商品描述</span>
          </label>
          <textarea 
            v-model="form.description" 
            class="textarea textarea-bordered h-32"
            :class="{'textarea-error': errors.description}"
            placeholder="请输入商品描述"
          ></textarea>
          <label v-if="errors.description" class="label">
            <span class="label-text-alt text-error">{{ errors.description }}</span>
          </label>
        </div>

        <!-- 提交按钮 -->
        <div class="flex justify-end gap-4">
          <button type="button" class="btn" @click="saveDraft">保存草稿</button>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <span class="loading loading-spinner loading-sm" v-if="loading"></span>
            发布商品
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '~/stores/product'
import type { ProductCreateInput } from '~/server/services/product'

const productStore = useProductStore()
const router = useRouter()

// 表单数据
const form = ref<ProductCreateInput>({
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category_id: 0,
  image: ''
})

// 错误信息
const errors = ref<Partial<Record<keyof ProductCreateInput, string>>>({})

// 加载状态
const loading = ref(false)

// 获取分类列表
const { data: categories } = await useFetch('/api/categories')

// 处理图片上传
const handleImageUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    ElMessage.error('图片大小不能超过 2MB')
    return
  }

  try {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await useFetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    form.value.image = data.value?.url
  } catch (error) {
    ElMessage.error('图片上传失败')
  }
}

// 表单验证
const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!form.value.name) {
    errors.value.name = '请输入商品名称'
    isValid = false
  }

  if (!form.value.category_id) {
    errors.value.category_id = '请选择商品分类'
    isValid = false
  }

  if (form.value.price <= 0) {
    errors.value.price = '请输入正确的商品价格'
    isValid = false
  }

  if (form.value.stock < 0) {
    errors.value.stock = '库存不能小于0'
    isValid = false
  }

  return isValid
}

// 保存草稿
const saveDraft = async () => {
  if (!validateForm()) return

  try {
    loading.value = true
    await productStore.addProduct({
      ...form.value,
      status: 'DRAFT'
    })
    ElMessage.success('保存成功')
    router.push('/admin/products')
  } catch (error) {
    ElMessage.error('保存失败')
  } finally {
    loading.value = false
  }
}

// 提交表单
const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    loading.value = true
    await productStore.addProduct({
      ...form.value,
      status: 'ACTIVE'
    })
    ElMessage.success('发布成功')
    router.push('/admin/products')
  } catch (error) {
    ElMessage.error('发布失败')
  } finally {
    loading.value = false
  }
}
</script>
