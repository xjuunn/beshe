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
      <form class="space-y-6">
        <!-- 基本信息 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="form-control">
            <label class="label">
              <span class="label-text">商品名称</span>
              <span class="label-text-alt text-error">*</span>
            </label>
            <input type="text" class="input input-bordered" :class="'input-error'"
              placeholder="请输入商品名称" required />
            <label class="label">
              <span class="label-text-alt text-error">test</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">商品分类</span>
              <span class="label-text-alt text-error">*</span>
            </label>
            <select class="select select-bordered" :class="'select-error'" required>
              <option value="">请选择分类</option>
              <option v-for="item in 20" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
            <label class="label">
              <span class="label-text-alt text-error">test</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">商品价格</span>
              <span class="label-text-alt text-error">*</span>
            </label>
            <div class="join">
              <span class="join-item flex items-center px-4 bg-base-200">¥</span>
              <input type="number" class="input input-bordered join-item" :class="'input-error'" placeholder="0.00"
                step="0.01" min="0" required />
            </div>
            <label class="label">
              <span class="label-text-alt text-error">test</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">库存数量</span>
              <span class="label-text-alt text-error">*</span>
            </label>
            <input type="number" class="input input-bordered" :class="'input-error'" placeholder="0" min="0" required />
            <label class="label">
              <span class="label-text-alt text-error">test</span>
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
              <img :src="'/images/default-product.png'" class="w-full h-full object-cover rounded-lg" alt="商品图片" />
              <input type="file" accept="image/*" @change="null" class="absolute inset-0 opacity-0 cursor-pointer" />
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
          <textarea class="textarea textarea-bordered h-32" :class="'textarea-error'" placeholder="请输入商品描述"></textarea>
          <label class="label">
            <span class="label-text-alt text-error">test</span>
          </label>
        </div>

        <!-- 提交按钮 -->
        <div class="flex justify-end gap-4">
          <button type="button" class="btn" @click="null">保存草稿</button>
          <button type="submit" class="btn btn-primary" :disabled="false">
            <span class="loading loading-spinner loading-sm" v-if="false"></span>
            发布商品
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
