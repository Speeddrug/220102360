import React from 'react';
import { Box, Grid, Typography, Link, TextField, Button, Divider } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: '#fff', mt: 4, pt: 6, pb: 4, px: { xs: 3, md: 8 } }}>
      <Grid container spacing={6}>
        {/* Logo and description */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 2 }}>
            {/* Replace this with your real logo */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4F46F6' }}>
              TinyShort
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary">
            TinyShort is a simple and fast URL shortener to make your links manageable and shareable.
          </Typography>
        </Grid>

        {/* Company links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>Company</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link href="#" underline="hover" color="textSecondary">About us</Link>
            <Link href="#" underline="hover" color="textSecondary">Careers</Link>
            <Link href="#" underline="hover" color="textSecondary">Contact us</Link>
            <Link href="#" underline="hover" color="textSecondary">Privacy policy</Link>
          </Box>
        </Grid>

        {/* Newsletter */}
        <Grid item xs={12} sm={6} md={5}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>Subscribe to our newsletter</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            Get the latest updates and tips for TinyShort delivered straight to your inbox.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <TextField
              size="small"
              placeholder="Enter your email"
              sx={{ flex: 1 }}
            />
            <Button variant="contained" color="primary">Subscribe</Button>
          </Box>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ my: 3 }} />

      {/* Copyright */}
      <Typography variant="body2" color="textSecondary" align="center">
        © 2025 <Link href="#" underline="hover">TinyShort</Link>. All rights reserved.
      </Typography>
    </Box>
  );
}
