import { defineStore } from 'pinia'
import type { Product } from '@prisma/client'

interface ProductState {
  products: Product[]
  loading: boolean
  totalCount: number
  currentPage: number
  pageSize: number
}

interface ProductQuery {
  page?: number
  limit?: number
  search?: string
  category_id?: number
  status?: 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'DELETED'
}

interface ProductResponse {
  products: Product[]
  pagination: {
    total: number
    page: number
    limit: number
  }
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    loading: false,
    totalCount: 0,
    currentPage: 1,
    pageSize: 10
  }),

  getters: {
    getProductById: (state) => (id: number) => {
      return state.products.find(p => p.id === id)
    }
  },

  actions: {
    // 获取商品列表
    async fetchProducts(query: ProductQuery = {}): Promise<ProductResponse> {
      this.loading = true
      try {
        const response = await $fetch('/api/products', {
          query: {
            page: query.page || this.currentPage,
            limit: query.limit || this.pageSize,
            search: query.search,
            category_id: query.category_id,
            status: query.status || 'ACTIVE'
          }
        })
        
        this.products = response.products
        this.totalCount = response.pagination.total
        this.currentPage = response.pagination.page
        this.pageSize = response.pagination.limit
        
        return response
      } catch (error) {
        console.error('获取商品列表失败:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // 添加商品
    async addProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
      this.loading = true
      try {
        const response = await $fetch('/api/products', {
          method: 'POST',
          body: product
        })
        await this.fetchProducts()
        return response
      } catch (error) {
        console.error('添加商品失败:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // 更新商品
    async updateProduct(id: number, product: Partial<Product>) {
      this.loading = true
      try {
        const response = await $fetch(`/api/products/${id}`, {
          method: 'PUT',
          body: product
        })
        await this.fetchProducts()
        return response
      } catch (error) {
        console.error('更新商品失败:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // 删除商品
    async deleteProduct(id: number) {
      this.loading = true
      try {
        await $fetch(`/api/products/${id}`, {
          method: 'DELETE'
        })
        await this.fetchProducts()
      } catch (error) {
        console.error('删除商品失败:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // 批量更新商品状态
    async batchUpdateStatus(ids: number[], status: 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'DELETED') {
      this.loading = true
      try {
        await $fetch('/api/products/batch', {
          method: 'PATCH',
          body: { ids, status }
        })
        await this.fetchProducts()
      } catch (error) {
        console.error('批量更新商品状态失败:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})