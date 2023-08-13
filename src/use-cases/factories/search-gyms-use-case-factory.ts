import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCase } from '@/use-cases/search-gyms-use-case'

export function makeSearchGymsUseCase(): SearchGymsUseCase {
  const gymsRepository = new PrismaGymsRepository()
  return new SearchGymsUseCase(gymsRepository)
}
