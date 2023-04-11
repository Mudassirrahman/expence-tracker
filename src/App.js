  import { useState, useEffect } from "react";
  import "./App.css";
  import Expance1 from "./Expance1"
import SignUp from './SignUp';
import SignIn from './SignIn';

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    setIsLoggedIn(true);
  }
}, []);


  const handleLogout = () => {
    setIsLoggedIn(false);
  };

const handleLogin = () => {
  setIsLoggedIn(true);
  localStorage.setItem('isLoggedIn', true);
};

  

  return (
    <>
<div>
      {isLoggedIn ? (
        <div>
 <Expance1 />
          <button className="logoutbtn" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Signup or Login</h1>
          <SignUp />
          <SignIn setIsLoggedIn={handleLogin} />
        </div>
      )}
    </div>
   </>
  );
          }
          export default App;  