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
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.get('/states', async (req, res) => {
  const states = await prisma.state.findMany()
  res.json(states)
})

app.use(express.static(path.join(__dirname, '../web/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../web/dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`)
})
