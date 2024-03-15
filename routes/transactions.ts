import { FastifyInstance } from "fastify"
import { z } from "zod"
import { randomUUID } from "node:crypto"
import { knex } from "../src/database"
import { checkSessionId } from "../middlewares/check-session-id"

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', 
  {
    preHandler: [checkSessionId]
  }, 
  async (request, response) => {
    const { sessionId } = request.cookies

    const transactions = await knex('transactions')
      .where('session_id', sessionId).select()

    return { transactions }
  })

  app.get('/:id',
  {
    preHandler: [checkSessionId]
  }, 
  async (request, response) => {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = paramsSchema.parse(request.params)
    const { sessionId } = request.cookies

    const transaction = await knex('transactions')
      .where({id, session_id: sessionId}).first()
  
    if (!transaction) return response.status(404).send({ error: 'Not found'})

    return { transaction }
  })

  app.get('/summary',
  {
    preHandler: [checkSessionId]
  }, 
  async (request) => {
    const { sessionId } = request.cookies

    const summary = await knex('transactions').where({ session_id: sessionId })
      .sum('amount', { as: 'amount' }).first()

    return { summary }
  })

  app.post('/', async (request, response) => {    
    const bodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })

    const { title, amount, type } = bodySchema.parse(
      request.body
    )

    let sessionId = request.cookies.sessionId
    const ONEDAY = 86000 // seconds

    if (!sessionId) {
      sessionId = randomUUID()

      response.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: ONEDAY * 7
      })
    }
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return response.status(201).send()
  })
}
