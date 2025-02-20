<template>
  <div class="bg-base-200 w-full h-full">
    <div class="bg-base-100 w-full h-full rounded-2xl">
      <div class="p-1 md:p-3 w-full grid grid-cols-12 gap-3 auto-rows-auto">
        <title>仪表盘</title>
        <div class="shadow-lg bg-base-300 rounded-2xl p-3 col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-8">
          <DashboardD1></DashboardD1>
        </div>
        <div
          class="shadow-lg bg-base-300 rounded-2xl p-3 col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4 overflow-hidden">
          <DashboardD2></DashboardD2>
        </div>
        <div class="shadow-lg bg-base-300 rounded-2xl p-3 col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-5">
          <DashboardD3></DashboardD3>
        </div>
        <div class="shadow-lg bg-base-300 rounded-2xl p-3 col-span-12 xl:col-span-7">
          <DashboardD4></DashboardD4>
        </div>
      </div>
      <div class="charts pr-1 pl-1 md:pr-3 md:pl-3 grid grid-cols-12 gap-3">
        <div class="bg-base-300 p-3 shadow-lg rounded-2xl col-span-12 xl:col-span-7">
          <DashboardChart2></DashboardChart2>
        </div>
        <div class="bg-base-300 p-3 shadow-lg rounded-2xl col-span-12 xl:col-span-5">
          <DashboardChart1></DashboardChart1>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin'
})

</script>