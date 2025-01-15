import { CategoryService } from '~/server/services/category'
import type { CategoryCreateInput } from '~/server/services/category'

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as CategoryCreateInput
  const categoryService = new CategoryService()
  return await categoryService.createCategory(body)
})
