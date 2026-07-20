import { useEffect, useState } from 'react'

const StateList = () => {
  const [states, setStates] = useState([])

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/states')
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
          <li key={state.id}>{state.name} ({state.population})</li>
        ))}
      </ul>
    </div>
  )
}

export default StateList
