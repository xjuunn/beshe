<template>
  <div>
    sysTheme
    <!-- <input v-model="colors.base100" type="color"> -->
  </div>
</template>

<script lang="ts" setup>
import Color from 'colorjs.io'
definePageMeta({
  layout: 'admin'
})
const {colors} = useThemeStore();
onMounted(() => {
  // let color = new Color('#ffffff')
  // console.log(color.to('hrgb').toString());
  // console.log();
  






})
</script>
<style>
body {
  /* background: #69b279; */
  /* background: rgb(105, 178, 121); */
  /* background-color: lch(66.69112141384814% 41.62506271551324 147.81220108309728); */
  
}
</style>