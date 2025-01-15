import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export interface CategoryCreateInput {
  name: string
  description?: string
  image?: string
  sort?: number
}

export interface CategoryUpdateInput {
  name?: string
  description?: string
  image?: string
  sort?: number
}

export class CategoryService {
  // 创建分类
  async createCategory(data: CategoryCreateInput) {
    return prisma.category.create({
      data
    })
  }

  // 更新分类
  async updateCategory(id: number, data: CategoryUpdateInput) {
    return prisma.category.update({
      where: { id },
      data
    })
  }

  // 删除分类
  async deleteCategory(id: number) {
    // 检查分类下是否有商品
    const productCount = await prisma.product.count({
      where: { category_id: id }
    })

    if (productCount > 0) {
      throw new Error('该分类下还有商品，无法删除')
    }

    return prisma.category.delete({
      where: { id }
    })
  }

  // 获取分类列表
  async getCategories() {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { created_at: 'desc' }
    })

    return categories.map(category => ({
      ...category,
      productCount: category._count.products
    }))
  }

  // 获取单个分类
  async getCategory(id: number) {
    return prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    })
  }

  // 更新分类排序
  async updateSort(id: number, sort: number) {
    return prisma.category.update({
      where: { id },
      data: { sort }
    })
  }
}
