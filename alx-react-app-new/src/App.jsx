import { useState } from 'react'
import Header from './components/Header'
import UserProfile from './components/UserProfile'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import Counter from './components/Counter'

function App() {
  const [Count, setCount]=useState (0)

  return (
    <div>
      <Header />
      <UserProfile name={user.name} age={user.age} bio={user.bio} />
      <MainContent />
      <Footer />
      <Counter />
    </div>
  )
}

export default App
