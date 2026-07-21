import { test, expect } from '@playwright/test'
import 'dotenv/config'
import { prisma } from '../prisma/prisma'

test.beforeAll(async () => {
  await prisma.county.deleteMany()
  await prisma.state.deleteMany()
  await prisma.state.createMany({
    data: [
      { name: 'State A', population: 100 },
      { name: 'State B', population: 200 },
      { name: 'State C', population: 300 },
    ],
  })
})

test('has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/States App/)
})

test('shows states', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('State A (100)')).toBeVisible()
  await expect(page.getByText('State B (200)')).toBeVisible()
  await expect(page.getByText('State C (300)')).toBeVisible()
})

test('clicks on a state and shows details', async ({ page }) => {
  await page.goto('/')
  await page.getByText('State A (100)').click()
  await expect(page.getByText('State A Details')).toBeVisible()
})
