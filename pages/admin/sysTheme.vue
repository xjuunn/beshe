<template>
  <div class="p-6 space-y-6">
    
    <div class="space-y-6">
      <h1 class="text-2xl font-bold">系统主题</h1>
      <div v-for="(color, key) in themeColors" :key="key" class="flex items-center gap-4">
        <label :for="key" class="w-32 text-sm font-medium">{{ key }}</label>
        <input :id="key" type="color" v-model="themeColors[key]" @input="updateTheme(key)"
          class="input input-bordered w-16 h-10 p-0 border-none" />
        <input type="text" v-model="themeColors[key]" @input="updateTheme(key)"
          class="input input-bordered w-full max-w-xs" />
      </div>
      <div v-for="(radius, key) in themeRadius" :key="key" class="flex items-center gap-4">
        <label :for="key" class="w-32 text-sm font-medium">{{ key }}</label>
        <input v-if="key === '--radius-box'" type="range" min="0" max="100" step="25" v-model="themeRadius[key]"
          @input="updateTheme(key)" class="range" />
        <input v-else type="text" v-model="themeRadius[key]" @input="updateTheme(key)"
          class="input input-bordered w-full max-w-xs" placeholder="示例: 0.5rem" />
      </div>
    </div>
    <button @click="copyTheme" class="btn btn-primary w-full">复制主题配置</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useClipboard } from '@vueuse/core';

definePageMeta({
  layout: 'admin'
});

useBreadcrumbsStore().setBreadcrumbs([
  { name: '仪表盘', path: '/admin' },
  { name: '系统主题', path: '/admin/sysTheme' },
]);

const themeColors = ref({
  '--color-base-100': 'oklch(25.33% 0.016 252.42)',
  '--color-base-200': 'oklch(23.26% 0.014 253.1)',
  '--color-base-300': 'oklch(21.15% 0.012 254.09)',
  '--color-base-content': 'oklch(97.807% 0.029 256.847)',
  '--color-primary': 'oklch(58% 0.233 277.117)',
  '--color-primary-content': 'oklch(96% 0.018 272.314)',
  '--color-secondary': 'oklch(65% 0.241 354.308)',
  '--color-secondary-content': 'oklch(94% 0.028 342.258)',
  '--color-accent': 'oklch(77% 0.152 181.912)',
  '--color-accent-content': 'oklch(38% 0.063 188.416)',
  '--color-neutral': 'oklch(14% 0.005 285.823)',
  '--color-neutral-content': 'oklch(92% 0.004 286.32)',
  '--color-info': 'oklch(74% 0.16 232.661)',
  '--color-info-content': 'oklch(29% 0.066 243.157)',
  '--color-success': 'oklch(76% 0.177 163.223)',
  '--color-success-content': 'oklch(37% 0.077 168.94)',
  '--color-warning': 'oklch(82% 0.189 84.429)',
  '--color-warning-content': 'oklch(41% 0.112 45.904)',
  '--color-error': 'oklch(71% 0.194 13.428)',
  '--color-error-content': 'oklch(27% 0.105 12.094)'
});

const themeRadius = ref({
  '--radius-box': '25'
});

const updateTheme = (key: string) => {
  if (themeColors.value[key]) {
    document.documentElement.style.setProperty(key, themeColors.value[key]);
  }
  if (themeRadius.value[key]) {
    document.documentElement.style.setProperty(key, `${themeRadius.value[key]}px`);
  }
};

watch([themeColors, themeRadius], ([newColors, newRadius]) => {
  Object.keys(newColors).forEach((key) => {
    if (newColors[key]) updateTheme(key);
  });
  Object.keys(newRadius).forEach((key) => {
    if (newRadius[key]) updateTheme(key);
  });
}, { deep: true });

const { copy } = useClipboard();
const copyTheme = () => {
  const themeCss = [
    ...Object.entries(themeColors.value).filter(([_, value]) => value).map(([key, value]) => `${key}: ${value};`),
    ...Object.entries(themeRadius.value).filter(([_, value]) => value).map(([key, value]) => `${key}: ${value}px;`)
  ].join('\n');
  copy(`{\n${themeCss}\n}`);
  alert('主题配置已复制');
};
</script>

<style scoped></style>