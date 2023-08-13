/* eslint-disable */
require('dotenv/config')
const { randomUUID } = require('node:crypto')
const { execSync } = require('node:child_process')
const { PrismaClient } = require('@prisma/client')

// postgresql://docker:docker@localhost:5432/apisolid?schema=public

const prisma = new PrismaClient()

function generateDatabaseURL(schema) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

module.exports = {
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$queryRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        )
        
        await prisma.$disconnect()
      },
    }
  },
}
