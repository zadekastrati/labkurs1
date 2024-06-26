import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const Unauthorized = () => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh" 
      textAlign="center"
    >
      <Typography variant="h1">Unauthorized</Typography>
      <Typography variant="body1">You do not have permission to view this page.</Typography>
      <Link to="/dashboard" style={{ marginTop: '20px', textDecoration: 'none', color: 'blue' }}>
        Go to Dashboard
      </Link>
    </Box>
  );
};

export default Unauthorized;
