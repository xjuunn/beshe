import { ReviewService } from '~/server/services/review'

export default defineEventHandler(async (event) => {
  // 获取当前用户
  const user = event.context.user
  if (!user) {
    throw createError({
      statusCode: 401,
      message: '请先登录'
    })
  }

  const id = event.context.params.id
  const reviewService = new ReviewService()
  await reviewService.deleteReview(id)

  return { success: true }
})
