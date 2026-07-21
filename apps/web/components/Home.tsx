import { useState, useEffect } from 'react'

import StateList from '@/components/StateList'
import DuplicateStateList from '@/components/DuplicateStateList'
import StateDetails from '@/components/StateDetails'
import styles from './Home.module.scss'

const Home = () => {
  const [currentState, setCurrentState] = useState<number | null>(null)
  const [showDuplicateStateList, setShowDuplicateStateList] = useState(false)

  return (
    <div>
      <h1>States</h1>
      <div className={styles.statesPanel}>
        <StateList onStateClick={(id) => setCurrentState(id)} />
        {showDuplicateStateList && <DuplicateStateList />}
        {currentState && <StateDetails stateId={currentState} />}
      </div>
    </div>
  )
}

export default Home
