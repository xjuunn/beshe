<template>
  <div class="flex flex-col items-center justify-center w-full h-screen gap-4">
    <div ref="dropzone" class="w-80 h-44 rounded-2xl p-4 border flex items-center justify-center border-dashed">
      <img v-show="imgurl" :src="imgurl" alt="img">
      <span v-show="imgurl === ''">图片</span>
    </div>
    <input v-model="name" type="text" class="input input-info w-80" placeholder="商品名称">
    <input v-model="info" type="text" class="input input-info w-80" placeholder="商品信息"></input>
    <button class="btn btn-primary" @click="send">上传</button>
  </div>
</template>

<script lang="ts" setup>
import * as Product from '../api/products';
import { useDropZone } from '@vueuse/core'
let dropzone = ref<HTMLElement>();
let imgurl = ref('');
let productdata: Product.ProductDTO = {
  category: 110,
  inventory: 3000,
  model: '',
  price: 2.0,
  name: '',
  info: ''
};
let name = ref('');
let info = ref('');
function onDrop(files: File[] | null) {
  if (files) {
    imgurl.value = URL.createObjectURL(files[0]);
    if (productdata.cover === undefined) productdata.cover = [];
    productdata.cover?.push(files[0]);
  }
}
onMounted(() => {
  const { isOverDropZone } = useDropZone(dropzone, {
    onDrop,
    dataTypes: ['image/jpeg', 'image/png', 'image/webp'],
    multiple: true,
    preventDefaultForUnhandled: false,
  });

})

async function send() {
  productdata.name = name.value;
  productdata.info = info.value;
  console.log(productdata);
  let { data } = await Product.addProduct(productdata);
  console.log(data);
  productdata.cover = [];


}

</script>
