<template>
  <div class="min-h-[calc(100vh-204px)] pe-4 pl-4">
    <div class="w-full max-w-[1400px] mx-auto">
      <div class="flex flex-col sm:flex-row gap-3 mt-10">
        <label class="input w-full min-w-[200px] max-w-md">
          <Icon name="ic-round-search" size="20"></Icon>
          <input v-model="searchstr" type="text" placeholder="搜索商品" class="input input-bordered focus:outline-0" />
        </label>
        <div class="filter">
          <input class="btn filter-reset" @click="categoryid = -1" type="radio" name="type" aria-label="全部" />
          <input v-for="(item, index) in categoryList" class="btn" type="radio" name="type"
            @click="categoryid = item.id ?? -1" :aria-label="item.name" />
        </div>
      </div>
      <div class="mt-5">
        <ProductList :search="searchstr" :category="categoryid"></ProductList>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
useThemeStore().setNavBlur(true);
definePageMeta({
  layout: "frontend"
})
import * as Category from '../../api/categories';
let searchstr = ref('')
let { search, category } = useRoute().query;
let categoryid = ref(-1);
let categoryList: Ref<Category.CategoryDTO[]> = ref([]);
onMounted(() => {
  if (search) searchstr.value = search + '';
  if (category) categoryid.value = Number(category);
  initCategory();
})
async function initCategory() {
  let { data } = await Category.getList();
  categoryList.value = data.data;
}

</script>