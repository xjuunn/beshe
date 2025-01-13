<template>
  <div class="flex justify-center h-[90vh] bg-cover ">
    <div class="hero">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <img src="/assets/imgs/open.png" class="max-w-sm rounded-lg" />
        <div>
          <div class="flex flex-col items-center text-center gap-6 max-w-xl">
            <span class="text-sm text-secondary">限时优惠专区，抢购倒计时！</span>
            <h1 class="text-5xl font-bold">欢迎来到 <span
                class="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{{ appName }}</span>
            </h1>
            <span>
              足不出校，购遍所需，{{ appName }}让生活更简单、更精彩！
            </span>
            <div class="flex gap-3 lg:w-full">
              <a class="btn btn-primary">
                注册账号
              </a>
              <a class="btn btn-neutral border-secondary text-secondary">
                立即抢购
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="h-full w-full p-3 pt-10 xl:pl-40 xl:pe-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
    <div class="card rounded-sm shadow-sm bg-base-200" v-for="item in 32">
      <figure
        class="h-72 rounded-sm bg-no-repeat bg-[url(https://m.media-amazon.com/images/I/51LRHbIL4uL.jpg)] bg-cover">
        <br>
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          Card Title
          <div class="badge badge-secondary">NEW</div>
        </h2>
        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
        <div class="card-actions justify-end">
          <div class="badge badge-outline">Fashion</div>
          <div class="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full text-center mt-10">
    <div class="join">
      <button class="join-item btn">1</button>
      <button class="join-item btn">2</button>
      <button class="join-item btn">3</button>
      <button class="join-item btn">...</button>
      <button class="join-item btn">99</button>
      <button class="join-item btn">100</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'frontend'
})
const { appName } = useAppStore();

</script>
