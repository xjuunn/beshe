import { UserService } from '../services/user.service'

interface User {
  id: number
  username: string
  role: number
}

export default defineEventHandler(async (event) => {
  try {
    const token = event.node.req.headers.authorization?.replace('Bearer ', '')
    
    if (token) {
      const user = UserService.verifyToken(token) as User | null
      if (user) {
        event.context.user = user
      }
    }
  } catch (error) {
    console.error('Auth middleware error:', error)
  }
})