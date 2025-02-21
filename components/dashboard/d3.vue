<template>
  <div class="text-center opacity-60">
      最新评价
    </div>
  <div class="p-3 max-h-[300px] w-full overflow-y-scroll scrollbar-thin">
    
    <div v-for="(item, index) in listdata" class="chat mb-3 chat-start" :key="item.id">
      <div class="chat-image avatar">
        <div class="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" :src="User.getUserCover(item.avatar)" />
        </div>
      </div>
      <div class="chat-header">
        {{ item.username }}
        <time class="text-xs opacity-50">{{ new Date(item.createTime).toLocaleString() }}</time>
      </div>
      <div class="chat-bubble bg-base-100">
        {{ item.content }}
      </div>
      <div class="chat-footer opacity-50">{{ item.rating }}分评价</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as Review from '../../api/reviews';
import * as User from '../../api/user';
let listdata: Ref<Review.ReviewAndUserInfo[]> = ref([]);
onMounted(() => {
  initList()
})
async function initList() {
  let { data } = await Review.listNewReview();
  listdata.value = data.data

}
</script>