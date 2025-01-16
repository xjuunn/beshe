<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">分类管理</h1>
        <p class="opacity-60 mt-1">管理商品分类</p>
      </div>
      <button class="btn btn-primary" @click="null">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd" />
        </svg>
        添加分类
      </button>
    </div>

    <!-- 分类列表 -->
    <div class="card bg-base-100 shadow-sm">
      <div class="card-body">
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>分类名称</th>
                <th>上级分类</th>
                <th>排序</th>
                <th>商品数量</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in 20" :key="item">
                <td>{{ item}}</td>
                <td>
                  <div class="flex items-center gap-2">
                    <img :src="item+''" class="w-8 h-8 rounded" :alt="item+''">
                    <span>{{ item }}</span>
                  </div>
                </td>
                <td>{{ item }}</td>
                <td>{{ item}}</td>
                <td>{{ item }}</td>
                <td>
                  <div class="badge" :class="true? 'badge-success' : 'badge-error'">
                    {{ true ? '启用' : '禁用' }}
                  </div>
                </td>
                <td>
                  <div class="flex gap-2">
                    <button class="btn btn-sm btn-ghost" @click="null">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button class="btn btn-sm btn-ghost text-error" @click="null">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 添加/编辑分类弹窗 -->
    <dialog id="category_modal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">{{ true ? '编辑分类' : '添加分类' }}</h3>
        <form @submit.prevent="null">
          <div class="form-control">
            <label class="label">
              <span class="label-text">分类名称</span>
            </label>
            <input type="text" class="input input-bordered" required>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">上级分类</span>
            </label>
            <select class="select select-bordered">
              <option :value="null">无</option>
              <option v-for="item in 20" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">分类图标</span>
            </label>
            <input type="file" class="file-input file-input-bordered" @change="null">
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">排序</span>
            </label>
            <input type="number" class="input input-bordered" min="0">
          </div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">状态</span>
              <input type="checkbox" class="toggle">
            </label>
          </div>

          <div class="modal-action">
            <button type="button" class="btn" @click="null">取消</button>
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
