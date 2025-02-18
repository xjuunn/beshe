<template>
  <div class="max-w-[1400px] mx-auto p-5">
    <div v-for="(item, index) in listData" :key="item.order.id"
      class="card w-full max-w-[600px] mt-5 bg-base-content/90 shadow-lg rounded-lg p-6 mx-auto scrollreveal-item">
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold text-base-200">订单号：#{{ item.order.id }}</h3>
        <span class="badge" :class="{
          'badge-success': item.order.status === 1 || item.order.status === 6,
          'badge-error': item.order.status === 2 || item.order.status === 3,
          'badge-warning': item.order.status === 4,
          'badge-accent': item.order.status === 5,
        }">{{ Order.OrderStatusArr[item.order.status] }}</span>
      </div>
      <div class="mt-3 text-base-100">
        <p class="line-clamp-1"><b>商品：{{ item.products[0].name }}</b></p>
        <p class="line-clamp-1">信息：{{ item.products[0].info }}</p>
      </div>
      <div class="flex text-base-100">
        <div class="max-w-40">商品价格：{{ item.products[0].price }}</div>
        <div v-show="item.products[0].model">商品型号：{{ item.products[0].model }}</div>
      </div>
      <div class="mt-1 text-base-200/50">
        <p>下单时间：{{ new Date(item.order.createTime).toLocaleString() }}</p>
        <p>收货地址：{{ user.address }}</p>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <div>
          <span class="text-base-200/50">总金额：</span>
          <span class="text-xl font-semibold text-primary">￥{{ item.order.totalPrice }}</span>
        </div>
        <div class="join">
          <button class="btn btn-sm join-item btn-error"
            v-show="item.order.status === 1 && Date.now() - new Date(item.order.createTime).getTime() <= 1800000"
            @click="btnCancel(item)">取消订单</button>
          <button class="btn btn-sm join-item btn-error"
            v-show="item.order.status === 1 && Date.now() - new Date(item.order.createTime).getTime() > 1800000"
            @click="btntvho(item)">申请退货</button>
          <button class="btn btn-sm join-item btn-primary" @click="showOrderDetail(); reviewid = item.products[0].id"
            v-show="item.order.status !== 0">评价</button>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <div v-show="isShoModal" @click="closeModal"
        class="inset-0 z-51 w-screen h-screen bg-black/60 flex items-center justify-center fixed top-0">
        <div @click.stop="() => { }" class="card bg-base-100 w-full max-w-xl p-5">
          <div class="font-semibold text-lg">
            订单号:#123123
            <div class="mt-5">
              <textarea v-model="reviewStr" class="textarea w-full max-h-[300px] focus:outline-none"
                placeholder="请输入评价"></textarea>
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
    <ModalVue title="" :show="isShowConfirm" @update:show="(e) => { isShowConfirm = e }">
      <template #body>
        <div class="m-5">{{ confirmstr }}</div>
      </template>
      <template #bottom>
        <div class="join">
          <button class="btn btn-sm btn-ghost join-item" @click="isShowConfirm = false;">取消</button>
          <button class="btn btn-sm btn-primary join-item" @click="isShowConfirm = false; callOk1()">确定</button>
        </div>
      </template>
    </ModalVue>
  </div>
</template>

<script lang="ts" setup>
useThemeStore().setNavBlur(true);
definePageMeta({
  layout: "frontend",
});
import * as Order from '../../api/order'
import * as Review from '../../api/reviews'
let isShoModal = ref(false);
let rating = ref(0);
let isShowConfirm = ref(false);
let confirmstr = ref('');
let reviewStr = ref('');
let reviewid = -1;
function showOrderDetail() {
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
async function submit() {
  if (rating.value == 0) {
    createToast("请输入评分", { style: 'soft', type: 'error', icon: 'mdi:error' })
    return;
  }
  let { data } = await Review.add({
    content: reviewStr.value,
    productId: reviewid,
    rating: rating.value,
    userId: user.value.id,
  })
  if (data.code == 200) {
    createToast(data.message, { style: 'soft', type: 'success', icon: 'mdi:success' })
    initList();
  } else {
    createToast(data.message, { style: 'soft', type: 'error', icon: 'mdi:error' })
  }

  closeModal();
}


let searchValue = ref({
  pageSize: 15,
  pageNum: 1,
})
let listData: Ref<Order.OrderDTO[]> = ref([]);
let listTotal: Ref<number> = ref(15);
let isloading = ref(true);
let { user } = useUserStore();
onMounted(() => {
  initList();
})

async function initList() {
  isloading.value = true;
  let { data } = await Order.listPage(searchValue.value.pageSize, searchValue.value.pageNum);
  listData.value = data.data.records;
  listTotal.value = data.data.total;
  isloading.value = false;
}
function btnCancel(order: Order.OrderDTO) {
  showConfirm("是否要取消订单", () => setOrderStatus(order, 5))
}
function btntvho(order: Order.OrderDTO) {
  showConfirm("是否要申请退货", () => setOrderStatus(order, 3))
}
let callOk1: () => void
function showConfirm(msg: string, callOk: () => void) {
  confirmstr.value = msg;
  isShowConfirm.value = true;
  callOk1 = callOk;
}

async function setOrderStatus(order: Order.OrderDTO, status: number) {
  let { data } = await Order.updateOrder(order.order.id, { status, totalPrice: order.order.totalPrice, userId: user.value.id });
  if (data.code == 200) {
    createToast(data.message, { style: 'soft', type: 'success', icon: 'mdi:success' })
    initList();
  } else {
    createToast(data.message, { style: 'soft', type: 'error', icon: 'mdi:error' })
  }
}


</script>
