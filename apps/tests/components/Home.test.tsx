import {
  render,
  screen,
  waitFor,
  fireEvent,
  within,
} from '@testing-library/react'
import { vi, beforeEach, describe, it, expect, afterEach } from 'vitest'
import Home from '@/components/Home'

const mockStates = [
  { id: 1, name: 'State 1', population: 1000 },
  { id: 2, name: 'State 2', population: 2000 },
]

describe('Home Component', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockStates),
    })
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
    render(<Home />)
    for (const state of mockStates) {
      await waitFor(() => {
        expect(
          screen.getByText(new RegExp(`${state.name}.*${state.population}`))
        ).toBeInTheDocument()
      })
    }
  })

  it('clicks on a state and displays state details', async () => {
    const mockStateDetails = {
      id: 1,
      name: 'State 1',
      population: 1000,
      counties: [{ id: 1, name: 'County 1', population: 500 }],
    }

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockStates),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue(mockStateDetails),
      })

    render(<Home />)

    const stateElement = await screen.findByText(/State 1 \(1000\)/i)
    stateElement.click()

    await waitFor(() => {
      expect(screen.getByText(/State 1 Details/i)).toBeInTheDocument()
      expect(
        screen.getByText(/County 1 - Population: 500/i)
      ).toBeInTheDocument()
    })
  })

  it('double clicking a state highlights it and does not open details', async () => {
    render(<Home />)
    const stateElements = await screen.findAllByText(/State 1 \(1000\)/i)
    const stateElement = stateElements[0]

    fireEvent.click(stateElement)
    fireEvent.click(stateElement)

    await waitFor(() => {
      const duplicateList = screen.getByText(/Duplicate State List/i)
      expect(
        within(duplicateList.parentElement!).getByText(/State 1 \(1000\)/i)
      ).toBeInTheDocument()
    })

    expect(screen.queryByText(/Details/i)).not.toBeInTheDocument()

    fireEvent.click(stateElement)
    fireEvent.click(stateElement)

    await waitFor(() => {
      expect(
        screen.queryByText(/Duplicate State List/i)
      ).not.toBeInTheDocument()
    })
  })
})
