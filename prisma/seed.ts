import { prisma } from './prisma'
import fs from 'fs'
import path from 'path'

export async function seed() {
  console.log('Seeding database...')
  const usaStatesPath = path.join(__dirname, 'fixtures/usa-states/USA-states.json')
  const usaStatesData = JSON.parse(fs.readFileSync(usaStatesPath, 'utf-8'))

  for (const stateItem of usaStatesData) {
    const { state: stateName, population } = stateItem

    console.log(`Processing state: ${stateName}`)
    const state = await prisma.state.create({
      data: {
        name: stateName,
        population: population,
      },
    })

    const countyFilePath = path.join(__dirname, 'fixtures/states', `${stateName}.json`)
    if (fs.existsSync(countyFilePath)) {
      const countyData = JSON.parse(fs.readFileSync(countyFilePath, 'utf-8'))      
      const countyEntries = countyData.map((c: any) => ({
        stateId: state.id,
        name: c.county,
        population: c.population,
      }))

      await prisma.county.createMany({ data: countyEntries })
    } else {
      console.warn(`County file not found for: ${stateName}`)
    }
  }
  console.log('Seeding complete.')
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
