<template>
  <div>
    <!-- 页面标题 -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">分类管理</h1>
        <p class="opacity-60 mt-1">管理商品分类信息</p>
      </div>
      <button class="btn btn-primary btn-sm" @click="null">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        添加分类
      </button>
    </div>

    <!-- 分类列表 -->
    <div class="card bg-base-100 shadow-sm">
      <div class="overflow-x-auto">
        <table class="table table-sm">
          <thead>
            <tr>
              <th style="width: 60px">ID</th>
              <th style="width: 80px">图标</th>
              <th>分类名称</th>
              <th>商品数量</th>
              <th>排序</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in 20" :key="item" class="hover">
              <td>{{ item}}</td>
              <td>
                <div class="w-10 h-10 rounded bg-base-200 flex items-center justify-center">
                  {{ item}}
                </div>
              </td>
              <td>
                <div class="font-bold">{{ item }}</div>
                <div class="opacity-50">{{ item }}</div>
              </td>
              <td>{{ item }}</td>
              <td>
                <div class="flex items-center gap-1">
                  <button class="btn btn-xs btn-ghost" :disabled="item === 1"
                    @click="null">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <span class="w-8 text-center">{{ item }}</span>
                  <button class="btn btn-xs btn-ghost" :disabled="false"
                    @click="null">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </td>
              <td>
                <div class="form-control">
                  <input type="checkbox" :checked="false" class="toggle toggle-primary toggle-sm"
                    @change="null" />
                </div>
              </td>
              <td>
                <div class="flex gap-2">
                  <button class="btn btn-ghost btn-sm" @click="null">编辑</button>
                  <button class="btn btn-ghost btn-sm text-error" @click="null"
                    :disabled="item > 0">删除</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 添加/编辑分类模态框 -->
    <dialog id="category_modal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">
          {{ true ? '编辑分类' : '添加分类' }}
        </h3>
        <form method="dialog" @submit.prevent="null">
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">分类名称</span>
              <span class="label-text-alt text-error">*</span>
            </label>
            <input type="text" placeholder="请输入分类名称" class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">分类图标</span>
            </label>
            <div class="grid grid-cols-8 gap-2 p-2 bg-base-200 rounded-lg">
              <button type="button" v-for="item in 20" :key="item" class="btn btn-ghost btn-sm" :class="'btn-active'"
                @click="null">
                {{ item }}
              </button>
            </div>
          </div>

          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">描述</span>
            </label>
            <textarea class="textarea textarea-bordered" placeholder="请输入分类描述"></textarea>
          </div>

          <div class="form-control mb-4">
            <label class="label cursor-pointer">
              <span class="label-text">启用分类</span>
              <input type="checkbox" class="toggle toggle-primary" />
            </label>
          </div>

          <div class="modal-action">
            <button type="button" class="btn btn-ghost" @click="null">取消</button>
            <button type="submit" class="btn btn-primary">确定</button>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>关闭</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

</script>

<style scoped>
/* 模态框动画 */
.modal-box {
  animation: modal-pop 0.2s ease-out;
}

@keyframes modal-pop {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>