import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

type Params = {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

type Result = {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: Params): Promise<Result> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
