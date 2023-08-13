import request from 'supertest'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'

type Result = {
  token: string
}

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  role: 'ADMIN' | 'MEMBER',
): Promise<Result> {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: await hash('123456', 6),
      role,
    },
  })

  const auth = await request(app.server).post('/sessions').send({
    email: 'johndoe@mail.com',
    password: '123456',
  })

  const { token } = auth.body

  return {
    token,
  }
}
