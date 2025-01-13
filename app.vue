<template>
  <div id="app-content" class="select-none relative overflow-x-hidden scrollbar-thin">
    <NuxtLayout @toTop="toTop">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
function toTop() {
  let appContent = document.getElementById('app-content');

  appContent?.scrollTo({
    top: 0,
    behavior: "smooth" // 平滑滚动
  })

}
</script>
<style>
.glass {
  background-image: none;
  box-shadow: none;
}

.scrollbar-thin {
  scrollbar-width: thin;
}

body {
  overflow: hidden;
}
</style>