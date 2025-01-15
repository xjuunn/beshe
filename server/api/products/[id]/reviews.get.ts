import { ReviewService } from '~/server/services/review'

export default defineEventHandler(async (event) => {
  const productId = event.context.params.id
  const query = getQuery(event)
  const page = parseInt(query.page as string) || 1
  const pageSize = parseInt(query.pageSize as string) || 10

  const reviewService = new ReviewService()
  const reviews = await reviewService.getProductReviews(productId, page, pageSize)

  return reviews
})
