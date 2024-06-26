import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
      const logoutFlag = localStorage.getItem('logout');
      
      if (token) {
        const decodedToken = jwtDecode(token);
        const isTokenExpired = Date.now() >= decodedToken.exp * 1000;
        
        if (isTokenExpired) {
          console.log('Token expired');
          localStorage.removeItem('jwtToken');
          sessionStorage.removeItem('jwtToken');
          setIsAuthenticated(false);
          setUser(null);
        } else {
          setIsAuthenticated(true);
          setUser(decodedToken); // Set user details
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      } else if (logoutFlag) {
        console.log('Logout flag detected, setting isAuthenticated to false');
        localStorage.removeItem('logout');
        setIsAuthenticated(false);
        setUser(null);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };
  
    checkAuthStatus();
  }, []);
  
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'logout') {
        console.log('Logout event detected, setting isAuthenticated to false');
        setIsAuthenticated(false);
        setUser(null);
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (token) => {
    console.log('Login called, setting token:', token);
    localStorage.setItem("jwtToken", token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const decodedToken = jwtDecode(token); // Decode token
    setUser(decodedToken); // Set user details
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log('Logout called');
    localStorage.removeItem("jwtToken");
    sessionStorage.removeItem("jwtToken");
    window.localStorage.setItem('logout', Date.now());
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = useMemo(() => ({
    isAuthenticated,
    loading,
    user, // Include user in context value
    login,
    logout,
  }), [isAuthenticated, loading, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
