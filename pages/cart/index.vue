<template>
  <div class="max-w-[1400px] mx-auto p-5">
    <div class="text-center">
      <h3 class="text-2xl font-semibold">购物车</h3>
    </div>
    <div v-for="item in 20"
      class="card sm:card-side w-full max-w-[1000px] shadow-lg rounded-lg p-3 mx-auto bg-base-200 mb-5 scrollreveal-item">
      <div class="h-30 sm:h-inherit min-w-[130px] rounded-md bg-cover bg-center" :style="`background-image:url(https://picsum.photos/400/300?seed=${item})`">
      </div>
      <div class="card-body p-0 ps-3">
        <div>
          <h2 class="text-lg font-semibold line-clamp-1">无印良品 MUJI 自动泡沫洗手机 智能感应 洗手液自动感应器</h2>
          <p class="line-clamp-1">详细信息:智能感应 洗手液自动感应器</p>
          <p class="line-clamp-1">型号：无印良品 MUJI 自动泡沫洗手机</p>

          <div class="flex mt-2">
            <div class="flex-1">
              <span>金额: </span>
              <span class="text-xl font-semibold text-primary me-4">¥199.99</span>
              <p class="text-base-content/50 text-xs">下单时间：2025年1月16日 14:30</p>
            </div>
            <div class="card-actions justify-end flex items-end pe-2">
              <button class="btn btn-info btn-sm" @click="() => { navigateTo('/products/' + item) }">商品详情</button>
              <button class="btn btn-primary btn-sm" @click="() => { }">下单</button>
            </div>
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
