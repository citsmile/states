import { useDoubleClick } from '@/hooks/useDoubleClick'

const StateList = ({
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
      <h2>State List</h2>
      <ul>
        {states.map(
          (state: { id: number; name: string; population: number }) => (
            <li
              key={state.id}
              onClick={() => handleClick(state.id)}
              style={{ cursor: 'pointer' }}
            >
              {state.name} ({state.population})
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default StateList
