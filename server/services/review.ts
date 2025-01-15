import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class ReviewService {
  // 创建评价
  async createReview(data: {
    orderId: string
    productId: string
    userId: string
    rating: number
    content: string
    images?: string[]
  }) {
    return await prisma.review.create({
      data: {
        orderId: data.orderId,
        productId: data.productId,
        userId: data.userId,
        rating: data.rating,
        content: data.content,
        images: data.images || [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  }

  // 获取商品评价列表
  async getProductReviews(productId: string, page = 1, pageSize = 10) {
    const [total, reviews] = await Promise.all([
      prisma.review.count({
        where: { productId }
      }),
      prisma.review.findMany({
        where: { productId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize
      })
    ])

    return {
      total,
      items: reviews,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    }
  }

  // 获取评价统计
  async getProductReviewStats(productId: string) {
    const reviews = await prisma.review.findMany({
      where: { productId },
      select: { rating: true }
    })

    const totalRatings = reviews.length
    const ratingSum = reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalRatings > 0 ? ratingSum / totalRatings : 0

    const ratingDistribution = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length
    }

    return {
      totalRatings,
      averageRating,
      ratingDistribution
    }
  }

  // 获取用户的评价列表
  async getUserReviews(userId: string, page = 1, pageSize = 10) {
    const [total, reviews] = await Promise.all([
      prisma.review.count({
        where: { userId }
      }),
      prisma.review.findMany({
        where: { userId },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize
      })
    ])

    return {
      total,
      items: reviews,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    }
  }

  // 删除评价
  async deleteReview(id: string) {
    return await prisma.review.delete({
      where: { id }
    })
  }
}
