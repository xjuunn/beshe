<template>
  <div class="flex items-center justify-center h-full">
    <div
      class="stats w-full scrollbar-hidden stats-vertical lg:stats-vertical xl:stats-horizontal">
      <div class="stat">
        <div class="stat-figure figure text-accent">
          <Icon name="solar:layers-bold-duotone" size="3rem"></Icon>
        </div>
        <div class="stat-title">本月销售量</div>
        <div class="stat-value">{{ totalQuantitySold }}</div>
        <div class="stat-desc">{{ new Date().getFullYear() + '年' + (new Date().getMonth() + 1) }}月1日 - 现在</div>
      </div>

      <div class="stat">
        <div class="stat-figure text-accent">
          <Icon name="solar:wallet-money-bold-duotone" size="3rem"></Icon>
        </div>
        <div class="stat-title">本月收入</div>
        <div class="stat-value">{{ Math.ceil(totalRevenue) }} 元</div>
        <div class="stat-desc">
          <Icon name="solar:course-up-outline" size="1.1rem"></Icon> 11%
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
let totalQuantitySold = ref(0);
let totalRevenue = ref(0);
onMounted(() => {
  initData();
})

async function initData() {
  let { data } = await useAxios().get('/api/sales/stats/monthly-total');
  totalRevenue.value = data.data.totalRevenue;
  totalQuantitySold.value = data.data.totalQuantitySold;
}
</script>