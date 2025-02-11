<template>
  <div class="overflow-x-auto scrollbar-hidden h-[calc(100vh-64px)] table-pin-cols">
    <h2 v-show="userId || productId" class="text-2xl font-bold m-10 ml-5">
      <div v-show="userId">用户ID: {{ userId }} 的评论</div>
      <div v-show="productId">商品ID: {{ productId }}的评论</div>
    </h2>
    <table v-show="!isloading" class="table table-pin-rows table-zebra z-1">
      <!-- 表头 -->
      <thead>
        <tr>

          <th class="min-w-10">ID</th>
          <td>评论</td>
          <td>评分</td>
          <td>创建时间</td>
          <td class="min-w-[120px]">操作</td>
        </tr>
      </thead>
      <tbody>
        <!-- 行 -->
        <tr v-for="(item, index) in listdata" :key="index">
          <th>{{ item?.id }}</th>
          <td class="line-clamp-3">{{ item?.content }}</td>
          <td>{{ item?.rating }}</td>
          <td>{{ item?.createTime }}</td>
          <td>
            <div class="join">
              <button class="btn btn-sm btn-primary btn-soft" @click="btnShowInfo(item)">
                <Icon name="lets-icons:view-fill" size="1.2rem"></Icon>
                查看
              </button>
              <button class="btn btn-sm btn-error btn-soft" onclick="del_dialog.showModal()" @click="delid = item.id">
                <Icon name="material-symbols:delete" size="1.2rem"></Icon>删除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-show="isloading" class="text-center w-full mt-10">
      <div class="loading"></div>
    </div>
    <dialog id="del_dialog" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="text-lg font-bold">删除评论</h3>
        <p class="py-4">是否要删除id为 {{ delid }} 的评论</p>
        <div class="modal-action">
          <button class="btn btn-ghost" onclick="del_dialog.close()">取消</button>
          <button class="btn btn-error" onclick="del_dialog.close()" @click="btnDelete">删除</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>

    <ModalVue v-model:show="isShowReviewInfoModal" title="评论详情">
      <template #body>
        <div v-show="!isReviewInfoLoading" class="p-4">
          <div class="text-sm">
            <div class="flex">
              <div class="flex flex-1 flex-col gap-2">
                <div>商品ID: &nbsp;&nbsp;{{ reviewProduct?.id }}</div>
                <div>商品名称: &nbsp;&nbsp; {{ reviewProduct?.name }}</div>
                <div>价格: &nbsp;&nbsp; {{ reviewProduct?.price }}</div>
                <div class="line-clamp-3 mt-2">商品信息: &nbsp;&nbsp; {{ reviewProduct?.info }}</div>
              </div>
              <div class="avatar max-w-30">
                <img class="rounded-sm" :src="Product.getProductCover(reviewProduct?.cover + '')" alt="商品图片">
              </div>
            </div>
            <div>
              <div class="divider">评论</div>
              {{ reviewInfo?.content }}
              <div class="mt-3">
                评分: &nbsp;&nbsp;{{ reviewInfo?.rating }}
              </div>
            </div>
          </div>
        </div>
        <div v-show="isReviewInfoLoading" class="w-full mt-10 mb-10 text-center">
          <div class="loading"></div>
        </div>
      </template>
      <template #bottom>
        <button class="btn btn-ghost" @click="isShowReviewInfoModal = false">关闭</button>
      </template>
    </ModalVue>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
import * as Review from '../../../api/reviews'
import * as Product from '../../../api/products'
let { userId, productId } = useRoute().query
let listdata: Ref<Review.ReviewDTO[]> = ref([])
let isloading = ref(true);
let delid: Ref<number | undefined> = ref(-1);
let isShowReviewInfoModal = ref(false);
let reviewInfo: Ref<Review.ReviewDTO | undefined> = ref();
let reviewProduct: Ref<Product.ProdoctDTO2 | undefined> = ref();
let isReviewInfoLoading = ref(true);

onMounted(() => {
  initList();
})

async function initList() {
  isloading.value = true;
  if (userId !== undefined && userId !== null) {
    let { data } = await Review.listByUserID(userId + '', 200, 1);
    listdata.value = data.data.records;
  } else if (productId !== undefined) {
    let { data } = await Review.listByProductID(productId + '', 200, 1);
    listdata.value = data.data.records;
  } else {
    let { data } = await Review.list();
    listdata.value = data.data;
  }
  isloading.value = false;
}

async function btnDelete() {
  if (delid.value == undefined) return;
  let { data } = await Review.del(delid.value);
  if (data.code == 200) {
    createToast(data.message, { icon: 'ep--success-filled', type: 'success', style: 'soft' })
    initList();
  } else {
    createToast(data.message, { icon: 'ep--error-filled', type: 'error', style: 'soft' })
  }
}

async function btnShowInfo(review: Review.ReviewDTO) {
  reviewInfo.value = review;
  isShowReviewInfoModal.value = true;
  isReviewInfoLoading.value = true;
  let { data } = await Product.getProductInfo(review.productId);
  reviewProduct.value = data.data;
  isReviewInfoLoading.value = false;
}


</script>
