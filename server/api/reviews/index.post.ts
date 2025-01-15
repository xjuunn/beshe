import { ReviewService } from '~/server/services/review'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { orderId, productId, rating, content, images } = body

  // 获取当前用户
  const user = event.context.user
  if (!user) {
    throw createError({
      statusCode: 401,
      message: '请先登录'
    })
  }

  // 验证评分
  if (rating < 1 || rating > 5) {
    throw createError({
      statusCode: 400,
      message: '评分必须在1-5之间'
    })
  }

  // 验证内容
  if (!content || content.trim().length < 5) {
    throw createError({
      statusCode: 400,
      message: '评价内容至少5个字'
    })
  }

  const reviewService = new ReviewService()
  const review = await reviewService.createReview({
    orderId,
    productId,
    userId: user.id,
    rating,
    content,
    images
  })

  return review
})
