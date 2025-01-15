import { OrderService } from '~/server/services/order'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const orderService = new OrderService()
  return await orderService.getOrders({
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 10,
    status: query.status as any,
    search: query.search as string,
    startDate: query.startDate ? new Date(query.startDate as string) : undefined,
    endDate: query.endDate ? new Date(query.endDate as string) : undefined
  })
})
