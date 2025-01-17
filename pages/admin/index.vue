<template>
  <div>
    <button class="btn btn-primary" @click="changeTheme">主题切换</button>
  </div>
</template>

<script lang="ts" setup>

definePageMeta({
  layout: 'admin'
})
const { setCustomTheme } = useThemeStore();
const customTheme = {
  "primary": "#ae00ff",
  "secondary": "#0c00ff",
  "accent": "#00db00",
  "neutral": "#0d1926",
  "base-100": "#212730",
  "base-200": "#2c343c",
  "base-300": "#343d46",
  "info": "#0089dd",
  "success": "#00c94f",
  "warning": "#ff9600",
  "error": "#c51a3b",
}
function changeTheme() {
  setCustomTheme(customTheme);
}

</script>