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
        <a class="tab tab-bordered" :class="{ 'tab-active': 'products' === 'products' }"
           @click="null">商品收藏</a>
        <a class="tab tab-bordered" :class="{ 'tab-active': 'products' === 'shops' }"
           @click="null">店铺收藏</a>
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm">共 test 个收藏</span>
        <button class="btn btn-sm btn-error" @click="null">
          批量删除
        </button>
      </div>
    </div>

    <!-- 收藏商品列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="item in 20" :key="item" 
           class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
        <figure class="relative">
          <img :src="item+''" :alt="item+''" class="h-[200px] w-full object-cover" />
          <button class="btn btn-circle btn-sm absolute top-2 right-2 btn-ghost"
                  @click="null">
            <span class="text-red-500">❤️</span>
          </button>
        </figure>
        <div class="card-body">
          <h2 class="card-title text-base">test</h2>
          <p class="text-primary font-bold">¥test</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary btn-sm">加入购物车</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div class="text-center py-16">
      <div class="text-4xl mb-4">🤍</div>
      <p class="text-gray-500">暂无收藏商品</p>
      <button class="btn btn-primary mt-4">去逛逛</button>
    </div>

    <!-- 删除确认弹窗 -->
    <dialog class="modal" :class="{ 'modal-open': false }">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg">确认删除</h3>
        <p class="py-4">确定要删除选中的收藏商品吗？此操作不可恢复。</p>
        <div class="modal-action">
          <button class="btn" @click="null">取消</button>
          <button class="btn btn-error" @click="null">确认删除</button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'frontend'
})
</script> 