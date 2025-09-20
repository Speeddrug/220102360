import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#4F46F6' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo / Brand */}
        <Typography variant="h6" component={Link} to="/" sx={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
          PragatiURLShortner
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/stats" color="inherit">Stats</Button>
          <Button component={Link} to="/about" color="inherit">About</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
