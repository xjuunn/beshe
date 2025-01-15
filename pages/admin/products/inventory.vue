<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">库存管理</h1>
        <p class="opacity-60 mt-1">管理商品库存</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-outline" @click="exportInventory">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          导出库存
        </button>
        <button class="btn btn-primary" @click="openStockModal">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
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
            <input type="text" v-model="search.name" class="input input-bordered" placeholder="请输入商品名称">
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">SKU</span>
            </label>
            <input type="text" v-model="search.sku" class="input input-bordered" placeholder="请输入SKU">
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">库存状态</span>
            </label>
            <select v-model="search.stockStatus" class="select select-bordered">
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
            <button class="btn btn-primary" @click="searchInventory">搜索</button>
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
              <tr v-for="item in inventory" :key="item.id">
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle w-12 h-12">
                        <img :src="item.image" :alt="item.name">
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">{{ item.name }}</div>
                      <div class="text-sm opacity-50">{{ item.category }}</div>
                    </div>
                  </div>
                </td>
                <td>{{ item.sku }}</td>
                <td>{{ item.stock }}</td>
                <td>{{ item.threshold }}</td>
                <td>
                  <button class="btn btn-sm btn-ghost" @click="viewStockHistory(item, 'in')">
                    查看
                    <div class="badge badge-primary ml-2">{{ item.inRecords }}</div>
                  </button>
                </td>
                <td>
                  <button class="btn btn-sm btn-ghost" @click="viewStockHistory(item, 'out')">
                    查看
                    <div class="badge badge-secondary ml-2">{{ item.outRecords }}</div>
                  </button>
                </td>
                <td>
                  <div class="badge" :class="{
                    'badge-success': item.stock > item.threshold,
                    'badge-warning': item.stock <= item.threshold && item.stock > 0,
                    'badge-error': item.stock === 0
                  }">
                    {{ 
                      item.stock === 0 ? '无库存' :
                      item.stock <= item.threshold ? '低库存' : '正常'
                    }}
                  </div>
                </td>
                <td>
                  <div class="flex gap-2">
                    <button class="btn btn-sm btn-ghost" @click="editThreshold(item)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button class="btn btn-sm btn-ghost text-warning" @click="openStockModal(item)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
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
        <form @submit.prevent="submitStockForm">
          <div class="form-control">
            <label class="label">
              <span class="label-text">商品</span>
            </label>
            <select v-model="stockForm.productId" class="select select-bordered" required>
              <option v-for="product in products" :key="product.id" :value="product.id">
                {{ product.name }}
              </option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">入库数量</span>
            </label>
            <input type="number" v-model="stockForm.quantity" class="input input-bordered" required min="1">
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">入库备注</span>
            </label>
            <textarea v-model="stockForm.remark" class="textarea textarea-bordered" rows="3"></textarea>
          </div>

          <div class="modal-action">
            <button type="button" class="btn" @click="closeStockModal">取消</button>
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
          {{ selectedProduct?.name }} - {{ historyType === 'in' ? '入库' : '出库' }}记录
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
              <tr v-for="record in stockHistory" :key="record.id">
                <td>{{ formatDate(record.createdAt) }}</td>
                <td>{{ record.quantity }}</td>
                <td>{{ record.operator }}</td>
                <td>{{ record.remark }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-action">
          <button class="btn" @click="closeHistoryModal">关闭</button>
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
        <form @submit.prevent="submitThresholdForm">
          <div class="form-control">
            <label class="label">
              <span class="label-text">商品名称</span>
            </label>
            <input type="text" :value="selectedProduct?.name" class="input input-bordered" disabled>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">预警阈值</span>
            </label>
            <input type="number" v-model="thresholdForm.value" class="input input-bordered" required min="0">
          </div>

          <div class="modal-action">
            <button type="button" class="btn" @click="closeThresholdModal">取消</button>
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
import { ref } from 'vue'

definePageMeta({
  layout: 'admin'
})

// 搜索条件
const search = ref({
  name: '',
  sku: '',
  stockStatus: ''
})

// 库存数据
const inventory = ref([
  {
    id: 1,
    name: 'iPhone 14 Pro',
    category: '手机数码',
    image: '/images/products/iphone.png',
    sku: 'IP14P-256G-BLACK',
    stock: 50,
    threshold: 10,
    inRecords: 5,
    outRecords: 12
  },
  {
    id: 2,
    name: 'MacBook Pro M2',
    category: '电脑办公',
    image: '/images/products/macbook.png',
    sku: 'MBP-M2-512G-GREY',
    stock: 5,
    threshold: 8,
    inRecords: 3,
    outRecords: 8
  }
])

// 可选商品列表
const products = ref([
  { id: 1, name: 'iPhone 14 Pro' },
  { id: 2, name: 'MacBook Pro M2' }
])

// 入库表单
const stockForm = ref({
  productId: null,
  quantity: 1,
  remark: ''
})

// 阈值表单
const thresholdForm = ref({
  value: 0
})

// 选中的商品
const selectedProduct = ref(null)

// 库存记录类型
const historyType = ref('')

// 库存记录数据
const stockHistory = ref([
  {
    id: 1,
    createdAt: new Date(),
    quantity: 10,
    operator: '管理员',
    remark: '首次入库'
  }
])

// 搜索库存
const searchInventory = async () => {
  try {
    // TODO: 调用搜索 API
    // const data = await inventoryStore.searchInventory(search.value)
    // inventory.value = data
  } catch (error) {
    ElMessage.error('搜索失败')
  }
}

// 导出库存
const exportInventory = () => {
  // TODO: 实现导出功能
  ElMessage.success('导出成功')
}

// 查看库存记录
const viewStockHistory = async (product: any, type: 'in' | 'out') => {
  selectedProduct.value = product
  historyType.value = type
  
  try {
    // TODO: 获取库存记录
    // const data = await inventoryStore.getStockHistory(product.id, type)
    // stockHistory.value = data
    
    const modal = document.getElementById('history_modal') as HTMLDialogElement
    modal?.showModal()
  } catch (error) {
    ElMessage.error('获取记录失败')
  }
}

// 打开入库弹窗
const openStockModal = (product?: any) => {
  if (product) {
    stockForm.value.productId = product.id
  }
  const modal = document.getElementById('stock_modal') as HTMLDialogElement
  modal?.showModal()
}

// 关闭入库弹窗
const closeStockModal = () => {
  stockForm.value = {
    productId: null,
    quantity: 1,
    remark: ''
  }
  const modal = document.getElementById('stock_modal') as HTMLDialogElement
  modal?.close()
}

// 提交入库表单
const submitStockForm = async () => {
  try {
    // TODO: 调用入库 API
    // await inventoryStore.addStock(stockForm.value)
    
    closeStockModal()
    ElMessage.success('入库成功')
    // 刷新列表
    searchInventory()
  } catch (error) {
    ElMessage.error('入库失败')
  }
}

// 修改预警阈值
const editThreshold = (product: any) => {
  selectedProduct.value = product
  thresholdForm.value.value = product.threshold
  const modal = document.getElementById('threshold_modal') as HTMLDialogElement
  modal?.showModal()
}

// 关闭阈值弹窗
const closeThresholdModal = () => {
  const modal = document.getElementById('threshold_modal') as HTMLDialogElement
  modal?.close()
}

// 提交阈值表单
const submitThresholdForm = async () => {
  try {
    // TODO: 调用修改阈值 API
    // await inventoryStore.updateThreshold(selectedProduct.value.id, thresholdForm.value.value)
    
    closeThresholdModal()
    ElMessage.success('修改成功')
    // 刷新列表
    searchInventory()
  } catch (error) {
    ElMessage.error('修改失败')
  }
}

// 关闭记录弹窗
const closeHistoryModal = () => {
  const modal = document.getElementById('history_modal') as HTMLDialogElement
  modal?.close()
}

// 格式化日期
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// 初始化
onMounted(() => {
  searchInventory()
})
</script>
