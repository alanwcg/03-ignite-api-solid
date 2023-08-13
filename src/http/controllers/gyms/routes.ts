import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { create } from '@/http/controllers/gyms/create-controller'
import { search } from '@/http/controllers/gyms/search-controller'
import { nearby } from '@/http/controllers/gyms/nearby-controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', verifyJwt)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
