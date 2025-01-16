<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">库存管理</h1>
        <p class="opacity-60 mt-1">管理商品库存</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-outline" @click="null">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
          导出库存
        </button>
        <button class="btn btn-primary" @click="null">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd" />
          </svg>
          入库
        </button>
      </div>
    </div>

    <!-- 搜索栏 -->
    <div class="card bg-base-100 shadow-sm mb-6">
      <div class="card-body">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">商品名称</span>
            </label>
            <input type="text" class="input input-bordered" placeholder="请输入商品名称">
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">SKU</span>
            </label>
            <input type="text" class="input input-bordered" placeholder="请输入SKU">
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">库存状态</span>
            </label>
            <select class="select select-bordered">
              <option value="">全部</option>
              <option value="normal">正常</option>
              <option value="low">低库存</option>
              <option value="out">无库存</option>
            </select>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">&nbsp;</span>
            </label>
            <button class="btn btn-primary" @click="null">搜索</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 库存列表 -->
    <div class="card bg-base-100 shadow-sm">
      <div class="card-body">
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>商品信息</th>
                <th>SKU</th>
                <th>库存数量</th>
                <th>预警阈值</th>
                <th>入库记录</th>
                <th>出库记录</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in 20" :key="item">
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle w-12 h-12">
                        <img :src="item + ''" :alt="item + ''">
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">{{ item }}</div>
                      <div class="text-sm opacity-50">{{ item }}</div>
                    </div>
                  </div>
                </td>
                <td>{{ item }}</td>
                <td>{{ item }}</td>
                <td>{{ item }}</td>
                <td>
                  <button class="btn btn-sm btn-ghost" @click="null">
                    查看
                    <div class="badge badge-primary ml-2">{{ item }}</div>
                  </button>
                </td>
                <td>
                  <button class="btn btn-sm btn-ghost" @click="null">
                    查看
                    <div class="badge badge-secondary ml-2">{{ item }}</div>
                  </button>
                </td>
                <td>
                  <div class="badge" :class="{
                    'badge-success': item > item,
                    'badge-warning': item <= item && item > 0,
                    'badge-error': item === 0
                  }">
                    {{
                      item === 0 ? '无库存' :
                        item <= item ? '低库存' : '正常' }} </div>
                </td>
                <td>
                  <div class="flex gap-2">
                    <button class="btn btn-sm btn-ghost" @click="null">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button class="btn btn-sm btn-ghost text-warning" @click="null">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                          d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
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

    <!-- 入库弹窗 -->
    <dialog id="stock_modal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">商品入库</h3>
        <form @submit.prevent="null">
          <div class="form-control">
            <label class="label">
              <span class="label-text">商品</span>
            </label>
            <select class="select select-bordered" required>
              <option v-for="item in 20" :key="item" :value="item">
                {{ item }}
              </option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">入库数量</span>
            </label>
            <input type="number" class="input input-bordered" required min="1">
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">入库备注</span>
            </label>
            <textarea class="textarea textarea-bordered" rows="3"></textarea>
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

    <!-- 库存记录弹窗 -->
    <dialog id="history_modal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">
          test - {{ 'in' === 'in' ? '入库' : '出库' }}记录
        </h3>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>时间</th>
                <th>数量</th>
                <th>操作人</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in 20" :key="item">
                <td>{{ item }}</td>
                <td>{{ item }}</td>
                <td>{{ item }}</td>
                <td>{{ item }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-action">
          <button class="btn" @click="null">关闭</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>关闭</button>
      </form>
    </dialog>

    <!-- 修改阈值弹窗 -->
    <dialog id="threshold_modal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">修改库存预警阈值</h3>
        <form @submit.prevent="null">
          <div class="form-control">
            <label class="label">
              <span class="label-text">商品名称</span>
            </label>
            <input type="text" :value="'test'" class="input input-bordered" disabled>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">预警阈值</span>
            </label>
            <input type="number" class="input input-bordered" required min="0">
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
