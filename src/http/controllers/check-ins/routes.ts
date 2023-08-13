import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { create } from '@/http/controllers/check-ins/create-controller'
import { validate } from '@/http/controllers/check-ins/validate-controller'
import { history } from '@/http/controllers/check-ins/history-controller'
import { metrics } from '@/http/controllers/check-ins/metrics-controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', verifyJwt)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)
}
