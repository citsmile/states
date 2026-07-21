import { useEffect, useState } from 'react'

const StateList = ({
  states,
  onStateClick,
  onStateHighlight,
}: {
  states: { id: number; name: string; population: number }[]
  onStateClick: (id: number) => void
  onStateHighlight: (id: number) => void
}) => {
  const [currentId, setCurrentId] = useState<number | null>(null)
  const [clicks, setClicks] = useState<number>(0)

  useEffect(() => {
    if (clicks == 1) {
      const timer = setTimeout(() => {
        if (currentId) onStateClick(currentId)
        setClicks(0)
      }, 200)
      return () => clearTimeout(timer)
    }
    if (clicks == 2) {
      if (currentId) onStateHighlight(currentId)
      setClicks(0)
    }
  }, [clicks])

  const handleClick = (id: number) => {
    setCurrentId(id)
    setClicks(clicks + 1)
  }

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
