<template>
  <div class="min-h-[calc(100vh-204px)] pe-4 pl-4">
    <div
      class="lg:pl-10 lg:pe-10 2xl:pl-16 2xl:pe-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      <div v-for="(item, index) in listdata" :key="item.id">
        <ProductCard :data="item"></ProductCard>
      </div>
    </div>
    <div v-show="isloading" class="w-full mt-20 mb-20 text-center">
      <div class="loading loading-lg"></div>
    </div>
    <div class="w-full text-center mt-10 mb-20">
      <PaginationButton :current-page="searchValue.pageNum" :total-pages="Math.ceil(listtotal / searchValue.pageSize)"
        @update:current-page="(n: number) => { searchValue.pageNum = n; initList() }"></PaginationButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as Product from '../../api/products';
let props = defineProps(['search', 'category'])
let listdata: Ref<Product.ProdoctDTO2[]> = ref([]);
let searchValue: Ref<Product.SearchProduct> = ref({
  pageNum: 1, pageSize: 15, name: props.search ?? '', category: props.category ?? 0,
});
let listtotal: Ref<number> = ref(searchValue.value.pageSize);
let isloading = ref(true);
let timer: any = null;
watch(() => props.search + props.category, () => {
  searchValue.value.name = props.search
  searchValue.value.category = props.category;
  if (timer == null) {
    timer = setTimeout(() => {
      initList();
      timer = null;
    }, 500);
  }
})
onMounted(() => {
  initList();
})

async function initList() {
  isloading.value = true;
  if (searchValue.value.name) {
    let { data } = await Product.getProducts2(searchValue.value)
    listtotal.value = data.data.total;
    listdata.value = data.data.records;
  } else if (Number(searchValue.value.category) > 0) {
    let { data } = await Product.listProductByCategory(searchValue.value.category ?? 1, searchValue.value.pageNum, searchValue.value.pageSize);
    listtotal.value = data.data.total;
    listdata.value = data.data.records;
  } else {
    let { data } = await Product.getProducts2(searchValue.value)
    listtotal.value = data.data.total;
    listdata.value = data.data.records;
  }

  isloading.value = false;
}
</script>
