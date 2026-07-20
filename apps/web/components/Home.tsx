import StateList from './StateList'
import DuplicateStateList from './DuplicateStateList'
import StateDetails from './StateDetails'

const Home = () => {
  return (
    <div>
      <h1>States</h1>
      <StateList />
      <DuplicateStateList />
      <StateDetails />
    </div>
  )
}

export default Home
