import Header from './components/Header'
import UserProfile from './components/UserProfile'
import MainContent from './components/MainContent'
import Footer from './components/Footer'

function App() {
  const user = {
    name: "John Doe",
    age: 30,
    bio: "Software developer and travel enthusiast."
  }

  return (
    <div>
      <Header />
      <UserProfile name={user.name} age={user.age} bio={user.bio} />
      <MainContent />
      <Footer />
    </div>
  )
}

export default App
