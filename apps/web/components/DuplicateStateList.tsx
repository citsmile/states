import { useState } from 'react'
import { useDoubleClick } from '@/hooks/useDoubleClick'

const DuplicateStateList = ({
  states,
  onSingleClick,
  onDblClick,
}: {
  states: { id: number; name: string; population: number }[]
  onSingleClick: (id: number) => void
  onDblClick: (id: number) => void
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { handleClick } = useDoubleClick(onSingleClick, onDblClick)

  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Duplicate State List</h2>
      <input
        type="text"
        placeholder="Search states..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        data-testid="state-search"
      />
      <ul data-testid="duplicate-state-list">
        {filteredStates.map((state) => (
          <li
            key={state.id}
            onClick={() => handleClick(state.id)}
            style={{ cursor: 'pointer' }}
          >
            {state.name} ({state.population})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DuplicateStateList
