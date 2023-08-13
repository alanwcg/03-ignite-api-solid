import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/check-in-use-case-factory'

export async function create(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const paramsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const bodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = paramsSchema.parse(request.params)
  const { latitude, longitude } = bodySchema.parse(request.body)

  const checkInUseCase = makeCheckInUseCase()

  await checkInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send()
}
