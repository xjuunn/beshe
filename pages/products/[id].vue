<template>
  <div class="max-w-[1400px] mx-auto p-5 ">
    <div class="w-full flex flex-col md:flex-row">
      <div
        class="order-2 md:order-1 min-h-20 md:w-30 md:block grid grid-cols-5 gap-4 justify-items-center items-stretch md:items-start md:justify-items-start md:grid-cols-1 overflow-y-auto max-h-[90vh] pb-5">
        <div v-for="item in 5" :key="item"
          :style="{ backgroundImage: `url(https://picsum.photos/400/300?seed=${item})` }"
          class="w-20 h-20 mt-5 rounded-md bg-center bg-cover cursor-pointer ring-2 ring-base-300"
          @click="changeImage(item)">
        </div>
      </div>
      <div
        class="order-1 md:order-2 min-h-[300px] md:min-h-[80vh] md:flex-1 max-h-[90vh] bg-cover bg-center rounded-2xl float-left"
        :style="{ backgroundImage: `url(https://picsum.photos/400/300?seed=${index})` }">
      </div>
      <div class="order-3 md:flex-1  min-h-[200px]">
        <div class="m-7">
          <h2 class="text-2xl font-semibold">无印良品 MUJI 自动泡沫洗手机 智能感应 洗手液自动感应器</h2>
          <div class="text-xs opacity-50 mt-2">id:D0489345798345660234</div>
          <div class="divider"></div>
          <div class="text-sm">无印良品 MUJI 自动泡沫洗手机 智能感应 洗手液自动感应器无印良品 MUJI 自动泡沫洗手机 智能感应 洗手液自动感应器无印良品 MUJI 自动泡沫洗手机 智能感应
            洗手液自动感应器</div>
          <br>
          <div class="text-sm">型号：白色</div>
          <br>
          <div>剩余存货：<span class="text-xl font-semibold text-error">100</span></div>
          <div class="flex mt-5 gap-4 items-center">
            <div class="flex-1">价格：<span class="text-xl font-semibold text-primary">199元</span></div>
            <button class="btn btn-primary">加入购物车</button>
          </div>
        </div>
      </div>
    </div>
    <div class="divider"> 用户评价 </div>

    <div class="w-full">
      <div class="w-full flex justify-end pb-5">
        <form class="filter">
          <input class="btn btn-square" type="reset" value="×" />
          <input class="btn" type="radio" name="frameworks" aria-label="最新" />
          <input class="btn" type="radio" name="frameworks" aria-label="最旧" />
          <input class="btn" type="radio" name="frameworks" aria-label="最热" />
        </form>
      </div>

      <div>
        <div v-for="item in 20" class="card w-full bg-base-300 shadow-xl mt-6 p-5 cursor-default scrollreveal-item">
          <div>
            <div class="avatar">
              <div class="w-8 rounded-xl bg-center bg-cover"
                :style="{ backgroundImage: `url(https://picsum.photos/64/64?seed=${item})` }"></div>
            </div>
            <span class="text-sm opacity-50 h-full ml-3">匿名用户</span>
          </div>
          <p class="indent-7 p-3 mt-2">这款无印良品 MUJI
            自动泡沫洗手机智能感应洗手液自动感应器非常方便，解决了传统手动泵瓶不卫生的问题。感应式的设计让我们只需将手伸过去，它就能自动释放泡沫，避免了直接接触瓶口，减少细菌传播的风险。泡沫细腻丰富，清洗效果很好，使用起来既省时又省力，特别适合家庭或办公室使用。外观简约现代，符合无印良品一贯的风格，放在洗手台上既实用又增添了一丝雅致。操作非常简单，放入洗手液后只需开关按钮，日常维护也不复杂。虽然价格相对较高，但考虑到它带来的便利性和卫生性，绝对值得投资。如果你追求高效、便捷、卫生的生活方式，这款产品非常推荐。总的来说，它提升了我的生活品质，让日常洗手变得更加智能与舒适。
          </p>
        </div>


      </div>




    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'frontend'
})
let index: Ref<number> = ref(1);
function changeImage(index1: number) {
  index.value = index1
}
</script>