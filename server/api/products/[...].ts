import { ProductService } from '~/server/services/product'

const productService = new ProductService()

export default defineEventHandler(async (event) => {
  const method = event.method
  const context = event.context

  // 检查管理员权限的中间件
  const checkAdmin = () => {
    const user = context.user
    if (!user || user.role !== 'ADMIN') {
      throw createError({
        statusCode: 403,
        message: '需要管理员权限'
      })
    }
  }

  // GET /api/products - 获取商品列表
  if (method === 'GET') {
    const query = getQuery(event)
    return await productService.getProducts({
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      search: query.search?.toString(),
      category_id: query.category_id ? Number(query.category_id) : undefined,
      status: query.status?.toString() as any
    })
  }

  // POST /api/products - 创建商品
  if (method === 'POST') {
    checkAdmin()
    const body = await readBody(event)
    return await productService.createProduct(body)
  }

  // PUT /api/products/:id - 更新商品
  if (method === 'PUT') {
    checkAdmin()
    const id = Number(getRouterParam(event, 'id'))
    if (!id || isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: '无效的商品ID'
      })
    }
    const body = await readBody(event)
    return await productService.updateProduct(id, body)
  }

  // DELETE /api/products/:id - 删除商品
  if (method === 'DELETE') {
    checkAdmin()
    if (!event.context?.params?.id) {
      throw createError({
        statusCode: 400,
        message: '商品ID不能为空'
      })
    }
    const id = Number(event.context.params.id)
    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        message: '无效的商品ID'
      })
    }
    return await productService.deleteProduct(id)
  }

  // PATCH /api/products/batch - 批量更新商品状态
  if (method === 'PATCH') {
    checkAdmin()
    if (!event.context?.params?.id) {
      throw createError({
        statusCode: 400,
        message: '参数不能为空'
      })
    }
    if (event.context.params.id === 'batch') {
      const { ids, status } = await readBody(event)
      return await productService.batchUpdateStatus(ids, status)
    }
  }

  throw createError({
    statusCode: 404,
    message: '接口不存在'
  })
})
