import { OrderService } from '~/server/services/order'

export default defineEventHandler(async () => {
  const orderService = new OrderService()
  return await orderService.getOrderStats()
})
