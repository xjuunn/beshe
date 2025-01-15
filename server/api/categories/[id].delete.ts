import { CategoryService } from '~/server/services/category'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  const categoryService = new CategoryService()
  return await categoryService.deleteCategory(id)
})
