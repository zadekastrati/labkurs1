import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "examples/Sidenav";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import routes from "./routes";
import { useMaterialUIController, setMiniSidenav } from "context";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Basic from "./layouts/authentication/sign-in";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from './layouts/dashboard';
import Users from './layouts/users';
import Roles from './layouts/roles';
import Categories from './layouts/categories';
import Certificates from './layouts/certificates';
import City from './layouts/city';
import Courses from './layouts/courses';
import Students from './layouts/students';
import Trainers from './layouts/trainers';
import Assignments from './layouts/assignments';
import Exam from './layouts/exam';
import Unauthorized from './layouts/Unauthorized/index.js'; 
import { AuthProvider } from "./context/AuthContext";
// import { useAuth } from './context/AuthContext';
import axios from 'axios';

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const { pathname } = useLocation();
  const [onMouseEnter, setOnMouseEnter] = useState(false); // State for mouse enter

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('Axios default headers set:', axios.defaults.headers.common); // Debug log
    }
  }, []);
  

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <AuthProvider>
        {/* Render Sidenav conditionally based on layout or authentication */}
        {layout === "dashboard" && (
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Brand Name"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        )}
        <Routes>
          <Route path="/login" element={<Basic />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute requiredRole={4}><Users /></ProtectedRoute>} />
          <Route path="/roles" element={<ProtectedRoute requiredRole={4}><Roles /></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path="/certificates" element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
          <Route path="/trainers" element={<ProtectedRoute><Trainers /></ProtectedRoute>} />
          <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
          <Route path="/city" element={<ProtectedRoute><City /></ProtectedRoute>} />
          <Route path="/assignments" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
          <Route path="/exam" element={<ProtectedRoute><Exam/></ProtectedRoute>}/>
          <Route path="/unauthorized" element={<Unauthorized />} /> {/* Add this route */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login for any unknown routes */}
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}
