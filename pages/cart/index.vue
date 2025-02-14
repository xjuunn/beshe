<template>
  <div class="max-w-[1400px] mx-auto p-5">
    <div class="text-center m-5">
      <h3 class="text-2xl font-semibold">购物车</h3>
    </div>
    <div v-for="(item, index) in listdata" :key="item.id"
      class="card sm:card-side w-full max-w-[1000px] shadow-lg rounded-lg p-3 mx-auto bg-base-300 mb-5 scrollreveal-item">
      <div
        class="h-30 sm:h-inherit min-w-[130px] rounded-md bg-cover bg-center overflow-hidden flex items-center justify-center">
        <img class="h-full" :src="Product.getProductCover((item.products?.cover + '').split(',')[0])" alt="图片">
      </div>
      <div class="card-body p-0 ps-3">
        <div>
          <h2 class="text-lg font-semibold line-clamp-1">{{ item.products?.name }} <span
              class="opacity-40 text-sm">ID:{{ item.id }}</span></h2>
          <p class="line-clamp-2">详细信息:&nbsp;&nbsp; {{ item.products?.info }}</p>
          <p class="line-clamp-1 mt-2" v-show="item.products?.model">型号: &nbsp;&nbsp; {{ item.products?.model }}</p>
          <div class="mt-1 flex items-center">
            <span>购买数量:&nbsp;&nbsp;</span>
            <div class="join">
              <button @click="item.quantity++; showSaveBtn[item.id + ''] = true" class="btn join-item btn-ghost btn-xs">
                <Icon name="mingcute:up-fill" size="1.2rem"></Icon>
              </button>
              <div class="btn join-item btn-xs btn-ghost">{{ item.quantity }}</div>
              <button @click="item.quantity <= 1 ? item.quantity : item.quantity--; showSaveBtn[item.id + ''] = true"
                class="btn join-item btn-xs btn-ghost">
                <Icon name="mingcute:down-fill" size="1.2rem"></Icon>
              </button>
              <button v-show="showSaveBtn[item.id + '']"
                @click="Cart.updateQuantity(item.id ?? -1, item.quantity); showSaveBtn[item.id + ''] = false"
                class="btn join-item btn-xs btn-ghost">
                <Icon name="material-symbols:save" size="1.2rem"></Icon> 保存
              </button>
            </div>
          </div>
          <div class="flex mt-2">
            <div class="flex-1">
              <span>金额: </span>
              <span class="text-xl font-semibold text-primary me-4">¥{{ (item.products?.price ?? 1) * item.quantity
                }}</span>
              <p class="text-base-content/50 text-xs"> {{ item.products?.createTime }}</p>
            </div>
            <div class="card-actions justify-end flex items-end pe-2">
              <div class="join">
                <button class="btn join-item btn-primary btn-sm"
                  @click="() => { showCreateOrderModal = true; orderitem = item }">下单</button>
                <button class="btn btn-info btn-sm join-item"
                  @click="() => { navigateTo('/products/' + item.productId) }">商品详情</button>
                <button class="btn btn-error btn-sm join-item" @click="btnDel(item.id)">删除</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalVue title="删除购物车" :show="showModal" @update:show="(e) => showModal = e">
      <template #body>
        <p class="m-3">
          是否要删除ID:{{ delId }}的购物车
        </p>
      </template>
      <template #bottom>
        <div class="join">
          <button class="btn btn-sm btn-ghost" @click="showModal = false">取消</button>
          <button class="btn btn-sm btn-error" @click="delCart">删除</button>
        </div>
      </template>
    </ModalVue>
    <ModalVue title="创建订单" :show="showCreateOrderModal" @update:show="(e) => { showCreateOrderModal = e }">
      <template #body>
        <div class="mt-2">
          <div class="w-full flex justify-center">
            <img class="w-[50%]" :src="Product.getProductCover((orderitem?.products?.cover ?? '').split(',')[0])"
              alt="图片">
          </div>
          <div class="m-3">
            <p class="font-bold">商品名称: &nbsp;&nbsp; {{ orderitem?.products?.name }}</p>
            <p class="mt-1">商品信息: &nbsp;&nbsp; {{ orderitem?.products?.info }}</p>
            <p v-show="orderitem?.products?.model" class="mt-1">型号: &nbsp;&nbsp; {{ orderitem?.products?.model }}</p>
            <p class="mt-1">价格:&nbsp;&nbsp;{{ orderitem?.products?.price ?? 1 }} &nbsp; * &nbsp; {{ orderitem?.quantity
              ?? 1 }} &nbsp; = &nbsp;{{ (orderitem?.products?.price ?? 1) * (orderitem?.quantity ?? 1) }}</p>
          </div>
        </div>
      </template>
      <template #bottom>
        <div class="join">
          <button @click="showCreateOrderModal = false;" class="btn btn-sm join-item btn-ghost">取消</button>
          <button @click="btnPay" class="btn btn-sm join-item btn-primary">支付</button>
        </div>
      </template>
    </ModalVue>
    <ModalVue title="支付信息" :show="showLoadingModal" @update:show="(e) => { showLoadingModal = e }">
      <template #body>
        <div v-show="!ordercreateresult" class="text-center m-10">
          <div class="loading loading-infinity loading-lg"></div>
        </div>
        <div v-show="ordercreateresult" class="font-bold text-2xl text-center m-10">
          {{ ordercreateresult }}
        </div>
      </template>
    </ModalVue>
  </div>
</template>

<script lang="ts" setup>
useThemeStore().setNavBlur(true);
definePageMeta({
  layout: "frontend"
})
import * as Cart from '../../api/cart';
import * as Product from '../../api/products';
import * as Order from '../../api/order';
import { useThemeStore } from '../../stores/useThemeStore';
let listdata: Ref<Cart.CartDTO[]> = ref([]);
let isloading = ref(true);
let showModal = ref(false);
let delId = ref(-1);
let showSaveBtn: Ref<any> = ref({})
let showCreateOrderModal = ref(false);
let orderitem: Ref<Cart.CartDTO | undefined> = ref();
let showLoadingModal = ref(false);
let ordercreateresult = ref('');
onMounted(() => {
  initList();
})

let { user } = useUserStore();
watch(() => user.value, () => {
  initList();
})

async function initList() {
  isloading.value = true;
  let { data } = await Cart.list(user.value.id)
  listdata.value = data.data;
  isloading.value = false;
}

function btnDel(id: string | number | undefined) {
  if (id == undefined) return;
  delId.value = Number(id);
  showModal.value = true;
}

async function delCart() {
  let { data } = await Cart.del(delId.value);
  showModal.value = false;
  if (data.code == 200) {
    createToast(data.message, { type: 'success', style: 'soft', icon: 'mdi:success' })
    initList();
  } else {
    createToast(data.message, { type: 'error', style: 'soft', icon: 'mdi:error' })
  }
}
async function btnPay() {
  showCreateOrderModal.value = false;
  ordercreateresult.value = '';
  showLoadingModal.value = true;
  let { data: data1 } = await Order.add({
    order: {
      userId: user.value.id,
      productId: orderitem.value?.id ?? -1,
      status: 1,
      totalPrice: (orderitem.value?.quantity ?? 1) * (orderitem.value?.products?.price ?? 1),
    },
    orderDetailsList: [
      {
        price: orderitem.value?.products?.price ?? 1,
        productId: orderitem.value?.products?.id ?? -1,
        quantity: orderitem.value?.quantity ?? 1
      }
    ]
  });
  let { data: data2 } = await Cart.del(orderitem.value?.id ?? -1);
  if (data2.code == 200) {
    initList();
  }

  showLoadingModal.value = true;
  ordercreateresult.value = data1.data;
  setTimeout(() => {
    showLoadingModal.value = false;
  }, 3000);

}
</script>
