import { PrismaClient, Prisma } from '@prisma/client'
import { Product } from '~/types/product'
const prisma = new PrismaClient()

export interface ProductCreateInput {
  name: string
  description?: string
  price: number
  stock: number
  image?: string
  category_id: number
}

export interface ProductUpdateInput {
  name?: string
  description?: string
  price?: number
  stock?: number
  image?: string
  category_id?: number
  status?: 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'DELETED'
}

export interface ProductQuery {
  page?: number
  limit?: number
  search?: string
  category_id?: number
  status?: 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'DELETED'
}

export class ProductService {
  // 创建商品
  async createProduct(data: ProductCreateInput): Promise<Product> {
    return prisma.product.create({
      data: {
        ...data,
        price: new Decimal(data.price)
      }
    })
  }

  // 更新商品
  async updateProduct(id: number, data: ProductUpdateInput): Promise<Product> {
    return prisma.product.update({
      where: { id },
      data: {
        ...data,
        price: data.price ? new Decimal(data.price) : undefined
      }
    })
  }

  // 删除商品
  async deleteProduct(id: number): Promise<Product> {
    return prisma.product.update({
      where: { id },
      data: { status: 'DELETED' }
    })
  }

  // 获取商品列表
  async getProducts(query: ProductQuery) {
    const { page = 1, limit = 10, search, category_id, status = 'ACTIVE' } = query
    const skip = (page - 1) * limit

    const where: Prisma.ProductWhereInput = {
      status,
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } }
        ]
      }),
      ...(category_id && { category_id })
    }

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        include: {
          category: true
        },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' }
      })
    ])

    return {
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  // 获取单个商品
  async getProduct(id: number): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true
      }
    })
  }

  // 批量更新商品状态
  async batchUpdateStatus(ids: number[], status: 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'DELETED'): Promise<number> {
    const result = await prisma.product.updateMany({
      where: { id: { in: ids } },
      data: { status }
    })
    return result.count
  }
}
