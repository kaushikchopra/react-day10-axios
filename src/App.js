import UserData from './components/UserData'
import UserState from './context/UserState';
import "./css/Responsive.css";

function App() {
  return (
    <>
      <UserState>
        <UserData />
      </UserState>
    </>
  );
}

export default App;
