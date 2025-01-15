<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">分类管理</h1>
        <p class="opacity-60 mt-1">管理商品分类</p>
      </div>
      <button class="btn btn-primary" @click="openAddModal">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
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
              <tr v-for="category in categories" :key="category.id">
                <td>{{ category.id }}</td>
                <td>
                  <div class="flex items-center gap-2">
                    <img v-if="category.icon" :src="category.icon" class="w-8 h-8 rounded" :alt="category.name">
                    <span>{{ category.name }}</span>
                  </div>
                </td>
                <td>{{ category.parent?.name || '-' }}</td>
                <td>{{ category.sort }}</td>
                <td>{{ category.productCount }}</td>
                <td>
                  <div class="badge" :class="category.status ? 'badge-success' : 'badge-error'">
                    {{ category.status ? '启用' : '禁用' }}
                  </div>
                </td>
                <td>
                  <div class="flex gap-2">
                    <button class="btn btn-sm btn-ghost" @click="editCategory(category)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button class="btn btn-sm btn-ghost text-error" @click="deleteCategory(category)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
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
        <h3 class="font-bold text-lg mb-4">{{ isEdit ? '编辑分类' : '添加分类' }}</h3>
        <form @submit.prevent="submitForm">
          <div class="form-control">
            <label class="label">
              <span class="label-text">分类名称</span>
            </label>
            <input type="text" v-model="form.name" class="input input-bordered" required>
          </div>
          
          <div class="form-control">
            <label class="label">
              <span class="label-text">上级分类</span>
            </label>
            <select v-model="form.parentId" class="select select-bordered">
              <option :value="null">无</option>
              <option v-for="cat in parentCategories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">分类图标</span>
            </label>
            <input type="file" class="file-input file-input-bordered" @change="handleFileChange">
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">排序</span>
            </label>
            <input type="number" v-model="form.sort" class="input input-bordered" min="0">
          </div>

          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">状态</span>
              <input type="checkbox" v-model="form.status" class="toggle">
            </label>
          </div>

          <div class="modal-action">
            <button type="button" class="btn" @click="closeModal">取消</button>
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
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'admin'
})

// 分类数据
const categories = ref([
  {
    id: 1,
    name: '手机数码',
    icon: '/images/categories/digital.png',
    parent: null,
    sort: 1,
    productCount: 156,
    status: true
  },
  {
    id: 2,
    name: '智能手机',
    icon: '/images/categories/phone.png',
    parent: { id: 1, name: '手机数码' },
    sort: 1,
    productCount: 89,
    status: true
  }
])

// 表单数据
const form = ref({
  name: '',
  parentId: null,
  icon: '',
  sort: 0,
  status: true
})

// 是否编辑模式
const isEdit = ref(false)

// 可选父级分类
const parentCategories = computed(() => {
  return categories.value.filter(cat => !cat.parent)
})

// 打开添加分类弹窗
const openAddModal = () => {
  isEdit.value = false
  form.value = {
    name: '',
    parentId: null,
    icon: '',
    sort: 0,
    status: true
  }
  const modal = document.getElementById('category_modal') as HTMLDialogElement
  modal?.showModal()
}

// 编辑分类
const editCategory = (category: any) => {
  isEdit.value = true
  form.value = {
    name: category.name,
    parentId: category.parent?.id,
    icon: category.icon,
    sort: category.sort,
    status: category.status
  }
  const modal = document.getElementById('category_modal') as HTMLDialogElement
  modal?.showModal()
}

// 删除分类
const deleteCategory = async (category: any) => {
  if (!window.confirm('确定要删除该分类吗？')) return
  
  try {
    // TODO: 调用删除 API
    // await categoryStore.deleteCategory(category.id)
    categories.value = categories.value.filter(cat => cat.id !== category.id)
    ElMessage.success('删除成功')
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

// 处理文件上传
const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  // TODO: 处理文件上传
  // const formData = new FormData()
  // formData.append('file', file)
  // const response = await uploadFile(formData)
  // form.value.icon = response.url
}

// 关闭弹窗
const closeModal = () => {
  const modal = document.getElementById('category_modal') as HTMLDialogElement
  modal?.close()
}

// 提交表单
const submitForm = async () => {
  try {
    if (isEdit.value) {
      // TODO: 调用编辑 API
      // await categoryStore.updateCategory(form.value)
    } else {
      // TODO: 调用添加 API
      // await categoryStore.addCategory(form.value)
    }
    
    // 刷新列表
    // await fetchCategories()
    
    closeModal()
    ElMessage.success(isEdit.value ? '编辑成功' : '添加成功')
  } catch (error) {
    ElMessage.error(isEdit.value ? '编辑失败' : '添加失败')
  }
}

// 获取分类列表
const fetchCategories = async () => {
  try {
    // TODO: 调用获取列表 API
    // const data = await categoryStore.getCategories()
    // categories.value = data
  } catch (error) {
    ElMessage.error('获取分类列表失败')
  }
}

// 初始化
onMounted(() => {
  fetchCategories()
})
</script>
