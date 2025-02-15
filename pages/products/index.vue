<template>
  <div class="min-h-[calc(100vh-204px)] pe-4 pl-4">
    <div class="w-full max-w-[1400px] mx-auto">
      <div class="flex flex-col sm:flex-row gap-3 mt-10">
        <label class="input w-full min-w-[200px] max-w-md">
          <Icon name="ic-round-search" size="20"></Icon>
          <input v-model="searchstr" type="text" placeholder="搜索商品" class="input input-bordered focus:outline-0" />
        </label>
        <div class="filter">
          <input class="btn filter-reset" type="radio" name="type" aria-label="全部" />
          <input class="btn" type="radio" name="type" aria-label="学习用品" />
          <input class="btn" type="radio" name="type" aria-label="生活用品" />
          <input class="btn" type="radio" name="type" aria-label="日用品" />

        </div>
      </div>
      <div class="mt-5">
        <ProductList :search="searchstr"></ProductList>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
useThemeStore().setNavBlur(true);
definePageMeta({
  layout: "frontend"
})
let searchstr = ref('')
let { search } = useRoute().query;
onMounted(() => {
  searchstr.value = search + ''
})
</script>