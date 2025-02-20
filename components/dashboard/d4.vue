<template>
  <div class="h-full">
    <div class="text-center text-md opacity-60">
      <NuxtLink to="/admin/inventory">库存警告</NuxtLink>
    </div>
    <div v-show="listdata.length == 0" class="w-full h-full opacity-60 flex items-center justify-center p-4">
      <Icon name="solar:archive-check-bold-duotone" size="3rem"></Icon>
    </div>
    <table class="table" v-show="listdata.length > 0">
      <thead>
        <tr>
          <td>ID</td>
          <td>图片</td>
          <td>商品</td>
          <td>信息</td>
          <td>库存</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listdata" :key="item.id">
          <td>
            <div>{{ item.id }}</div>
          </td>
          <td>
            <div class="avatar w-10 h-10 overflow-hidden">
              <img :src="Product.getProductCover(item.cover)" alt="图片">
            </div>
          </td>
          <td>
            <div class="line-clamp-1">{{ item.name }}</div>
          </td>
          <td>
            <div class="line-clamp-1">{{ item.info }}</div>
          </td>
          <td class="text-error">
            <div>{{ item.inventory }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import * as Product from '../../api/products'
onMounted(() => {
  initList();
})
let listdata: Ref<Product.ProdoctDTO2[]> = ref([]);
async function initList() {
  let { data } = await Product.lowInventory();
  for (let index = 0; index < 4; index++) {
    if (data.data.length <= index) break;
    const item = data.data[index];
    listdata.value.push(item)

  }
}

</script>
