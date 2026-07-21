import { useState, useEffect } from 'react'

import StateList from '@/components/StateList'
import DuplicateStateList from '@/components/DuplicateStateList'
import StateDetails from '@/components/StateDetails'
import styles from './Home.module.scss'

interface State {
  id: number
  name: string
  population: number
}

const Home = () => {
  const [states, setStates] = useState<State[]>([])
  const [highlightedStates, setHighlightedStates] = useState<State[]>([])
  const [currentState, setCurrentState] = useState<number | null>(null)
  const [showDuplicateStateList, setShowDuplicateStateList] = useState(false)
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

  useEffect(() => {
    setShowDuplicateStateList(highlightedStates.length > 0)
  }, [highlightedStates])

  const highlightState = (stateId: number) => {
    const stateExists = highlightedStates.find((state) => state.id === stateId)
    if (stateExists) {
      setHighlightedStates(
        highlightedStates.filter((state) => state.id !== stateId)
      )
    } else {
      setHighlightedStates([
        ...highlightedStates,
        states.find((state) => state.id === stateId)!,
      ])
    }
  }

  return (
    <div className={styles.homeContainer}>
      <h1>States</h1>
      <div className={styles.statesPanel}>
        <StateList
          states={states}
          onSingleClick={(id) => setCurrentState(id)}
          onDblClick={(id) => highlightState(id)}
        />
        {showDuplicateStateList && (
          <DuplicateStateList
            states={highlightedStates}
            onSingleClick={(id) => setCurrentState(id)}
            onDblClick={(id) => highlightState(id)}
          />
        )}
        {currentState && <StateDetails stateId={currentState} />}
      </div>
    </div>
  )
}

export default Home
