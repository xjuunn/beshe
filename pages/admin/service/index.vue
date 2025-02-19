<template>
  <div class="overflow-x-auto scrollbar-hidden h-[calc(100vh-64px)] table-pin-cols">
    <title>退款和售后</title>
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
        <tr v-for="(item, index) in listData" :key="item.order.id">
          <td>
            {{ item.order.id }}
          </td>
          <th>
            <div class="font-bold">{{ item.user?.username }}</div>
            <div class="text-sm opacity-50">ID: {{ item.user?.id }}</div>
          </th>
          <td>
            <p class="line-clamp-1">{{ item.user?.address }}</p>
          </td>
          <td>
            {{ item.user?.phone }}
          </td>
          <td class="max-w-52">
            <b class="font-bold line-clamp-1">{{ item.products.length == 0 ? '无信息' : item.products[0].name }}</b>
            <div class="line-clamp-2 opacity-80">{{ item.products.length == 0 ? '无信息' : item.products[0]?.info }}</div>
          </td>
          <td class="">{{ Order.OrderStatusArr[item.order.status] }}</td>
          <td> {{ item.order.totalPrice }} </td>
          <td>{{ item.order.createTime }}</td>
          <td>
            <div class="join">
              <button class="btn btn-soft btn-sm btn-primary" @click="">
                <Icon name="majesticons-open" size="1.2rem"></Icon>
                查看
              </button>
              <button class="btn btn-soft btn-sm btn-error" onclick="del_dialog.showModal()" @click="">
                <Icon name="material-symbols:delete" size="1.2rem"></Icon>
                删除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin'
})
useBreadcrumbsStore().setBreadcrumbs([
  { name: '仪表盘', path: '/admin' },
  { name: '退款和售后', path: '/admin/service' }
]);
import * as Order from '../../../api/order';
let listData: Ref<Order.OrderDTO[]> = ref([]);
let isloading = ref(true);
let listTotal = ref(15);
let searchValue = ref({
  pageSize: 15,
  pageNum: 1,
})
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
</script>
