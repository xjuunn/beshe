import { CategoryService } from '~/server/services/category'

export default defineEventHandler(async (event) => {
  const categoryService = new CategoryService()
  return await categoryService.getCategories()
})
