<template>
  <div class="p-1 md:p-3 w-full grid md:grid-cols-2 2xl:grid-cols-3 gap-3 auto-rows-auto">
    <title>仪表盘</title>
    <div class="bg-base-300 rounded-2xl p-3 md:col-span-2">
      <DashboardD1Vue></DashboardD1Vue>
    </div>
    <div class=" bg-base-300 rounded-2xl p-3">2</div>
    <div class=" bg-base-300 rounded-2xl p-3">3</div>
    <div class=" bg-base-300 rounded-2xl p-3">4</div>
    <div class=" bg-base-300 rounded-2xl p-3">5</div>
    <div class=" bg-base-300 rounded-2xl p-3">6</div>
    <div class=" bg-base-300 rounded-2xl p-3">7</div>
    <div class=" bg-base-300 rounded-2xl p-3">8</div>
    <div class=" bg-base-300 rounded-2xl p-3">9</div>
    <div class=" bg-base-300 rounded-2xl p-3">10</div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin'
})

</script>