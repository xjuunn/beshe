import { PrismaClient, OrderStatus } from '@prisma/client'
const prisma = new PrismaClient()

export interface OrderQuery {
  page?: number
  limit?: number
  status?: OrderStatus
  search?: string
  startDate?: Date
  endDate?: Date
}

export class OrderService {
  // 获取订单列表
  async getOrders(query: OrderQuery) {
    const { page = 1, limit = 10, status, search, startDate, endDate } = query
    const skip = (page - 1) * limit

    const where = {
      ...(status && { status }),
      ...(search && {
        OR: [
          { user: { username: { contains: search } } },
          { user: { nickname: { contains: search } } }
        ]
      }),
      ...(startDate && endDate && {
        created_at: {
          gte: startDate,
          lte: endDate
        }
      })
    }

    const [total, orders] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              nickname: true,
              phone: true
            }
          },
          items: {
            include: {
              product: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' }
      })
    ])

    return {
      orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }

  // 获取单个订单
  async getOrder(id: number) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            nickname: true,
            phone: true
          }
        },
        items: {
          include: {
            product: true
          }
        }
      }
    })
  }

  // 更新订单状态
  async updateOrderStatus(id: number, status: OrderStatus) {
    return prisma.order.update({
      where: { id },
      data: { status }
    })
  }

  // 获取订单统计信息
  async getOrderStats() {
    const stats = await prisma.order.groupBy({
      by: ['status'],
      _count: {
        id: true
      },
      _sum: {
        total: true
      }
    })

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const todayEnd = new Date()
    todayEnd.setHours(23, 59, 59, 999)

    const todayStats = await prisma.order.aggregate({
      where: {
        created_at: {
          gte: todayStart,
          lte: todayEnd
        }
      },
      _count: {
        id: true
      },
      _sum: {
        total: true
      }
    })

    return {
      byStatus: stats,
      today: {
        count: todayStats._count.id,
        total: todayStats._sum.total
      }
    }
  }
}
