<template>
  <div class="min-h-[calc(100vh-204px)] pe-4 pl-4">
    <div class="w-full max-w-[1400px] mx-auto">
      <div class="flex flex-col sm:flex-row gap-3 mt-10">
        <label class="input w-full min-w-[200px] max-w-md">
          <Icon name="ic-round-search" size="20"></Icon>
          <input type="text" placeholder="搜索商品" class="input input-bordered focus:outline-0" />
        </label>
        <div class="filter">
          <input class="btn filter-reset" type="radio" name="type" aria-label="全部" />
          <input class="btn" type="radio" name="type" aria-label="学习用品" />
          <input class="btn" type="radio" name="type" aria-label="生活用品" />
          <input class="btn" type="radio" name="type" aria-label="日用品" />

        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-4">
        <div @click="() => { navigateTo('/products/'+item) }" v-for="item in 20" class="flex flex-col max-w-sm scrollreveal-item">
          <div class="flex flex-col gap-2 p-4 bg-base-300 rounded-t-box">
            <h1 class="font-bold text-xl line-clamp-1">无印良品 MUJI 自动泡沫洗手机 智能感应 洗手液自动感应器</h1>
            <span class="line-clamp-2">智能感应 洗手液自动感应器 无印良品 MUJI 自动泡沫洗手机</span>
          </div>
          <div class="bg-center w-full h-40"
            :style="{ backgroundImage: `url(https://picsum.photos/400/300?seed=${item})` }"></div>
          <div class="flex justify-between bg-neutral text-neutral-content p-4 rounded-b-box">
            <span class="font-bold text-xl">129元</span>
            <a class="btn btn-primary btn-sm" @click.stop="() => { }">添加购物车</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
useThemeStore().setNavBlur(true);
definePageMeta({
  layout: "frontend"
})
</script>