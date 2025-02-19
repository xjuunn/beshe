<template>
  <div class="w-full flex items-center justify-center">
    <div
      class="stats stats-vertical sm:stats-vertical md:stats-horizontal lg:stats-vertical xl:stats-horizontal shadow w-full h-full">
      <div class="stat">
        <div class="stat-figure text-secondary">
          <div class="avatar online">
            <div class="w-16 rounded-full">
              <img v-show="user.avatar" :src="User.getUserCover(user.avatar)" />
            </div>
          </div>
        </div>
        <div class="stat-value text-2xl">欢迎管理员 &nbsp;{{ user.username }}</div>
        <div class="stat-title">{{ new Date().toLocaleDateString() }}</div>
        <div class="stat-desc text-secondary">
          <NuxtLink to="/admin/service" class="animate-pulse">{{ returnnum }} 条退货申请</NuxtLink>
        </div>
      </div>
      <div class="stat">
        <div class="stat-figure text-primary">
          <Icon name="solar:box-bold-duotone" size="3rem"></Icon>
        </div>
        <div class="stat-title">商品种类</div>
        <div class="stat-value text-primary">{{ productnum }}</div>
        <div class="stat-desc"><button @click="navigateTo('/admin/products/add')"
            class="btn btn-accent btn-xs btn-soft">新增商品</button></div>
      </div>
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            class="inline-block h-8 w-8 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div class="stat-title">用户访问量</div>
        <div class="stat-value text-secondary">{{ viewnum }}</div>
        <div class="stat-desc">从前端程序运行开始计数</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
let { user } = useUserStore();
import * as User from '../../api/user';
let returnnum = ref(0);
let productnum = ref(0);
let viewnum: Ref<string> = ref('')
let viewtimer: any = null;
onNuxtReady(() => {
  viewtimer = setInterval(() => {
    getViewNum();
  }, 1000);
})
onUnmounted(() => {
  clearInterval(viewtimer);
})
onMounted(() => {
  getOrder3();
  getProductNum();
  getViewNum();
})
async function getOrder3() {
  let { data } = await useAxios().get('/api/orders/user/status/page?pageNum=1&pageSize=0&status=3');
  returnnum.value = data.data.total;
}
async function getProductNum() {
  let { data } = await useAxios().get('/api/products/page');
  productnum.value = data.data.total;
}
async function getViewNum() {
  let data = await $fetch('/api/viewnum');
  viewnum.value = data?.toString() ?? '';

}
</script>
