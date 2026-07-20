import { render, screen } from '@testing-library/react'
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
})
