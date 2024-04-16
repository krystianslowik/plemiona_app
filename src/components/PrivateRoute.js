import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = AuthService.isAuthenticated();

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
