import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'
import { prisma } from '../../prisma/prisma'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.get('/states', async (req, res) => {
  const states = await prisma.state.findMany()
  res.json(states)
})

app.get('/states/:id', async (req, res) => {
  const { id } = req.params
  const state = await prisma.state.findUnique({
    where: { id: parseInt(id) },
    include: { counties: true },
  })
  if (!state) {
    return res.status(404).json({ error: 'State not found' })
  }
  res.json(state)
})

app.use(express.static(path.join(__dirname, '../web/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../web/dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`)
})
