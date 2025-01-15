import type { Product as PrismaProduct } from '@prisma/client'

// 商品状态
export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'DELETED'

// 商品类型
export interface Product extends PrismaProduct {}

// 创建商品的输入类型
export interface ProductCreateInput {
  name: string
  description?: string
  price: number
  stock: number
  image?: string
  category_id: number
}

// 更新商品的输入类型
export interface ProductUpdateInput {
  name?: string
  description?: string
  price?: number
  stock?: number
  image?: string
  category_id?: number
  status?: ProductStatus
}

// 商品查询参数
export interface ProductQuery {
  page?: number
  limit?: number
  search?: string
  category_id?: number
  status?: ProductStatus
}

// 商品分页响应
export interface ProductPaginationResponse {
  products: Product[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}