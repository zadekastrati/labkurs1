import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUser] = useState(null);

  // Mock function to log in a user (you'll replace this with actual logic)
  const login = (userData) => {
    setUser(userData);
  };

  // Mock function to log out a user (you'll replace this with actual logic)
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ users, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
