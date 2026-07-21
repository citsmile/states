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
  const { handleClick } = useDoubleClick(onSingleClick, onDblClick)

  return (
    <div>
      <h2>Duplicate State List</h2>
      <ul data-testid='duplicate-state-list'>
        {states.map((state) => (
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
