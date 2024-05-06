import React from 'react';
import { AppBar, Toolbar, Typography, Container, CssBaseline } from '@mui/material';
import image from '../Assets/Images/aboutBackground.png';
import Box from '@mui/material/Box';

const commonStyles = {
  border: 6,
  m: 0,
  borderColor: 'text.primary',
  width: '100rem',
  height: '30rem',
}

const About = () => {
  return (
    <div style={{ 
      backgroundImage: `url(${image}), linear-gradient(to bottom, #CAF4FF 50%, transparent 50%)`, // Background image and gradient
      backgroundPosition: 'right top', // Position background image at the bottom right
      backgroundRepeat: 'no-repeat', // Prevent background image from repeating
    }}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: 'transparent', color: 'text.primary', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6">About</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Box sx={{ ...commonStyles, borderRight: 0 }} /> {/* First Box */}
  <Box sx={{ ...commonStyles, borderRight: 0 }} /> {/* Second Box */}
</Container>

    </div>
  );
};

export default About;
