import { defineStore } from 'pinia'
import type { Order, OrderStatus } from '@prisma/client'
import type { OrderQuery } from '~/server/services/order'

interface OrderState {
  orders: Order[]
  loading: boolean
  totalCount: number
  currentPage: number
  pageSize: number
  orderStats: {
    byStatus: {
      status: OrderStatus
      _count: { id: number }
      _sum: { total: number }
    }[]
    today: {
      count: number
      total: number
    }
  } | null
}

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    orders: [],
    loading: false,
    totalCount: 0,
    currentPage: 1,
    pageSize: 10,
    orderStats: null
  }),

  actions: {
    // 获取订单列表
    async fetchOrders(query: OrderQuery = {}) {
      this.loading = true
      try {
        const response = await $fetch('/api/orders', {
          query: {
            page: query.page || this.currentPage,
            limit: query.limit || this.pageSize,
            ...query
          }
        })
        this.orders = response.orders
        this.totalCount = response.pagination.total
        this.currentPage = response.pagination.page
        this.pageSize = response.pagination.limit
      } catch (error) {
        console.error('Failed to fetch orders:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // 获取单个订单
    async fetchOrder(id: number) {
      try {
        return await $fetch(`/api/orders/${id}`)
      } catch (error) {
        console.error('Failed to fetch order:', error)
        throw error
      }
    },

    // 更新订单状态
    async updateOrderStatus(id: number, status: OrderStatus) {
      try {
        await $fetch(`/api/orders/${id}/status`, {
          method: 'PUT',
          body: { status }
        })
        await this.fetchOrders()
      } catch (error) {
        console.error('Failed to update order status:', error)
        throw error
      }
    },

    // 获取订单统计信息
    async fetchOrderStats() {
      try {
        this.orderStats = await $fetch('/api/orders/stats')
      } catch (error) {
        console.error('Failed to fetch order stats:', error)
        throw error
      }
    }
  }
})
