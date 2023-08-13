import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from '@/use-cases/fetch-nearby-gyms-use-case'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('FetchNearbyGymsUseCase', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      id: 'gym-1',
      title: 'Near Gym',
      description: '',
      phone: '',
      latitude: -7.9535167,
      longitude: -36.2088308,
    })

    await gymsRepository.create({
      id: 'gym-2',
      title: 'Far Gym',
      description: '',
      phone: '',
      latitude: -8.2744359,
      longitude: -35.9736615,
    })

    const { gyms } = await sut.execute({
      userLatitude: -7.9535167,
      userLongitude: -36.2088308,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'gym-1' })]),
    )
  })

  // it('should be able to fetch paginated gyms search', async () => {
  //   for (let i = 1; i <= 22; i++) {
  //     await gymsRepository.create({
  //       id: `gym-${i}`,
  //       title: 'JavaScript Gym',
  //       description: '',
  //       phone: '',
  //       latitude: 0,
  //       longitude: 0,
  //     })
  //   }

  //   const { gyms } = await sut.execute({
  //     query: 'JavaScript',
  //     page: 2,
  //   })

  //   expect(gyms).toHaveLength(2)
  //   expect(gyms).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining({ id: 'gym-21' }),
  //       expect.objectContaining({ id: 'gym-22' }),
  //     ]),
  //   )
  // })
})
