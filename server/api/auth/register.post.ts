import { UserService } from '~/server/services/user.service'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // 验证必填字段
    if (!body.username || !body.password) {
      throw new Error('用户名和密码不能为空')
    }

    // 创建用户
    const user = await UserService.create(body)
    
    // 生成 token
    const token = UserService.generateToken(user)

    return {
      code: 200,
      data: {
        token,
        user
      }
    }
  } catch (error: any) {
    return {
      code: 400,
      message: error.message
    }
  }
}) 