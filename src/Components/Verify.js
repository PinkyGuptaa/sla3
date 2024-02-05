import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const Verify = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        User Verification
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          margin="normal"
          required
          autoFocus
        />
        <div class= "lds-roller"> 
        <Button type="submit" variant="contained" color="primary">
          Verify
        </Button>


        </div>
      </form>
    </Box>
  );
};

export default Verify;
