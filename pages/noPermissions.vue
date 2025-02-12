<template>
  <div class="flex items-center justify-center flex-col w-full h-screen">
    <Icon name="mingcute:safe-flash-fill" class="mt-[-80px] animate-pulse" size="7rem" style="color: #4F46E5;"></Icon>
    <div class="font-bold text-4xl text-center mt-5">
      无权访问当前页面
    </div>
    <div class="text-lg text-center opacity-70 mt-3">
      你没有权限访问此页面，请检查权限设置或返回。
    </div>
    <div class="mt-8">
      <button @click="navigateTo('/')"
        class="btn btn-soft px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        返回
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>
