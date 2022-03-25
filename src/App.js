import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Login from "./Components/Login/Login";
import MyNavbar from "./Components/Navbar/MyNavbar";
import Register from "./Components/Register/Register";
import { NotLoggedRoute } from "./Components/Routes/NotLoggedRoute";
import { PrivateRoute } from "./Components/Routes/PrivateRoute";
import { AuthContext } from "./Components/Context/UserContextAuth";

function App() {
  const [apiToken, setApiToken] = useState(
    JSON.parse(sessionStorage.getItem("token")) || null
  );
  useEffect(() => {
    sessionStorage.setItem("token", JSON.stringify(apiToken));
  }, [apiToken]);
  const saveApiToken = (token) => {
    setApiToken(token);
  };

  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  const saveUserEmail = (user) => {
    setUser(user);
  };  

  return (
    <React.Fragment>
      <AuthContext.Provider value={{ user, apiToken}}>
        <MyNavbar saveUserEmail={saveUserEmail} saveApiToken={saveApiToken}/>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>                
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="about"
            element={
              <PrivateRoute>                
                <About />
              </PrivateRoute>
            }
          />
          <Route
            path="contact"
            element={
              <PrivateRoute>                
                <Contact />
              </PrivateRoute>
            }
          />
          <Route
            path="login"
            element={
               <NotLoggedRoute>                
                <Login
                  saveApiToken={saveApiToken}
                  saveUserEmail={saveUserEmail}                  
                />
               </NotLoggedRoute>
            }
          />
          <Route
            path="register"
            element={
               <NotLoggedRoute>                
                <Register />
               </NotLoggedRoute>
            }
          />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
        
      </AuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
