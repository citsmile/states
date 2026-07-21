import { useEffect, useState } from 'react'

const StateList = ({
  onStateClick,
}: {
  onStateClick: (id: number) => void
}) => {
  const [states, setStates] = useState([])
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(`${apiUrl}/states`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setStates(data)
      } catch (error) {
        console.error('Error fetching states:', error)
      }
    }

    fetchStates()
  }, [])

  return (
    <div>
      <h2>State List</h2>
      <ul>
        {states.map((state: any) => (
          <li
            key={state.id}
            onClick={() => onStateClick(state.id)}
            style={{ cursor: 'pointer' }}
          >
            {state.name} ({state.population})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StateList
