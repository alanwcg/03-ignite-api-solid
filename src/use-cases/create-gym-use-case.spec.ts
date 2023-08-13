import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from '@/use-cases/create-gym-use-case'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('CreateGymUseCase', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -8.2744359,
      longitude: -35.9736615,
    })

    expect(gym.id).toBeTruthy()
  })
})
