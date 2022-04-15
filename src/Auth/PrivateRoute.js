import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserAuthContext } from "./UserAuthContext";

export const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserAuthContext);
  return user ? children : <Navigate to="/login" />;
};