import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { prisma } from '../../prisma/prisma'

const app = express()
const PORT = process.env.PORT || 3000

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.get('/api/states', async (req, res) => {
  const states = await prisma.state.findMany()
  res.json(states)
})

app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`)
})
