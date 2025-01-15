<template>
  <div>
    <!-- 页面标题 -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold">分类管理</h1>
        <p class="opacity-60 mt-1">管理商品分类信息</p>
      </div>
      <button class="btn btn-primary btn-sm" @click="openAddModal">
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
            <tr v-for="category in categories" :key="category.id" class="hover">
              <td>{{ category.id }}</td>
              <td>
                <div class="w-10 h-10 rounded bg-base-200 flex items-center justify-center">
                  {{ category.emoji }}
                </div>
              </td>
              <td>
                <div class="font-bold">{{ category.name }}</div>
                <div class="opacity-50">{{ category.description }}</div>
              </td>
              <td>{{ category.productCount }}</td>
              <td>
                <div class="flex items-center gap-1">
                  <button class="btn btn-xs btn-ghost" :disabled="category.sort === 1" @click="updateSort(category, 'up')">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <span class="w-8 text-center">{{ category.sort }}</span>
                  <button class="btn btn-xs btn-ghost" :disabled="category.sort === categories.length" @click="updateSort(category, 'down')">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </td>
              <td>
                <div class="form-control">
                  <input type="checkbox" 
                         :checked="category.isActive" 
                         class="toggle toggle-primary toggle-sm"
                         @change="toggleStatus(category)" />
                </div>
              </td>
              <td>
                <div class="flex gap-2">
                  <button class="btn btn-ghost btn-sm" @click="editCategory(category)">编辑</button>
                  <button class="btn btn-ghost btn-sm text-error" 
                          @click="deleteCategory(category)"
                          :disabled="category.productCount > 0">删除</button>
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
          {{ isEditing ? '编辑分类' : '添加分类' }}
        </h3>
        <form method="dialog" @submit.prevent="saveCategory">
          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">分类名称</span>
              <span class="label-text-alt text-error">*</span>
            </label>
            <input type="text" v-model="form.name" 
                   placeholder="请输入分类名称" 
                   class="input input-bordered w-full" />
          </div>

          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">分类图标</span>
            </label>
            <div class="grid grid-cols-8 gap-2 p-2 bg-base-200 rounded-lg">
              <button type="button"
                      v-for="emoji in emojiList" 
                      :key="emoji"
                      class="btn btn-ghost btn-sm"
                      :class="{'btn-active': form.emoji === emoji}"
                      @click="form.emoji = emoji">
                {{ emoji }}
              </button>
            </div>
          </div>

          <div class="form-control w-full mb-4">
            <label class="label">
              <span class="label-text">描述</span>
            </label>
            <textarea v-model="form.description" 
                      class="textarea textarea-bordered" 
                      placeholder="请输入分类描述"></textarea>
          </div>

          <div class="form-control mb-4">
            <label class="label cursor-pointer">
              <span class="label-text">启用分类</span>
              <input type="checkbox" v-model="form.isActive" class="toggle toggle-primary" />
            </label>
          </div>

          <div class="modal-action">
            <button type="button" class="btn btn-ghost" @click="closeModal">取消</button>
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
import { useCategoryStore } from '~/stores/category'
import { storeToRefs } from 'pinia'
import type { Category } from '@prisma/client'
import type { CategoryCreateInput, CategoryUpdateInput } from '~/server/services/category'

// 页面元数据
definePageMeta({
  layout: 'admin'
})

const categoryStore = useCategoryStore()
const { categories, loading } = storeToRefs(categoryStore)

// 表单数据
const form = ref<CategoryCreateInput>({
  name: '',
  description: '',
  image: '',
  sort: 0
})

// 编辑状态
const isEditing = ref(false)
const editingId = ref<number | null>(null)

// 模态框
const modal = ref<HTMLDialogElement | null>(null)

// 初始化
onMounted(async () => {
  await categoryStore.fetchCategories()
})

// 打开添加模态框
const openAddModal = () => {
  form.value = {
    name: '',
    description: '',
    image: '',
    sort: categories.value.length + 1
  }
  isEditing.value = false
  editingId.value = null
  modal.value?.showModal()
}

// 打开编辑模态框
const editCategory = (category: Category) => {
  form.value = {
    name: category.name,
    description: category.description || '',
    image: category.image || '',
    sort: category.sort || 0
  }
  isEditing.value = true
  editingId.value = category.id
  modal.value?.showModal()
}

// 关闭模态框
const closeModal = () => {
  modal.value?.close()
}

// 保存分类
const saveCategory = async () => {
  try {
    if (isEditing.value && editingId.value) {
      await categoryStore.updateCategory(editingId.value, form.value)
      ElMessage.success('更新成功')
    } else {
      await categoryStore.createCategory(form.value)
      ElMessage.success('创建成功')
    }
    closeModal()
  } catch (error) {
    ElMessage.error(error?.message || '操作失败')
  }
}

// 切换状态
const toggleStatus = async (category: Category) => {
  try {
    await categoryStore.updateCategory(category.id, {
      status: category.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    })
    ElMessage.success('状态更新成功')
  } catch (error) {
    ElMessage.error('状态更新失败')
  }
}

// 删除分类
const deleteCategory = async (category: Category) => {
  try {
    if (category.productCount > 0) {
      ElMessage.warning('该分类下还有商品，无法删除')
      return
    }
    
    const confirmed = await ElMessageBox.confirm(
      '确定要删除该分类吗？此操作不可恢复。',
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )

    if (confirmed) {
      await categoryStore.deleteCategory(category.id)
      ElMessage.success('删除成功')
    }
  } catch (error) {
    ElMessage.error('删除失败')
  }
}

// 更新排序
const updateSort = async (category: Category, direction: 'up' | 'down') => {
  const currentIndex = categories.value.findIndex(c => c.id === category.id)
  const newSort = direction === 'up' ? category.sort - 1 : category.sort + 1
  
  try {
    await categoryStore.updateSort(category.id, newSort)
    ElMessage.success('排序更新成功')
  } catch (error) {
    ElMessage.error('排序更新失败')
  }
}
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