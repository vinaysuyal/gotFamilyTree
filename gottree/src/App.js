import { useContext } from "react";
import "./App.css";
import LoginPage from "./Components/LoginPage";
import GameOfThronesPage from "./Components/Page/GotPage";
import { AuthContext } from "./context/authContext";

function App() {
  const authContext = useContext(AuthContext);
  console.log(authContext.isUserLoggedIn);
  return (
    <div className="App">
      {authContext.isUserLoggedIn && (
        <>
          <GameOfThronesPage />
        </>
      )}
      {authContext.isUserLoggedIn === false && <LoginPage />}
    </div>
  );
}

export default App;
