<template>
  <div class="card bg-base-300 w-full h-96 overflow-hidden select-none shadow-xl">
    <div class="absolute bg">
      <div class="bg-1 w-[4700px] relative whitespace-nowrap">{{ bgtxt1 }}</div>
      <div class="bg-2 w-[4700px] relative whitespace-nowrap">{{ bgtxt2 }}</div>
    </div>
    <div class="card-title flex-col justify-center w-full title">
      <span class="line-clamp-1">{{ itemData?.name }}</span>
      <div class="text-sm opacity-80 font-thin line-clamp-1">{{ itemData?.model }}</div>
    </div>
    <div class="absolute h-full imgdiv w-full flex items-center justify-center">
      <div v-show="isImgLoading" class="loading m-10"></div>
      <img v-show="!isImgLoading" class="absolute imgitem1 max-h-96" :src="processedCover" alt="图片" />
      <img v-show="!isImgLoading" class="absolute imgitem2 max-h-96" :src="processedCover" alt="图片" />
    </div>
    <div class="absolute bottom-btn bottom-[-70px] p-2 flex justify-between w-full">
      <button class="btn btn-ghost" @click="btnAddCart">加入购物车</button>
      <button class="btn btn-ghost" @click="navigateTo('/products/' + itemData?.id)">详情</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as Product from '../../api/products';
import { ref, onMounted, computed } from 'vue';

let itemData = ref<Product.ProdoctDTO2 | undefined>(undefined);
let bgtxt1 = ref('');
let bgtxt2 = ref('');
let processedCover = ref('');
let isImgLoading = ref(true);
let props = defineProps<{ data: Product.ProdoctDTO2 }>();

onMounted(async () => {
  initData();
  await replaceImg();
});

function initData() {
  itemData.value = props.data;
  bgtxt1.value = txtinc(itemData.value?.name ?? '');
  bgtxt2.value = txtinc(itemData.value?.info ?? '');
}

function txtinc(str: string): string {
  if (str.length <= 100) return txtinc(str + '  ' + str);
  return str.substring(0, 100);
}

async function replaceImg() {
  isImgLoading.value = true;
  if (itemData.value?.cover) {
    const imageUrl = `http://localhost:3000/serverapi/uploads/products/${itemData.value.cover.split(',')[0]}`;
    processedCover.value = await convertWhiteToTransparent(imageUrl);
  }
  isImgLoading.value = false;
}
async function convertWhiteToTransparent(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageUrl;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(imageUrl);
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let hasTransparentPixel = false;
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha < 255) {
          hasTransparentPixel = true;
          break;
        }
      }
      if (hasTransparentPixel) {
        resolve(imageUrl);
      } else {
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          if (r > 250 && g > 250 && b > 250) {
            data[i + 3] = 0;
          }
        }
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      }
    };
    image.onerror = () => resolve(imageUrl);
  });
}
async function btnAddCart() {
  let { isLogin } = useUserStore();
  if (!isLogin.value) {
    navigateTo('/login');
    return;
  }

  let { addCart } = useCartStore();
  let { user } = useUserStore();
  let { data } = await addCart({
    userId: user.value.id,
    productId: Number(itemData.value?.id ?? -1),
    quantity: 1,
  })
  if (data.code == 200) createToast(data.message, { type: 'success', style: 'soft', icon: 'mdi:success' })
  else createToast(data.message, { type: 'error', style: 'soft', icon: 'mdi:error' })


}

</script>

<style scoped lang="css">
.card .imgdiv img {
  scale: 0.7;
  transition: .4s;

}

.card:hover .imgdiv img {
  scale: 0.9;
  rotate: -10deg;
}

.card .title {
  margin-top: 25px;
  transition: .4s;

}

.card:hover .title {
  margin-top: 10px;
}

.card .imgitem1 {
  filter: blur(0px);
}

.card:hover .imgitem1 {
  filter: blur(30px);
}

.bg {
  font-size: 4rem;
  font-family: 'Courier New', Courier, monospace;
  opacity: 0;
  top: 0;
  rotate: 0deg;
  transition: .4s;

}

.bg-1 {
  animation: bgmove 20s cubic-bezier(.21, .76, .66, .26) 0s infinite normal none paused;
}

.bg-2 {
  animation: bgmove 20s cubic-bezier(.21, .76, .66, .26) 0s infinite reverse paused;
  font-weight: 900;
  color: #000;
  -webkit-text-stroke-color: #fff;
  -webkit-text-stroke-width: 1px;
  stroke-width: #fff;
  stroke-width: 1px;

}

.card:hover .bg div {
  animation-play-state: running;
}

@keyframes bgmove {
  0% {
    left: 0px;
  }

  100% {
    left: -4700px;
  }
}

.card:hover .bg {
  opacity: .2;
  top: 760px;
  rotate: 16deg;
}

.card .bottom-btn {
  transition: .1s;

}

.card:hover .bottom-btn {
  bottom: 0px;
}
</style>