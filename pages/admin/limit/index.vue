<template>
  <div>
    <title>限购管理</title>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
useBreadcrumbsStore().setBreadcrumbs([
  {name: '仪表盘', path: '/admin'},
  {name: '限购管理', path: '/admin/limit'}
])
</script>

