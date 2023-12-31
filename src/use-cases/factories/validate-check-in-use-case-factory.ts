import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInUseCase } from '@/use-cases/validate-check-in-use-case'

export function makeValidateCheckInUseCase(): ValidateCheckInUseCase {
  const checkInsRepository = new PrismaCheckInsRepository()
  return new ValidateCheckInUseCase(checkInsRepository)
}
