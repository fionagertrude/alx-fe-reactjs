import ProfilePage from './components/ProfiulePage';
import UserProfile from './components/UserProfile';
import UserContext from './components/UserContext';

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };
  return (
      <UserContext.Provider value={userData}>
                <ProfilePage />
        <UserProfile />
      </UserContext.Provider>
 
  );
}

export default App;