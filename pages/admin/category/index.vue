<template>
  <div class="overflow-x-auto scrollbar-hidden h-[calc(100vh-64px)] table-pin-cols">
    <title>商品分类</title>
    <div v-show="!isloading" class="w-full flex flex-col">
      <table class="table w-full table-pin-rows z-1">
        <thead>
          <tr>
            <th class="w-10">ID</th>
            <th class="w-96">分类</th>
            <th class="w-40">排序</th>
            <th>
              <span>操作</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listdata" :key="item.id" :class="{ 'bg-base-200': updateindex == index }">
            <td>{{ item.id }}</td>
            <td>
              <span v-show="updateindex != index">{{ item.name }}</span>
              <input type="text" v-model="item.name" v-show="updateindex == index"
                class="input input-sm input-primary max-w-40">
            </td>
            <td>
              <span v-show="updateindex != index">{{ item.sort }}</span>
              <input type="number" v-model="item.sort" v-show="updateindex == index"
                class=" input input-sm input-primary max-w-40">
            </td>
            <td>
              <div class="join" v-show="updateindex == index">
                <button class="btn btn-ghost btn-sm join-item" @click="updateindex = -1; updateindex = -1;initList()">取消</button>
                <button class="btn btn-primary btn-sm join-item" @click="Category.update(item); updateindex = -1">保存
                </button>
              </div>
              <div class="join" v-show="updateindex != index">
                <button v-show="item.id > 9"
                  @click="Category.update({ ...item, sort: item.sort + 1 }); item.sort = item.sort + 1;"
                  class="btn btn-primary join-item btn-sm btn-soft">
                  <Icon name="mingcute-up-fill" size="1.2rem"></Icon>
                </button>
                <button v-show="item.id > 9"
                  @click="Category.update({ ...item, sort: item.sort >= 1 ? item.sort - 1 : 0 }); item.sort = item.sort > 1 ? item.sort - 1 : 1"
                  class="btn btn-primary join-item btn-sm btn-soft">
                  <Icon name="mingcute-down-fill" size="1.2rem"></Icon>
                </button>
                <button v-show="item.id > 9" @click="Category.del(item.id == undefined ? -1 : item.id); initList2();"
                  class="btn btn-error join-item btn-sm btn-soft">
                  <Icon name="material-symbols:delete" size="1.2rem"></Icon>
                </button>
                <button v-show="item.id >= 7" @click="updateindex = index;"
                  class="btn btn-accent join-item btn-sm btn-soft">
                  <Icon name="material-symbols:edit"></Icon>
                </button>
                <button v-show="item.id < 7" class="btn btn-error btn-sm" disabled>不可修改</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right p-5">
        <div class="join pt-1.5">
          <button class="btn btn-primary btn-xs join-item btn-soft" @click="initList()">
            <Icon name="material-symbols:refresh-rounded" size="1.2rem"></Icon>
            刷新
          </button>
          <button class="btn btn-primary btn-xs join-item btn-soft"
            @click="Category.add({ name: '未命名', sort: 10 }); initList2(); listdata.push({ name: '未命名', sort: 10 })">
            <Icon name="ic:round-plus" size="1.2rem"></Icon>
            添加
          </button>
        </div>
      </div>
    </div>
    <div class="w-full mt-10 text-center" v-show="isloading">
      <div class="loading"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin'
})
useBreadcrumbsStore().setBreadcrumbs([
  { name: '仪表盘', path: '/admin' },
  { name: '商品分类', path: '/admin/category' }
]);
import * as Category from '../../../api/categories'

let isloading = ref(true);
let listdata: Ref<Category.CategoryDTO[]> = ref([]);
let updateindex = ref(-1)
onMounted(() => {
  initList();
})

async function initList() {
  isloading.value = true;
  let { data } = await Category.getList();
  listdata.value = data.data;
  isloading.value = false;
}

function initList2() {
  setTimeout(() => {
    initList();
  }, 1000);
}

</script>
