import { OrderService } from '~/server/services/order'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  const orderService = new OrderService()
  return await orderService.getOrder(id)
})
