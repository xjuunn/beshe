<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">

</script>
<style>
html,
body {
  height: 100%;
  scrollbar-width: none;
}
.scrollbar-thin{
  scrollbar-width: thin;
}
.scrollbar-hidden {
  scrollbar-width: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>