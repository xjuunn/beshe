<template>
  <div class="overflow-x-auto scrollbar-hidden h-[calc(100vh-64px)] table-pin-cols">
    <title>库存警告</title>
    <!-- 列表 -->
    <table class="table table-pin-rows table-zebra z-1">
      <!-- 表头 -->
      <thead>
        <tr>
          <td>图片</td>
          <th class="min-w-20">商品</th>
          <td>描述</td>
          <td>型号</td>
          <!-- <td>分类</td> -->
          <td>价格</td>
          <td>库存</td>
          <td>更新时间</td>
          <td class="min-w-[120px]">操作</td>
        </tr>
      </thead>
      <tbody>
        <!-- 行 -->
        <tr v-show="!isloading" v-for="(item, index) in listdata" :key="item.id">
          <td>
            <div class="avatar">
              <div class="h-12 w-12 overflow-hidden">
                <img :src="Product.getProductCover(item.cover)" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </td>
          <th>
            <div class="font-bold line-clamp-2 max-w-80">{{ item.name }}</div>
            <div class="text-sm opacity-50">ID: {{ item.id }}</div>
          </th>
          <td class="max-w-40 truncate">{{ item.info }}</td>
          <td>{{ item.model }}</td>
          <!-- <td class="line-clamp-1">{{ item.category }}</td> -->
          <td>{{ item.price }}</td>
          <td class="text-error">{{ item.inventory }}</td>
          <td>{{ item.updateTime }}</td>
          <td>
            <div class="join">
              <button class="btn btn-sm btn-primary" @click="navigateTo('/admin/products/' + item.id)">修改</button>
              <button class="btn btn-sm btn-error" onclick="del_dialog.showModal()"
                @click="deleteId = Number(item.id)">删除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-show="isloading" class="w-full text-center mt-10">
      <div class="loading"></div>
    </div>
    <div class="flex items-center justify-center pt-9 pb-20">
      <div class="join">
        <button v-for="(item, index) in pageNumList" :key="item" @click="searchValue.pageNum = item; initList();"
          class="join-item btn" :class="item == searchValue.pageNum ? 'btn-primary' : ''">{{ item }}</button>
      </div>
    </div>
    <dialog id="del_dialog" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="text-lg font-bold">删除用户</h3>
        <p class="py-4">是否要删除id为 {{ deleteId }} 的用户</p>
        <div class="modal-action">
          <button class="btn btn-ghost" onclick="del_dialog.close()">取消</button>
          <button class="btn btn-error" onclick="del_dialog.close()" @click="doDelete">删除</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import * as Product from '../../../api/products';
//#region 主体
definePageMeta({
  layout: 'admin'
})
useBreadcrumbsStore().setBreadcrumbs([
  {name: '仪表盘', path: '/admin'},
  {name: '库存预警', path: '/admin/inventory'}
]);
let isloading = ref(true);
let listdata: Ref<Product.ProdoctDTO2[]> = ref([]);
let listtotal = ref(15);
let searchValue: Ref<Product.SearchProduct> = ref({ pageNum: 1, pageSize: 15 });
let deleteId = ref(-1);
onMounted(async () => {
  initList();
})
async function initList() {
  isloading.value = true;
  let { data } = await Product.lowInventory()

  listdata.value = data.data;
  // listtotal.value = data.data.total;
  isloading.value = false;
}
function btnReset() {
  searchValue.value = { pageNum: 1, pageSize: 15 };
  initList();
}

function btnSearch() {
  initList();
}

async function doDelete() {
  let { data } = await Product.deleteProduct(deleteId.value);
  if (data.code == 200) {
    createToast(data.message, { icon: 'ep--success-filled' })
    initList();
  } else {
    createToast(data.message, { icon: 'ep--success-filled', type: 'error' })
  }
}
//#endregion

//#region 分页
let maxPageNum = computed(() => Math.ceil(listtotal.value / searchValue.value.pageSize))
let pageNumList = computed(() => {
  let list = [];
  for (let index = -3; index < 5; index++) {
    list.push(searchValue.value.pageNum + index)
  }
  return list.filter(item => item > 0 && item < maxPageNum.value);
})

//#endregion


</script>
