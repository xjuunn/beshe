<template>
  <div class="max-w-[1400px] mx-auto p-5">
    <div v-for="item in 20" :key="item"
      class="card w-full max-w-[600px] mt-5 bg-base-content/90 shadow-lg rounded-lg p-6 mx-auto scrollreveal-item">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold text-base-200">订单号：#12345</h3>
        <span class="badge badge-success">已发货</span>
      </div>
      <div class="mt-4 text-base-200/50">
        <p>下单时间：2025年1月16日 14:30</p>
        <p>收货地址：北京市朝阳区</p>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <div>
          <span class="text-base-200/50">总金额：</span>
          <span class="text-xl font-semibold text-primary">￥199.99</span>
        </div>
        <button class="btn btn-primary" @click="showOrderDetail(item)">
          评价
        </button>
      </div>
    </div>
    <Teleport to="body">
      <div v-show="isShoModal" @click="closeModal"
        class="inset-0 z-51 w-screen h-screen bg-black/60 flex items-center justify-center fixed top-0">
        <div @click.stop="() => { }" class="card bg-base-100 w-full max-w-xl p-5">
          <div class="font-semibold text-lg">
            订单号:#123123
            <div class="mt-5">
              <textarea class="textarea w-full max-h-[300px] focus:outline-none" placeholder="请输入评价"></textarea>
            </div>
            <div class="flex justify-between mt-4">
              <div class="text-sm">
                评分：
                <div class="rating rating-sm rating-half">
                  <input type="radio" name="rating-11" class="rating-hidden" v-model="rating" />
                  <input type="radio" name="rating-11" class="mask mask-star-2 mask-half-1 bg-orange-400"
                    @click="() => { rating = 0.5 }" aria-label="0.5 star" />
                  <input type="radio" name="rating-11" class="mask mask-star-2 mask-half-2 bg-orange-400"
                    @click="() => { rating = 1 }" aria-label="1 star" />
                  <input type="radio" name="rating-11" class="mask mask-star-2 mask-half-1 bg-orange-400"
                    @click="() => { rating = 1.5 }" aria-label="1.5 star" />
                  <input type="radio" name="rating-11" class="mask mask-star-2 mask-half-2 bg-orange-400"
                    @click="() => { rating = 2 }" aria-label="2 star" />
                  <input type="radio" name="rating-11" class="mask mask-star-2 mask-half-1 bg-orange-400"
                    @click="() => { rating = 2.5 }" aria-label="2.5 star" />
                  <input type="radio" name="rating-11" class="mask mask-star-2 mask-half-2 bg-orange-400"
                    @click="() => { rating = 3 }" aria-label="3 star" />
                  <input type="radio" name="rating-11" class="mask mask-star-2 mask-half-1 bg-orange-400"
                    @click="() => { rating = 3.5 }" aria-label="3.5 star" />
                  <input type="radio" name="rating-11" class="mask mask-star-2 mask-half-2 bg-orange-400"
                    @click="() => { rating = 4 }" aria-label="4 star" />
                  <input type="radio" name="rating-11" class="mask mask-star-2 mask-half-1 bg-orange-400"
                    @click="() => { rating = 4.5 }" aria-label="4.5 star" />
                  <input type="radio" name="rating-11" class="mask mask-star-2 mask-half-2 bg-orange-400"
                    @click="() => { rating = 5 }" aria-label="5 star" />
                </div>
                <span class="ml-3 text-sm">{{ rating }}分</span>
              </div>
              <button class="btn btn-primary btn-sm" @click="submit">提交</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
useThemeStore().setNavBlur(true);
definePageMeta({
  layout: "frontend",
});
let isShoModal = ref(false);
let rating = ref(0);
function showOrderDetail(id: number) {
  isShoModal.value = true;
  document.body.style.overflowY = 'hidden';
}
function closeModal() {
  isShoModal.value = false;
  document.body.style.overflowY = "";
}

onBeforeUnmount(() => {
  document.body.style.overflowY = "";
});
function submit() {
  console.log(rating.value);

  closeModal();
}
</script>
