<template>
  <div>
    <title>系统主题</title>
    sysTheme
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin'
})
useBreadcrumbsStore().setBreadcrumbs([
  {name: '仪表盘', path: '/admin'},
  {name: '系统主题', path: '/admin/sysTheme'},
]);
</script>