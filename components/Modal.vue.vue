<template>
  <div>
    <dialog ref="modal" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="text-lg font-bold">{{ title }}</h3>
        <slot name="body"></slot>
        <div class="modal-action">
          <form method="dialog">
            <slot name="bottom"></slot>
          </form>
        </div>
      </div>
      <label class="modal-backdrop" @click="closeModal"></label>
    </dialog>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  title: string;
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void;
}>();

const modal = ref<HTMLDialogElement | null>(null);

watch(() => props.show, (newVal) => {
  if (newVal) {
    openModal();
  } else {
    closeModal();
  }
});

const openModal = () => {
  modal.value?.showModal();
  emit('update:show', true);
};

const closeModal = () => {
  modal.value?.close();
  emit('update:show', false);
};
</script>
