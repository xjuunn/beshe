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
        <div class="mt-10 mb-20">
          <ProductList></ProductList>
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
