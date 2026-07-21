import { useEffect, useState } from 'react'

interface County {
  id: number
  name: string
  population: number
}

interface State {
  id: number
  name: string
  population: number
  counties: County[]
}

const StateDetails = ({ stateId }: { stateId: number | null }) => {
  const [state, setState] = useState<State | null>(null)
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    if (!stateId) {
      setState(null)
      return
    }

    const fetchStateDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/states/${stateId}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setState(data)
      } catch (error) {
        console.error('Error fetching state details:', error)
      }
    }

    fetchStateDetails()
  }, [stateId])

  if (!state) return <div>Loading...</div>

  const sumOfCountyPopulation = state.counties.reduce(
    (sum, county) => sum + county.population,
    0
  )

  const populationMatches = sumOfCountyPopulation === state.population
  const populationMatchText = populationMatches ? 'Yes' : 'No'

  return (
    <div>
      <h2>{state.name} Details</h2>
      <h3>State population: {state.population}</h3>
      <p>Counties: {state.counties.length}</p>
      <p>Sum of county population: {sumOfCountyPopulation}</p>
      <p>
        Total population matches the sum of county population:{' '}
        {populationMatchText}
      </p>
      <ul>
        {state.counties.map((county) => (
          <li key={county.id}>
            {county.name} - Population: {county.population}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StateDetails
