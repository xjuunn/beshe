import { CategoryService } from '~/server/services/category'
import type { CategoryUpdateInput } from '~/server/services/category'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  const body = await readBody(event) as CategoryUpdateInput
  const categoryService = new CategoryService()
  return await categoryService.updateCategory(id, body)
})
