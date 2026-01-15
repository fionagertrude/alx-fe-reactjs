import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

function App() {
  const user = {
    name: "Alex Johnson",
    age: 28,
    bio: "Passionate traveler who has visited over 30 countries. Love exploring new cultures, trying local cuisines, and capturing beautiful moments through photography.",
    hobbies: "Photography, Hiking, Cooking",
    location: "New York, USA"
  };

  return (
    <div className="App">
      <Header />
      <UserProfile 
        name={user.name}
        age={user.age}
        bio={user.bio}
        hobbies={user.hobbies}
        location={user.location}
      />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
