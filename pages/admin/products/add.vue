<template>
  <div class="flex flex-col items-center justify-center w-full mt-20 gap-4">
    <title>添加商品</title>
    <div ref="dropzone"
      class="w-80 h-52 rounded-2xl p-4 border flex items-center justify-center border-dashed cursor-pointer overflow-hidden"
      @click="btnFileInput">
      <img v-show="imgurl" :src="imgurl" alt="img">
      <span v-show="imgurl === ''">图片</span>
      <input type="file" ref="fileElement" @change="addChange" multiple hidden>
    </div>
    <div class="w-80 grid grid-cols-5 gap-2">
      <div v-for="(item, index) in urls" :key="index" class="w-14 h-14 rounded-xl overflow-hidden">
        <img :src="item" alt="图片">
      </div>
    </div>
    <div class="floating-label">
      <span>商品名称</span>
      <input v-model="name" type="text" class="input input-info w-80" placeholder="商品名称">
    </div>
    <div class="floating-label">
      <span>商品信息</span>
      <input v-model="info" type="text" class="input input-info w-80" placeholder="商品信息"></input>
    </div>
    <div class="floating-label">
      <span>商品型号</span>
      <input v-model="model" type="text" class="input input-info w-80" placeholder="商品型号"></input>
    </div>
    <div class="floating-label">
      <span>价格</span>
      <input v-model="pricel" type="number" class="input input-info w-80" placeholder="价格"></input>
    </div>
    <div class="floating-label">
      <span>库存</span>
      <input v-model="invetory" type="number" class="input input-info w-80" placeholder="库存"></input>
    </div>
    <div class="floating-label">
      <span>分类</span>
      <input v-model="category" type="number" class="input input-info w-80" placeholder="分类"></input>
    </div>
    <div class="text-error">{{ log }}</div>
    <button class="btn btn-primary btn-outline" @click="reset">重置</button>
    <button class="btn btn-primary" @click="send">上传</button>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin'
})
useBreadcrumbsStore().setBreadcrumbs([
  {name: '仪表盘', path: '/admin'},
  {name: '商品列表', path: '/admin/products'},
  {name: '添加商品'},
]);
import * as Product from '../../../api/products';
import { useDropZone } from '@vueuse/core'
let dropzone = ref<HTMLElement>();
let imgurl = ref('');
let productdata: Product.ProductDTO = {
  category: 0,
  inventory: 0,
  model: '',
  price: 2.0,
  name: '',
  info: ''
};
let log = ref('')
let name = ref('');
let info = ref('');
let model = ref('');
let pricel = ref('');
let invetory = ref('');
let category = ref('');
let fileElement = ref();
let urls: Ref<string[]> = ref([])
function onDrop(files: File[] | null) {
  if (files) {
    imgurl.value = URL.createObjectURL(files[0]);
    if (productdata.cover === undefined) productdata.cover = [];
    // productdata.cover?.push(files[0]);
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      productdata.cover.push(element);
    }
    updateUrlList();
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
  if (name.value == '') {
    log.value = '请输入商品名称'
    return;
  }
  if (info.value == '') {
    log.value = '请输入商品信息'
    return;
  }
  if (model.value == '') {
    log.value = '请输入商品型号'
    return;
  }
  if (pricel.value == '') {
    log.value = '请输入价格'
    return;
  }
  if (invetory.value == '') {
    log.value = '请输入库存'
    return;
  }
  if (category.value == '') {
    log.value = '请输入分类'
    return;
  }
  if (productdata.cover == undefined || productdata.cover?.length == 0) {
    log.value = '请上传图片';
    return;
  }



  productdata.name = name.value;
  productdata.info = info.value;
  productdata.category = Number(category.value);
  productdata.inventory = Number(invetory.value);
  productdata.price = Number(pricel.value);
  productdata.model = model.value;
  let { data } = await Product.addProduct(productdata);
  if (data.code == 200) {
    productdata.cover = [];
  }
  createToast(data.message);
}
function btnFileInput() {
  fileElement.value.click();
}
function addChange(event: Event) {
  let target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    imgurl.value = URL.createObjectURL(target.files[0])
    if (productdata.cover === undefined) productdata.cover = [];
    // productdata.cover?.push(target.files[0]);
    for (let index = 0; index < target.files.length; index++) {
      const element = target.files[index];
      productdata.cover.push(element)
    }
    updateUrlList();
  }
}

function updateUrlList() {
  if (productdata.cover) {
    urls.value = [];
    for (let index = 0; index < productdata.cover.length; index++) {
      const element = productdata.cover[index];
      urls.value.push(URL.createObjectURL(element));
    }
  }
}

function reset() {
  urls.value = [];
  log.value = '';
  name.value = '';
  info.value = '';
  model.value = '';
  pricel.value = '';
  invetory.value = '';
  category.value = '';
  fileElement.value = '';
  productdata = {
    category: 110,
    inventory: 3000,
    model: '',
    price: 2.0,
    name: '',
    info: ''
  }
  imgurl.value = '';
}
</script>
