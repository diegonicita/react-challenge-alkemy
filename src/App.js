import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import MyNavbar from "./MyNavbar";
import {NotLoggedRoute} from "./NotLoggedRoute";
import {PrivateRoute} from "./PrivateRoute";
import {AuthContext} from "./UserContextAuth";

function App() {

  const [apiToken, setApiToken] = useState(JSON.parse(sessionStorage.getItem("token")) || null);
  useEffect(() => {sessionStorage.setItem("token", JSON.stringify(apiToken));}, [apiToken]);
  const handleApiToken = (token) => {setApiToken(token);};
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")) || null);
  useEffect(() => {sessionStorage.setItem("user", JSON.stringify(user));}, [user]);
  const handleUser = (user) => {setUser(user);};

  return (
    <React.Fragment>
      <AuthContext.Provider value={{user, apiToken, handleUser}}>      
      <MyNavbar />
      <Routes>        
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute> } />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />                
        <Route path="login" element=
          { 
           <NotLoggedRoute>
            <Login
                apiTokenHandler={handleApiToken}
                userHandler={handleUser}              
              />
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
