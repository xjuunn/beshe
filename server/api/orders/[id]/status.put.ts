import { OrderService } from '~/server/services/order'
import type { OrderStatus } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  const { status } = await readBody(event)
  const orderService = new OrderService()
  return await orderService.updateOrderStatus(id, status as OrderStatus)
})
