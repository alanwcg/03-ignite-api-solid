import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/validate-check-in-use-case-factory'

export async function validate(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const paramsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = paramsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
