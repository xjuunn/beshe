<template>
  <div class="overflow-x-auto scrollbar-hidden h-[calc(100vh-64px)] table-pin-cols">
    <title>商品列表</title>
    <!-- 搜索 -->
    <div class="p-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-4 gap-3 sticky left-0">
      <label class="floating-label">
        <span>商品名</span>
        <input v-model="searchValue.name" type="text" placeholder="商品名" class="input" />
      </label>
      <div class="join">
        <button @click="btnReset" class="btn btn-ghost">重置</button>
        <button @click="btnSearch" class="btn btn-primary">搜索</button>
        <button @click="navigateTo('/admin/products/add')" class="btn btn-accent">新增商品</button>
      </div>

    </div>
    <!-- 列表 -->
    <table class="table table-pin-rows table-zebra z-1">
      <!-- 表头 -->
      <thead>
        <tr>
          <td>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </td>
          <td>图片</td>
          <th class="min-w-20">商品</th>
          <td>描述</td>
          <td>型号</td>
          <td>分类</td>
          <td>价格</td>
          <td>库存</td>
          <td>更新时间</td>
          <td class="min-w-[220px]">操作</td>
        </tr>
      </thead>
      <tbody>
        <!-- 行 -->
        <tr v-show="!isloading" v-for="(item, index) in listdata" :key="item.id">
          <td>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </td>
          <td>
            <div class="avatar">
              <div class="h-12 w-12 overflow-hidden">
                <img :src="Product.getProductCover(item.cover)" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
          </td>
          <th>
            <div class="font-bold line-clamp-2">{{ item.name }}</div>
            <div class="text-sm opacity-50">ID: {{ item.id }}</div>
          </th>
          <td class="">
            <div class="line-clamp-3">
              {{ item.info }}
            </div>
          </td>
          <td>{{ item.model }}</td>
          <td>{{ categoryMap.get(Number(item.category)) }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.inventory }}</td>
          <td>{{ item.updateTime }}</td>
          <td>
            <div class="join">
              <button class="btn btn-sm btn-primary join-item"
                @click="navigateTo('/admin/products/' + item.id)">修改</button>
              <button class="btn btn-sm btn-error join-item" onclick="del_dialog.showModal()"
                @click="deleteId = Number(item.id)">删除</button>
              <button class="btn btn-accent btn-sm join-item"
                @click="isShowUpdateModal = true; updatelimitQuantity = 0; updatelimitTimeframe = 'daily'; updateValue = item">添加限购</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-show="isloading" class="w-full text-center mt-10">
      <div class="loading"></div>
    </div>
    <div class="text-center mt-10 mb-20">
      <PaginationButton :current-page="searchValue.pageNum" :total-pages="Math.ceil(listtotal / searchValue.pageSize)"
        @update:current-page="(e: number) => { searchValue.pageNum = e; initList() }">
      </PaginationButton>
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

    <ModalVue title="修改限购信息" v-model:show="isShowUpdateModal">
      <template #body>
        <div class="p-4">
          <div class="text-sm opacity-80 flex justify-between">
            <span>
              商品ID: &nbsp;&nbsp;{{ updateValue?.id }}
            </span>
          </div>
          <div class="mt-3">
            <img :src="Product.getProductCover(updateValue?.cover + '')" alt="商品图片">
            商品名称: {{ updateValue?.name }}
            <p class="mt-3">
              商品信息: <span class="text-sm opacity-80 ml-3">
                {{ updateValue?.info }}
              </span>
            </p>
            <div class="mt-3 flex justify-between text-sm">
              <span>价格: {{ updateValue?.price }}</span>
              <span>型号: {{ updateValue?.model }}</span>
            </div>
          </div>
          <div class="divider"> 限购信息 </div>
          <div class="p-2 flex gap-3">
            <div class="dropdown">
              <div tabindex="0" role="button" class="btn"
                :class="{ 'bg-primary': updatelimitTimeframe == 'daily', 'bg-accent': updatelimitTimeframe == 'monthly', 'bg-ghost': updatelimitTimeframe == 'daily' }">
                {{ updatelimitTimeframe == 'daily' ? '当日限购' : updatelimitTimeframe == 'monthly' ? '当月限购' :
                  '保留设置' }}
              </div>
              <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
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
          <button class="btn join-item btn-primary btn-md" @click="isShowUpdateModal = false; btnAddLimit()">添加</button>
        </div>
      </template>
    </ModalVue>

  </div>
</template>

<script setup lang="ts">
import * as Product from '../../../api/products';
import * as Limit from '../../../api/limitProduct'
import * as Categorie from '../../../api/categories'
//#region 主体
definePageMeta({
  layout: 'admin'
})
useBreadcrumbsStore().setBreadcrumbs([
  { name: '仪表盘', path: '/admin' },
  { name: '商品列表', path: '/admin/products' }
]);
let isloading = ref(true);
let listdata: Ref<Product.ProdoctDTO2[]> = ref([]);
let listtotal = ref(15);
let searchValue: Ref<Product.SearchProduct> = ref({ pageNum: 1, pageSize: 15 });
let deleteId = ref(-1);
let updatelimitQuantity = ref(0);
let updatelimitTimeframe: Ref<"monthly" | "daily"> = ref("daily");
let isShowUpdateModal = ref(false);
let updateValue: Ref<Product.ProdoctDTO2 | undefined> = ref()
let categoryMap: Ref<Map<number, string>> = ref(new Map());
onMounted(async () => {
  initList();
  initCategorie();
})
async function initCategorie() {
  let { data } = await Categorie.getList();
  for (let index = 0; index < data.data.length; index++) {
    const element = data.data[index];
    categoryMap.value.set(element.id, element.name);
  }
}
async function initList() {
  isloading.value = true;
  let { data } = await Product.getProducts2(searchValue.value)
  listdata.value = data.data.records;
  listtotal.value = data.data.total;
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

async function btnAddLimit() {
  let id = updateValue.value?.id;
  if (id == undefined) {
    return;
  }
  let { data } = await Limit.add(id, updatelimitQuantity.value, updatelimitTimeframe.value)
  if (data.code == 200) {
    createToast(data.message, { type: 'success', style: 'soft', icon: 'mdi:success' })
    initList();
  } else {
    createToast(data.message, { type: 'error', style: 'soft', icon: 'mdi:error' })
  }

}

</script>
