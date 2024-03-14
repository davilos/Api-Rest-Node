import { FastifyInstance } from "fastify"
import { knex } from "../src/database"

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/hello', async () => {
    return await knex('transactions').where('amount', 1000).select('*')
  })
}
