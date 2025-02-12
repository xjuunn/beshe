<template>
  <div class="overflow-x-auto scrollbar-hidden h-[calc(100vh-64px)] table-pin-cols">
    <title>订单列表</title>
    <table class="table table-pin-rows table-sm table-zebra z-1" v-show="!isloading">
      <!-- 表头 -->
      <thead>
        <tr>
          <th>ID</th>
          <th>用户</th>
          <td>地址</td>
          <td>手机号</td>
          <td>商品</td>
          <td>订单状态</td>
          <td>金额</td>
          <td>创建时间</td>
          <td class="min-w-[120px]">操作</td>
        </tr>
      </thead>
      <tbody>
        <!-- 行 -->
        <tr v-for="(item, index) in listdata" :key="item.order.id">
          <td>
            {{ item.order.id }}
          </td>
          <th>
            <div class="font-bold">{{ item.user.username }}</div>
            <div class="text-sm opacity-50">ID: {{ item.user.id }}</div>
          </th>
          <td>
            {{ item.user.address }}
          </td>
          <td>
            {{ item.user.phone }}
          </td>
          <td class="max-w-52">
            <b class="font-bold line-clamp-1">{{ item.product == undefined ? '无信息' : item.product.name }}</b>
            <div class="line-clamp-2 opacity-80">{{ item.product == undefined ? '无信息' : item.product.info }}</div>
          </td>
          <td class="">{{ Order.OrderStatusArr[item.order.status] }}</td>
          <td> {{ item.order.totalPrice }} </td>
          <td>{{ item.order.createTime }}</td>
          <td>
            <div class="join">
              <button class="btn btn-soft btn-sm btn-primary" @click="showInfo(item)">
                <Icon name="majesticons-open" size="1.2rem"></Icon>
                查看
              </button>
              <button class="btn btn-soft btn-sm btn-error" onclick="del_dialog.showModal()"
                @click="deleteOrderId = item.order.id">
                <Icon name="material-symbols:delete" size="1.2rem"></Icon>
                删除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-show="!isloading" class="flex items-center justify-center pt-9 pb-20">
      <PaginationButton :total-pages="Math.ceil(total / pageSize)" :current-page="pageNum"
        @update:current-page="updatePageNum">
      </PaginationButton>
    </div>
    <div class="w-full text-center mt-10" v-show="isloading">
      <div class="loading"></div>
    </div>
    <dialog id="del_dialog" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="text-lg font-bold">删除订单</h3>
        <p class="py-4">是否要删除id为 {{ deleteOrderId }} 的订单</p>
        <div class="modal-action">
          <button class="btn btn-ghost" onclick="del_dialog.close()">取消</button>
          <button class="btn btn-error" onclick="del_dialog.close()" @click="btnDelete">删除</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <ModalVue title="订单详情" v-model:show="isShowInfoModal">
      <template #body>
        <div class="p-4">
          <div class="text-sm opacity-80 flex justify-between">
            <span>
              ID:{{ orderInfo?.order.id }}
              创建时间: {{ orderInfo?.order.createTime }}
            </span>
            <span>
              订单状态:
              {{ Order.OrderStatusArr[orderInfo?.order.status == undefined ? 0 : orderInfo.order.status] }}
            </span>
          </div>
          <div class="mt-3">
            <img :src="Product.getProductCover(orderInfo?.product.cover + '')" alt="">
            商品名称: {{ orderInfo?.product?.name }} <span class="text-sm ml-3">ID: {{ orderInfo?.product?.id }}</span>
            <p class="mt-3">
              商品信息: <span class="text-sm opacity-80 ml-3">
                {{ orderInfo?.product?.info }}
              </span>
            </p>
            <div class="mt-3 flex justify-between text-sm">
              <span>价格: {{ orderInfo?.order?.totalPrice }}</span>
              <span>型号: {{ orderInfo?.product?.model }}</span>
            </div>
          </div>
          <div class="divider"> 用户信息 </div>
          <div class="mt-3 text-sm p-3">
            <div class="flex">
              <div class="flex flex-col gap-3 flex-1">
                <div>用户名: {{ orderInfo?.user?.username }}</div>
                <div>订单地址: {{ orderInfo?.user?.address }}</div>
                <div>电话: {{ orderInfo?.user?.phone }}</div>
                <div>邮箱: {{ orderInfo?.user?.email }}</div>
              </div>
              <div>
                <div class="avatar">
                  <div class="w-20 rounded">
                    <img :src="User.getUserCover(orderInfo?.user?.avatar + '')" alt="头像">
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </template>
      <template #bottom>
        <button class="btn btn-ghost" @click="isShowInfoModal = false">关闭</button>
      </template>
    </ModalVue>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
useBreadcrumbsStore().setBreadcrumbs([
  {name: '仪表盘', path: '/admin'},
  {name: '订单列表', path: '/admin/order'}
]);
import * as Order from '../../../api/order'
import * as Product from '../../../api/products'
import * as User from '../../../api/user'
let listdata: Ref<Order.OrderDTO[]> = ref([])
let deleteOrderId = ref(-1)
let isShowInfoModal = ref(false);
let orderInfo: Ref<Order.OrderDTO | undefined> = ref()
onMounted(() => {
  initList();
})
let pageSize = ref(15);
let pageNum = ref(1);
let isloading = ref(true);
let total = ref(0)
async function initList() {
  isloading.value = true;
  let { data } = await Order.listPage(pageSize.value, pageNum.value);
  listdata.value = data.data.records;
  total.value = data.data.total;
  isloading.value = false;
}
async function btnDelete() {
  let { data } = await Order.del(deleteOrderId.value);
  if (data.code == 200) {
    createToast(data.message, { icon: 'ep--success-filled', type: 'success' })
    initList();
  } else {
    createToast(data.message, { icon: 'ep--error-filled', type: 'error' })
  }
}

function updatePageNum(num: number) {
  pageNum.value = num;
  initList();
}

function showInfo(order: Order.OrderDTO) {
  orderInfo.value = order;
  isShowInfoModal.value = true;
}
</script>
