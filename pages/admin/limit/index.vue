<template>
  <div>
    <title>限购管理</title>
    <table v-show="!isloading" class="table table-md table-zebra table-pin-rows table-pin-cols">
      <thead>
        <tr>
          <th>商品ID</th>
          <td>商品名称</td>
          <td>价格</td>
          <td>商品信息</td>
          <td>商品型号</td>
          <td>库存</td>
          <td>限购数量</td>
          <td>截止时间</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listdata" :key="item.productId">
          <th>{{ item.productId }}</th>
          <td class="max-w-80 truncate">{{ item.productName }}</td>
          <td class="text-center">{{ item.productPrice }}</td>
          <td class="max-w-80 truncate">{{ item.productInfo }}</td>
          <td>{{ item.productModel === '' ? '无型号' : item.productModel }}</td>
          <td>{{ item.inventory }}</td>
          <td class="text-center">{{ item.limitQuantity }}</td>
          <td>{{ item.endDate }}</td>
          <td class="min-w-24">
            <button class="btn btn-sm btn-primary btn-soft"
              @click="isShowUpdateModal = true; updateValue = Object.assign({}, item); updatelimitQuantity = item.limitQuantity; updatelimitTimeframe = ''">修改</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-show="isloading" class="w-full text-center mt-10">
      <div class="loading"></div>
    </div>
    <div class="text-center mt-10 mb-10" v-show="Math.ceil(total / pageSize) > 1">
      <PaginationButton :current-page="pageNum" :total-pages="Math.ceil(total / pageSize)"
        @update:current-page="(n: number) => { pageNum = n; initList() }"></PaginationButton>
    </div>
    <ModalVue title="修改限购信息" v-model:show="isShowUpdateModal">
      <template #body>
        <div class="p-4">
          <div class="text-sm opacity-80 flex justify-between">
            <span>
              商品ID: &nbsp;&nbsp;{{ updateValue?.productId }}
            </span>
          </div>
          <div class="mt-3">
            <img :src="Product.getProductCover(updateValue?.productCover + '')" alt="商品图片">
            商品名称: {{ updateValue?.productName }}
            <p class="mt-3">
              商品信息: <span class="text-sm opacity-80 ml-3">
                {{ updateValue?.productInfo }}
              </span>
            </p>
            <div class="mt-3 flex justify-between text-sm">
              <span>价格: {{ updateValue?.productPrice }}</span>
              <span>型号: {{ updateValue?.productModel }}</span>
            </div>
          </div>
          <div class="divider"> 限购信息 </div>
          <div class="p-2 flex gap-3">
            <div class="dropdown">
              <div tabindex="0" role="button" class="btn"
                :class="{ 'bg-primary': updatelimitTimeframe == 'daily', 'bg-accent': updatelimitTimeframe == 'monthly', 'bg-ghost': updatelimitTimeframe == '' }">
                {{ updatelimitTimeframe == 'daily' ? '当日限购' : updatelimitTimeframe == 'monthly' ? '当月限购' : '保留设置' }}
              </div>
              <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li><a @click="updatelimitTimeframe = ''">不设置</a></li>
                <li><a @click="updatelimitTimeframe = 'daily'">当日限购</a></li>
                <li><a @click="updatelimitTimeframe = 'monthly'">当月限购</a></li>
              </ul>
            </div>
            <div class="floating-label">
              <span>限购数量</span>
              <input v-model="updatelimitQuantity" class="input input-primary" type="number" placeholder="限购数量">
            </div>
          </div>

        </div>
      </template>
      <template #bottom>
        <div class="join">
          <button class="btn join-item btn-ghost btn-md" @click="isShowUpdateModal = false;">取消</button>
          <button class="btn join-item btn-primary btn-md" @click="isShowUpdateModal = false; btnUpdate()">修改</button>
        </div>
      </template>
    </ModalVue>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
import * as Limit from '../../../api/limitProduct'
import * as Product from '../../../api/products'

useBreadcrumbsStore().setBreadcrumbs([
  { name: '仪表盘', path: '/admin' },
  { name: '限购管理', path: '/admin/limit' }
])
let listdata: Ref<Limit.limitProductDTO[]> = ref([])
let pageSize = ref(15);
let pageNum = ref(1);
let isloading = ref(true);
let total = ref(0);
let isShowUpdateModal = ref(false);
let updateValue: Ref<Limit.limitProductDTO | undefined> = ref()
let updatelimitQuantity = ref(0);
let updatelimitTimeframe: Ref<"monthly" | "daily" | ''> = ref("");

onMounted(() => {
  initList();
})

async function initList() {
  isloading.value = true;
  let { data } = await Limit.list(pageSize.value, pageNum.value);
  listdata.value = data.data.records;
  total.value = data.data.total;
  isloading.value = false;
}

async function btnUpdate() {
  let frame = updatelimitTimeframe.value;
  if (frame == '') frame = 'daily'
  let { data } = await Limit.update(updateValue.value?.productId ?? -1, updatelimitQuantity.value, frame);
  if (data.code == 200) {
    initList();
    createToast(data.message, { style: 'soft', type: 'success', icon: 'mdi:success' })
  } else {
    createToast(data.message, { style: 'soft', type: 'error', icon: 'mdi:error' })

  }


}

</script>
