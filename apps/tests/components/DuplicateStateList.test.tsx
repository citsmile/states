import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import DuplicateStateList from '@/components/DuplicateStateList'

const mockStates = [
  { id: 1, name: 'Maine', population: 100 },
  { id: 2, name: 'Nevada', population: 200 },
  { id: 3, name: 'Montana', population: 300 },
]

describe('DuplicateStateList Component', () => {
  const onSingleClick = vi.fn()
  const onDblClick = vi.fn()

  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('renders all states initially', () => {
    render(
      <DuplicateStateList
        states={mockStates}
        onSingleClick={onSingleClick}
        onDblClick={onDblClick}
      />
    )
    expect(screen.getByText('Maine (100)')).toBeInTheDocument()
    expect(screen.getByText('Nevada (200)')).toBeInTheDocument()
    expect(screen.getByText('Montana (300)')).toBeInTheDocument()
  })

  it('filters states based on search term', () => {
    render(
      <DuplicateStateList
        states={mockStates}
        onSingleClick={onSingleClick}
        onDblClick={onDblClick}
      />
    )
    const searchInput = screen.getByTestId('state-search')
    fireEvent.change(searchInput, { target: { value: 'ne' } })

    expect(screen.getByText('Maine (100)')).toBeInTheDocument()
    expect(screen.getByText('Nevada (200)')).toBeInTheDocument()
    expect(screen.queryByText('Montana (300)')).not.toBeInTheDocument()
  })
})
