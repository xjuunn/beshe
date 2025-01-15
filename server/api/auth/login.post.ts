import { UserService } from '~/server/services/user.service'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // 验证请求体
    if (!body.username || !body.password) {
      return {
        code: 400,
        message: '用户名和密码不能为空'
      }
    }

    const { username, password } = body
    
    // 验证用户
    const user = await UserService.validate(username, password)
    
    // 生成 token
    const token = UserService.generateToken(user)

    return {
      code: 200,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          role: user.role_id
        }
      }
    }
  } catch (error: any) {
    return {
      code: 400,
      message: error.message || '登录失败'
    }
  }
})