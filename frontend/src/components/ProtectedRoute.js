import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  console.log("isAuthenticated:", isAuthenticated); // Debugging

  if (!isAuthenticated) {
    console.log("User not authenticated. Redirecting to sign-in page."); // Debugging
    return <Navigate to="/authentication/sign-in" />;
  }

  console.log("User authenticated. Rendering children."); // Debugging
  return children;
};

export default ProtectedRoute;
