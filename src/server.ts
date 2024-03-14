import fastify from 'fastify'
import { knex } from './database'
import { env } from './env/index'

const app = fastify()

app.get('/hello', async () => {
  const transactions = await knex('transactions')
  .where('amount', 500)
  .select('*')

  return transactions
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running')
  })