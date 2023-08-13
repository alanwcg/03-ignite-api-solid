import { FastifyInstance } from 'fastify'
import { register } from './register-controller'
import { authenticate } from './authenticate-controller'
import { profile } from './profile-controller'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { refreshToken } from '@/http/controllers/users/refresh-token-controller'

export async function usersRoutes(app: FastifyInstance): Promise<void> {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refreshToken)

  // Authenticated Routes
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
