<template>
  <div>
    <div class="flex flex-col items-center m-5">
      <div class="banner w-full max-w-[1400px] aspect-[2460/900] rounded-2xl relative">
        <div class="text-black absolute bottom-2 left-5 md:left-10 md:bottom-10 w-[40%] h-[40%]">
          <div class="text-[1rem] md:text-[2em] font-bold">人气商品 大促销</div>
          <div class="text-[1em] md:text-[2em] font-bold">节省高达 30%</div>
          <i class="text-[0.8em] font-thin">*活动仅限本周!*</i>
        </div>
      </div>
      <div class="w-full max-w-[1400px] mt-5">
        <div class="text-xl"><b>热门分类</b></div>
        <div class="grid grid-cols-3 sm:grid-cols-6 mt-3 gap-3">
          <div v-for="item in 6" class="card w-full shadow-xl bg-base-200 text-center p-3 cursor-pointer">
            <div class="text-2xl">🖊️</div>
            <span class="text-sm mt-1">学习用品</span>
          </div>
        </div>

        <div class="text-xl mt-3"><b>推荐商品</b></div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-3">
          <div @click="() => { navigateTo('/products/' + item) }" v-for="item in 20"
            class="flex flex-col max-w-sm scrollreveal-item cursor-pointer">
            <div class="flex flex-col gap-2 p-4 bg-base-200 rounded-t-box">
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

        <div class="text-center m-5">
          <div class="join">
            <button class="join-item btn">1</button>
            <button class="join-item btn">2</button>
            <button class="join-item btn btn-disabled">...</button>
            <button class="join-item btn">99</button>
            <button class="join-item btn">100</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { setNavBlur } = useThemeStore();
setNavBlur(true);
definePageMeta({
  layout: "frontend"
});
</script>
<style scoped lang="css">
.banner {
  background-image: url("assets/imgs/banner1.png");
  background-size: cover;
}
</style>
