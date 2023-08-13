import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

type Params = {
  userLatitude: number
  userLongitude: number
}

type Result = {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({ userLatitude, userLongitude }: Params): Promise<Result> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
