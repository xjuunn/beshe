import { defineStore } from 'pinia'
import type { Category } from '@prisma/client'
import type { CategoryCreateInput, CategoryUpdateInput } from '~/server/services/category'

interface CategoryState {
  categories: Category[]
  loading: boolean
}

export const useCategoryStore = defineStore('category', {
  state: (): CategoryState => ({
    categories: [],
    loading: false
  }),

  actions: {
    // 获取分类列表
    async fetchCategories() {
      this.loading = true
      try {
        const response = await $fetch('/api/categories')
        this.categories = response
      } catch (error) {
        console.error('Failed to fetch categories:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // 创建分类
    async createCategory(data: CategoryCreateInput) {
      try {
        const response = await $fetch('/api/categories', {
          method: 'POST',
          body: data
        })
        await this.fetchCategories()
        return response
      } catch (error) {
        console.error('Failed to create category:', error)
        throw error
      }
    },

    // 更新分类
    async updateCategory(id: number, data: CategoryUpdateInput) {
      try {
        const response = await $fetch(`/api/categories/${id}`, {
          method: 'PUT',
          body: data
        })
        await this.fetchCategories()
        return response
      } catch (error) {
        console.error('Failed to update category:', error)
        throw error
      }
    },

    // 删除分类
    async deleteCategory(id: number) {
      try {
        await $fetch(`/api/categories/${id}`, {
          method: 'DELETE'
        })
        await this.fetchCategories()
      } catch (error) {
        console.error('Failed to delete category:', error)
        throw error
      }
    },

    // 更新分类排序
    async updateSort(id: number, sort: number) {
      try {
        await $fetch(`/api/categories/${id}/sort`, {
          method: 'PUT',
          body: { sort }
        })
        await this.fetchCategories()
      } catch (error) {
        console.error('Failed to update category sort:', error)
        throw error
      }
    }
  }
})
