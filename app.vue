<template>
  <div class="h-0" hidden>
    <div class="alert alert-error"></div>
    <div class="alert alert-info"></div>
    <div class="alert alert-success"></div>
    <div class="alert alert-warning"></div>
  </div>
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
  transition: .5s;
}

.scrollbar-thin {
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