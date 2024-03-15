import { FastifyInstance } from "fastify"
import { z } from "zod"
import { randomUUID } from "node:crypto"
import { knex } from "../src/database"

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions').select()

    return { transactions }
  })

  app.get('/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(request.params)

    const transaction = await knex('transactions').where('id', id).first()

    return { transaction }
  })

  app.get('/summary', async () => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' }).first()

    return { summary }
  })

  app.post('/', async (request, response) => {
    // { title, amount, type: credit ou debit }
    
    const bodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })

    const { title, amount, type } = bodySchema.parse(
      request.body
    )

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1
    })

    return response.status(201).send()
  })
}
