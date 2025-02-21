<template>
  <div class="flex items-center justify-center">
    <title>文档</title>
    <div>
      <article class="prose p-5">
        <ContentRenderer :value="content"></ContentRenderer>
      </article>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
})
let { name } = useRoute().params
const articles = await queryContent().find();
let content: Ref<any> = ref(null);
onMounted(() => {
  content.value = articles.find((item) => {
    return item._stem == name
  })



})
</script>

<style></style>