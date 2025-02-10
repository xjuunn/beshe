<template>
  <div class="overflow-x-auto scrollbar-hidden h-[calc(100vh-64px)] table-pin-cols">
    <!-- 列表 -->
    <table class="table table-pin-rows table-sm table-zebra z-1">
      <!-- 表头 -->
      <thead>
        <tr>
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
            <b class="truncate font-bold">{{ item.product == undefined ? '无信息' : item.product.name }}</b>
            <div class="line-clamp-2 opacity-80">{{ item.product == undefined ? '无信息' : item.product.info }}</div>
          </td>
          <td class="">{{ Order.OrderStatusArr[item.order.status] }}</td>
          <td> {{ item.order.totalPrice }} </td>
          <td>{{ item.order.createTime }}</td>
          <td>
            <div class="join">
              <button class="btn btn-sm btn-primary">修改</button>
              <button class="btn btn-sm btn-error" onclick="del_dialog.showModal()">删除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex items-center justify-center pt-9 pb-20">
      <div class="join">
        <button class="join-item btn">1</button>
        <button class="join-item btn">2</button>
        <button class="join-item btn btn-disabled">...</button>
        <button class="join-item btn">99</button>
        <button class="join-item btn">100</button>
      </div>
    </div>

    <dialog id="del_dialog" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="text-lg font-bold">删除用户</h3>
        <p class="py-4">是否要删除id为 1 的用户</p>
        <div class="modal-action">
          <button class="btn btn-ghost" onclick="del_dialog.close()">取消</button>
          <button class="btn btn-error" onclick="del_dialog.close()"
            @click="createToast('删除成功', { icon: 'ep--success-filled' })">删除</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <!-- <ModalVue title="Modal标题" v-model:show="showModal">
      <template #body>
        Modal内容
      </template>
<template #bottom>
        <button class="btn btn-primary">确定</button>
      </template>
</ModalVue> -->
    <ModalVue v-model:show="showModal" title="这是一个 Modal">
      <template #body>
        <p>这是 Modal 的内容。</p>
      </template>
      <template #bottom>
        <button class="btn" @click="showModal = false">关闭</button>
      </template>
    </ModalVue>
    <button class="btn btn-primary" @click="showModal = !showModal">显示</button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
import * as Order from '../../../api/order'
let listdata: Ref<Order.OrderDTO[]> = ref([])
let showModal = ref(false);
onMounted(() => {
  initList();
})
let pageSize = ref(15);
let pageNum = ref(1);
let isloading = ref(true);
async function initList() {
  isloading.value = true;
  let { data } = await Order.listPage(pageSize.value, pageNum.value);
  listdata.value = data.data.records;
  console.log(listdata.value);
  isloading.value = false;


}

</script>
