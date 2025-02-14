<template>
  <div class="max-w-[1400px] mx-auto p-5 ">
    <div v-show="isloading" class="w-full text-center mt-40 mb-40">
      <div class="loading loading-xl"></div>
    </div>
    <div v-show="!isloading" class="w-full flex flex-col md:flex-row">
      <div
        class="order-2 md:order-1 min-h-20 md:w-30 md:block grid grid-cols-5 gap-4 justify-items-center items-stretch md:items-start md:justify-items-start md:grid-cols-1 overflow-y-auto max-h-[90vh] pb-5">
        <div v-for="(item, index) in detailData?.cover.split(',')" :key="index"
          class="w-20 h-20 mt-5 rounded-md bg-center bg-cover cursor-pointer ring-2 ring-base-300"
          @click="changeImage(item)">
          <img :src="Product.getProductCover(item)" alt="图片">
        </div>
      </div>
      <div
        class="order-1 md:order-2 min-h-[300px] overflow-hidden md:min-h-[80vh] md:flex-1 max-h-[90vh] bg-cover bg-center rounded-2xl float-left">
        <img :src="Product.getProductCover(cover == '' ? detailData?.cover.split(',')[0] + '' : cover)" alt="图片">
      </div>
      <div class="order-3 md:flex-1  min-h-[200px]">
        <div class="m-7">
          <h2 class="text-2xl font-semibold">{{ detailData?.name }}</h2>
          <div class="text-xs opacity-50 mt-2">ID: {{ detailData?.id }}</div>
          <div class="divider"></div>
          <div class="text-sm"> {{ detailData?.info }}</div>
          <br>
          <div class="text-sm" v-show="detailData?.model">型号：{{ detailData?.model }}</div>
          <br>
          <div>剩余存货：<span class="text-xl font-semibold text-error">{{ detailData?.inventory }}</span></div>
          <div class="flex mt-5 gap-4 items-center">
            <div class="flex-1">价格：<span class="text-xl font-semibold text-primary">{{ detailData?.price }}元</span>
            </div>
            <div class="join">
              <button @click="quantity++" class="btn join-item btn-accent btn-sm">
                <Icon name="mingcute:up-fill" size="1.2rem"></Icon>
              </button>
              <div class="join-item btn btn-accent btn-sm">{{ quantity }}</div>
              <button @click="quantity <= 1 ? quantity : quantity--" class="btn join-item btn-sm btn-accent">
                <Icon name="mingcute:down-fill" size="1.2rem"></Icon>
              </button>
            </div>
            <button class="btn btn-primary" @click="btnAddCart">加入购物车</button>
          </div>
        </div>
      </div>
    </div>
    <div class="divider mt-6" v-show="reivewListTotal > 0"> 用户评价 </div>

    <div class="w-full">
      <!-- <div class="w-full flex justify-end pb-5">
        <form class="filter">
          <input class="btn btn-square" type="reset" value="×" />
          <input class="btn" type="radio" name="frameworks" aria-label="最新" />
          <input class="btn" type="radio" name="frameworks" aria-label="最旧" />
          <input class="btn" type="radio" name="frameworks" aria-label="最热" />
        </form>
      </div> -->

      <div>
        <div class="w-full text-center mt-10 mb-10" v-show="reviewIsloaing">
          <div class="loading"></div>
        </div>
        <div v-for="(item, index) in reviewListData" v-show="!reviewIsloaing"
          class="card w-full bg-base-300 shadow-xl mt-6 p-5 cursor-default scrollreveal-item">
          <div>
            <div class="avatar">
              <div class="w-8 rounded-xl bg-center bg-cover"
                :style="{ backgroundImage: `url(https://picsum.photos/64/64` }"></div>
            </div>
            <span class="text-sm opacity-50 h-full ml-3">{{ item.userId }}</span>
          </div>
          <p class="indent-7 p-3 mt-2">
            {{ item.content }}
          </p>
        </div>
      </div>
      <div v-show="reivewListTotal > reviewPageSize" class="w-full text-center mt-10 mb-20">
        <PaginationButton :current-page="reviewPageNum" :total-pages="Math.ceil(reivewListTotal / reviewPageSize)"
          @update:current-page="(n) => { reviewPageNum = n; initReviewData(); }">
        </PaginationButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'frontend'
})
import * as Product from '../../api/products'
import * as Review from '../../api/reviews'
let { id } = useRoute().params;
let cover: Ref<string> = ref('');
function changeImage(cover1: string) {
  cover.value = cover1
}
let detailData: Ref<Product.ProdoctDTO2 | undefined> = ref();
let isloading = ref(true);
let quantity = ref(1);
let reviewListData: Ref<Review.ReviewDTO[]> = ref([]);
let reviewPageSize = ref(15);
let reviewPageNum = ref(1);
let reivewListTotal = ref(15);
let reviewIsloaing = ref(true);
onMounted(() => {
  initData();
  initReviewData();
})
async function initReviewData() {
  reviewIsloaing.value = true;
  let { data } = await Review.listByProductID(id + '', reviewPageSize.value, reviewPageNum.value);
  reviewListData.value = data.data.records;
  reivewListTotal.value = data.data.total;
  reviewIsloaing.value = false;

}

async function initData() {
  isloading.value = true;
  let { data } = await Product.getProductInfo(id + '')
  detailData.value = data.data;
  isloading.value = false;
}

async function btnAddCart() {
  let { user } = useUserStore();
  let { addCart } = useCartStore();
  let { data } = await addCart({
    userId: user.value.id,
    productId: Number(detailData.value?.id),
    quantity: quantity.value,
  })
  if (data.code == 200) createToast(data.message, { type: 'success', style: 'soft', icon: 'mdi:success' })
  else createToast(data.message, { type: 'error', style: 'soft', icon: 'mdi:error' })


}
</script>