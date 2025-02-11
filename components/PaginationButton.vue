<template>
  <div class="join">
    <button
      class="join-item btn"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      上一页
    </button>

    <button
      v-if="currentPage > 2"
      class="join-item btn"
      @click="goToPage(1)"
    >
      1
    </button>

    <button
      v-if="currentPage > 3"
      class="join-item btn btn-disabled"
      disabled
    >
      ...
    </button>

    <template v-for="page in visiblePages" :key="page">
      <button
        class="join-item btn"
        :class="{ 'btn-primary': page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </template>

    <button
      v-if="currentPage < totalPages - 2"
      class="join-item btn btn-disabled"
      disabled
    >
      ...
    </button>

    <button
      v-if="currentPage < totalPages - 1"
      class="join-item btn"
      @click="goToPage(totalPages)"
    >
      {{ totalPages }}
    </button>

    <button
      class="join-item btn"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      下一页
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void;
}>();

const visiblePages = computed(() => {
  const pages = [];
  const start = Math.max(1, props.currentPage - 1);
  const end = Math.min(props.totalPages, props.currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page);
  }
};
</script>

<!-- <style scoped>
.btn-active {
  background-color: #3b82f6; 
  color: white;
}
</style> -->