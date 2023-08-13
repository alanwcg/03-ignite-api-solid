import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

type Params = {
  query: string
  page: number
}

type Result = {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({ query, page }: Params): Promise<Result> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}
