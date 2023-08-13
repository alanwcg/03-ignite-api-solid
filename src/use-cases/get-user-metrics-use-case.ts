import { CheckInsRepository } from '@/repositories/check-ins-repository'

type Params = {
  userId: string
}

type Result = {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  async execute({ userId }: Params): Promise<Result> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
