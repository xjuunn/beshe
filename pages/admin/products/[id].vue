<template>
  <div class="p-4 mb-20">
    <div class="flex flex-col items-center w-full mt-5" v-show="!isloading">
      <div class="h-[300px] rounded-2xl overflow-hidden relative">
        <img class="h-full " :src="coverurl" alt="图片">
        <div class="absolute bottom-2 right-2">
          <button class="btn btn-error" @click="btnDeleteCover">删除</button>
        </div>
      </div>
      <div class="w-[400px] grid gap-4 grid-cols-5 mt-3">
        <div v-for="(item, index) in (productInfo.cover + '').split(',')" :key="index"
          class="w-20 h-20  overflow-hidden cursor-pointer" @click="changeCover(item)">
          <img :src="Product.getProductCover(item)" alt="图片">
        </div>
        <div class="w-20 h-20 border-2 rounded-2xl flex items-center justify-center btn" @click="btnAddCover">
          <Icon name="charm:plus" size="10em"></Icon>
          <input type="file" ref="fileinputelement" hidden @change="onAddCover">
        </div>
      </div>
      <div class="w-80">
        <div class="floating-label w-full mt-5">
          <span>商品名</span>
          <input v-model="productInfo.name" type="text" class="input input-primary w-full" placeholder="商品名">
        </div>
        <ClientOnly>
          <div class="floating-label w-full mt-5">
            <span>商品信息</span>
            <textarea v-model="productInfo.info"
              class="p-3 scrollbar-thin min-h-20 w-full whitespace-pre-wrap textarea textarea-ghost focus:outline-0"> </textarea>
          </div>
        </ClientOnly>
        <div class="floating-label w-full mt-5">
          <span>型号</span>
          <input v-model="productInfo.model" type="text" class="input input-primary w-full" placeholder="型号">
        </div>
        <div class="floating-label w-full mt-5">
          <span>价格（元）</span>
          <input v-model="productInfo.price" type="number" class="input input-primary w-full" placeholder="价格">
        </div>
        <div class="floating-label w-full mt-5">
          <span>库存</span>
          <input v-model="productInfo.inventory" type="number" class="input input-primary w-full" placeholder="库存">
        </div>
        <div class="floating-label w-full mt-5">
          <span>分类</span>
          <input v-model="productInfo.category" type="number" class="input input-primary w-full" placeholder="分类">
        </div>
        <div class="mt-7 flex justify-between">
          <button class="w-32 btn btn-outline btn-info" @click="navigateTo('/admin/products')">取消</button>
          <button class="w-32 btn btn-primary" @click="btnUpdate()">修改</button>
        </div>
      </div>
    </div>
    <div class="w-full text-center mt-10" v-show="isloading">
      <div class="loading "></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin'
})
import * as Product from '../../../api/products'
let id: number = Number(useRoute().params.id);
let productInfo: Ref<Product.ProductDTO> = ref({})
let isloading = ref(true);
let coverurl = ref('');
let fileinputelement = ref();
onMounted(async () => {
  initData();
})

async function initData() {
  isloading.value = true;
  let { data } = await Product.getProductInfo(id);
  productInfo.value = data.data;
  isloading.value = false;
  coverurl.value = Product.getProductCover(productInfo.value.cover + '');
}

async function btnUpdate() {
  let { data } = await Product.updateProduct(id, productInfo.value)
  createToast(data.message)
  if (data.code == 200) {
    navigateTo('/admin/products')
  }
}

function changeCover(name: string) {
  coverurl.value = Product.getProductCover(name);
}

function btnAddCover() {
  fileinputelement.value.click();
}

async function onAddCover(event: Event) {
  let target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    let { data } = await Product.addImage(id, target.files[0]);
    createToast(data.message)
    initData();
  }
}

async function btnDeleteCover() {
  let { data } = await Product.deleteImage(id, coverurl.value.split('/').slice(-1)[0]);
  createToast(data.message);
  initData();

}


</script>