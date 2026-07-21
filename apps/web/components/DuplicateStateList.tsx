const DuplicateStateList = ({
  states,
}: {
  states: { id: number; name: string; population: number }[]
}) => {
  return (
    <div>
      <h2>Duplicate State List</h2>
      <ul>
        {states.map((state) => (
          <li key={state.id}>
            {state.name} ({state.population})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DuplicateStateList
