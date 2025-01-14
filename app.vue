<template>
  <div id="app-content" class="select-none relative overflow-x-hidden scrollbar-thin">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">

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