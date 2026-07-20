import { render, screen, waitFor } from '@testing-library/react'
import { vi, beforeEach, describe, it, expect, afterEach } from 'vitest'
import Home from '@/components/Home'

describe('Home Component', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders h1 "States"', () => {
    render(<Home />)
    const headingElement = screen.getByText(/States/i)
    expect(headingElement).toBeInTheDocument()
    expect(headingElement.tagName).toBe('H1')
  })

  it('fetches and displays states', async () => {
    const mockStates = [
      { id: 1, name: 'State 1', population: 1000 },
      { id: 2, name: 'State 2', population: 2000 },
    ]

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockStates),
    })

    render(<Home />)

    for (const state of mockStates) {
      await waitFor(() => {
        expect(screen.getByText(new RegExp(`${state.name}.*${state.population}`))).toBeInTheDocument()
      })
    }
  })
})
