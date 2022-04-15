import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import MyNavbar from "./Components/Navbar/MyNavbar";
import { PublicRoute } from "./Auth/PublicRoute";
import { PrivateRoute } from "./Auth/PrivateRoute";
import { UserAuthContext } from "./Auth/UserAuthContext";

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
      <UserAuthContext.Provider value={{ user, apiToken}}>
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
               <PublicRoute>                
                <Login
                  saveApiToken={saveApiToken}
                  saveUserEmail={saveUserEmail}                  
                />
               </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
               <PublicRoute>                
                      <Register />
               </PublicRoute>
            }
          />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
        
      </UserAuthContext.Provider>
    </React.Fragment>
  );
}

export default App;
