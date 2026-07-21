import { render, screen, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import StateDetails from '@/components/StateDetails'

const mockState = {
  id: 1,
  name: 'Test State',
  population: 1000,
  counties: [
    { id: 1, name: 'County 1', population: 500 },
    { id: 2, name: 'County 2', population: 500 },
  ],
}

const mockState2 = {
  id: 2,
  name: 'Alabama',
  population: 1000,
  counties: [
    { id: 1, name: 'County 1', population: 200 },
    { id: 2, name: 'County 2', population: 600 },
  ],
}

describe('StateDetails Component', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockState),
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state when stateId is null', () => {
    render(<StateDetails stateId={null} />)
    const loadingElement = screen.getByText(/Loading.../i)
    expect(loadingElement).toBeInTheDocument()
  })

  it('fetches and displays state details', async () => {
    render(<StateDetails stateId={1} />)
    
    await waitFor(() => {
      expect(screen.getByText(/Test State Details/i)).toBeInTheDocument()
      expect(screen.getByText(/State population: 1000/i)).toBeInTheDocument()
      expect(screen.getByText(/Counties: 2/i)).toBeInTheDocument()
      expect(screen.getByText(/Sum of county population: 1000/i)).toBeInTheDocument()
      expect(screen.getByText(/Total population matches the sum of county population: Yes/i)).toBeInTheDocument()
      expect(screen.getByText(/County 1 - Population: 500/i)).toBeInTheDocument()
      expect(screen.getByText(/County 2 - Population: 500/i)).toBeInTheDocument()
    })
  })

  it('evaluates state details', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockState2),
    })

    render(<StateDetails stateId={2} />)
    
    await waitFor(() => {
      expect(screen.getByText(/Alabama Details/i)).toBeInTheDocument()
      expect(screen.getByText(/State population: 1000/i)).toBeInTheDocument()
      expect(screen.getByText(/Counties: 2/i)).toBeInTheDocument()
      expect(screen.getByText(/Sum of county population: 800/i)).toBeInTheDocument()
      expect(screen.getByText(/Total population matches the sum of county population: No/i)).toBeInTheDocument()
      expect(screen.getByText(/County 1 - Population: 200/i)).toBeInTheDocument()
      expect(screen.getByText(/County 2 - Population: 600/i)).toBeInTheDocument()
    })
  })
})
