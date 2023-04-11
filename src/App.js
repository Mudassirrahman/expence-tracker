import { useState, useEffect } from "react";
import "./App.css";
import Expance1 from "./Expance1";
import SignUp from './SignUp';
import SignIn from './SignIn';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.isLoggedIn) {
      setIsLoggedIn(true);
      setUserData(storedData);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem('userData');
  };

const handleLogin = (userData) => {
  setIsLoggedIn(true);
  setUserData(userData);
  localStorage.setItem('userData', JSON.stringify({ isLoggedIn: true, userData }));
};

  return (
    <>
      <div>
        {isLoggedIn ? (
          <div>
            <Expance1 userData={userData} />
            <button className="logoutbtn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <h1>Signup or Login</h1>
            <SignUp />
            <SignIn onLogin={handleLogin} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
