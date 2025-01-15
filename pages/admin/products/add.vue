<template>
  <div>
    <!-- 页面标题 -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">添加商品</h1>
        <p class="opacity-60 mt-1">创建新的商品信息</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-ghost btn-sm">取消</button>
        <button class="btn btn-primary btn-sm">保存商品</button>
      </div>
    </div>

    <!-- 表单内容 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 左侧主要信息 -->
      <div class="lg:col-span-2 space-y-6">
        <div class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <h2 class="card-title">基本信息</h2>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">商品名称</span>
                <span class="label-text-alt text-error">*</span>
              </label>
              <input type="text" v-model="form.name" placeholder="请输入商品名称" 
                     class="input input-bordered w-full" />
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">商品分类</span>
                  <span class="label-text-alt text-error">*</span>
                </label>
                <select v-model="form.category" class="select select-bordered w-full">
                  <option disabled value="">请选择分类</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                  </option>
                </select>
              </div>
              
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">商品编号</span>
                </label>
                <input type="text" v-model="form.sku" placeholder="自动生成" 
                       class="input input-bordered w-full" disabled />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">销售价格</span>
                  <span class="label-text-alt text-error">*</span>
                </label>
                <label class="input-group">
                  <span>¥</span>
                  <input type="number" v-model="form.price" placeholder="0.00" 
                         class="input input-bordered w-full" />
                </label>
              </div>
              
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">原价</span>
                </label>
                <label class="input-group">
                  <span>¥</span>
                  <input type="number" v-model="form.originalPrice" placeholder="0.00" 
                         class="input input-bordered w-full" />
                </label>
              </div>
              
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">库存数量</span>
                  <span class="label-text-alt text-error">*</span>
                </label>
                <input type="number" v-model="form.stock" placeholder="0" 
                       class="input input-bordered w-full" />
              </div>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <h2 class="card-title">商品描述</h2>
            <div class="form-control">
              <label class="label">
                <span class="label-text">商品详情</span>
              </label>
              <textarea v-model="form.description" class="textarea textarea-bordered h-32" 
                        placeholder="请输入商品详情描述"></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧图片上传 -->
      <div class="space-y-6">
        <div class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <h2 class="card-title">商品主图</h2>
            <div class="border-2 border-dashed border-base-300 rounded-lg p-4">
              <div class="flex flex-col items-center justify-center gap-2">
                <div v-if="!form.image" class="text-center p-8">
                  <svg class="mx-auto h-12 w-12 text-base-300" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="mt-4">
                    <button class="btn btn-sm">
                      上传图片
                    </button>
                  </div>
                  <p class="mt-2 text-xs opacity-60">支持 JPG、PNG 格式，建议尺寸 800x800px</p>
                </div>
                <div v-else class="relative w-full">
                  <img :src="form.image" class="w-full rounded-lg" />
                  <button class="btn btn-sm btn-circle btn-error absolute top-2 right-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card bg-base-100 shadow-sm">
          <div class="card-body">
            <h2 class="card-title">商品状态</h2>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">立即上架</span>
                <input type="checkbox" v-model="form.isActive" class="toggle toggle-primary" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 页面元数据
definePageMeta({
  layout: 'admin'
})

// 商品分类
const categories = ref([
  { id: 1, name: '手机数码' },
  { id: 2, name: '电脑办公' },
  { id: 3, name: '家用电器' },
  { id: 4, name: '服装服饰' },
  { id: 5, name: '美妆护肤' },
  { id: 6, name: '运动户外' }
])

// 表单数据
const form = ref({
  name: '',
  category: '',
  sku: 'SP' + Date.now(),
  price: null,
  originalPrice: null,
  stock: 0,
  description: '',
  image: '',
  isActive: true
})

// 保存商品
const saveProduct = () => {
  // 表单验证和提交逻辑
  console.log('保存商品:', form.value)
}
</script>

<style scoped>
.form-control {
  margin-bottom: 1rem;
}

/* 输入框聚焦效果 */
.input:focus, .select:focus, .textarea:focus {
  outline: 2px solid hsl(var(--p) / 0.2);
  outline-offset: 2px;
}

/* 必填项标记样式 */
.label-text-alt.text-error {
  color: hsl(var(--er));
}
</style> 