import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required')
}

const JWT_SECRET: string = process.env.JWT_SECRET
const SALT_ROUNDS = 10

export class UserService {
  // 创建用户
  static async create(data: {
    username: string
    password: string
    email?: string
    phone?: string
    nickname?: string
  }) {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)

    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword
      },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        role_id: true
      }
    })
  }

  // 验证用户
  static async validate(username: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email: username },
          { phone: username }
        ]
      }
    })

    if (!user) {
      throw new Error('用户不存在')
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new Error('密码错误')
    }

    // 更新最后登录时间
    await prisma.user.update({
      where: { id: user.id },
      data: { 
        last_login_at: new Date()
       }
    })

    return user
  }

  // 生成 JWT token
  static generateToken(user: { id: number; username: string; role_id: number }) {
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role_id
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )
  }

  // 验证 token
  static verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET)
    } catch (error) {
      return null
    }
  }
} 