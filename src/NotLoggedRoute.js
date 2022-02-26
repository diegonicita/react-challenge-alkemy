import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./UserContextAuth";

export const NotLoggedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return !user ? children : <Navigate to="/" />;
};