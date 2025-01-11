<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <button class="btn btn-primary" @click="test">test</button>
  </div>
</template>

<script lang="ts" setup>

async function test() {
  const data = await $fetch('/api/test');
  console.log(data);
}
</script>
