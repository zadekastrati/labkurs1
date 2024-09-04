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
      const token = localStorage.getItem('jwtToken');
      const logoutFlag = localStorage.getItem('logout');
      
      console.log('Checking auth status...');
      console.log('Token:', token);
      console.log('Logout flag:', logoutFlag);

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const isTokenExpired = Date.now() >= decodedToken.exp * 1000;
          
          if (isTokenExpired) {
            console.log('Token expired');
            localStorage.removeItem('jwtToken');
            setIsAuthenticated(false);
            setUser(null);
          } else {
            console.log('Token valid, setting user and isAuthenticated');
            setIsAuthenticated(true);
            setUser(decodedToken); // Set user details
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('jwtToken');
          setIsAuthenticated(false);
          setUser(null);
        }
      } else if (logoutFlag) {
        console.log('Logout flag detected, setting isAuthenticated to false');
        localStorage.removeItem('logout');
        setIsAuthenticated(false);
        setUser(null);
      } else {
        console.log('No token or logout flag, setting isAuthenticated to false');
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };
  
    checkAuthStatus();
  }, []);
  
  useEffect(() => {
    const handleStorageChange = (event) => {
      console.log('Storage event:', event);
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
    window.localStorage.setItem('logout', Date.now().toString());
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUser(null);
  };

  // Function to check token expiry and refresh it if needed
  const checkTokenExpiry = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) return;

    const decodedToken = jwtDecode(token);
    const expiryTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    const timeLeft = expiryTime - currentTime;

    if (timeLeft < 5 * 60 * 1000) { // Refresh the token if less than 5 minutes left
      try {
        const response = await axios.post('http://localhost:8080/api/auth/refreshToken');
        const newToken = response.data.token;
        localStorage.setItem('jwtToken', newToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        const newDecodedToken = jwtDecode(newToken); // Decode the new token
        setUser(newDecodedToken); // Update user details with the new token
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error refreshing token:', error);
        logout();
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(checkTokenExpiry, 60 * 1000); // Check every minute
    return () => clearInterval(intervalId);
  }, []);

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
