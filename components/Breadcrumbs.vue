<template>
  <div class="breadcrumbs text-sm w-96 hidden sm:block ml-4">
    <ul>
      <li v-for="(item, index) in breadcrumbs" :key="index">
        <span v-if="index === breadcrumbs.length - 1" class="text-gray-500">
          {{ item.name }}
        </span>
        <a v-else :href="item.path || '#'" class="hover:underline text-primary">
          {{ item.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
let { breadcrumbs } = useBreadcrumbsStore();
</script>
