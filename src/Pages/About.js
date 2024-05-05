import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline } from '@mui/material';
import image from '../Assets/Images/aboutBackground.png';

const About = () => {
  return (
    <div style={{ 
      backgroundImage: `linear-gradient(to bottom, #CAF4FF 50%, transparent 50%)`, // Background gradient
    }}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: 'background.default', color: 'text.primary', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6">About</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
        <Box sx={{ textAlign: 'center', padding: 2 }}>
          <img src={image} alt="About Background" sx={{ maxWidth: '100%', maxHeight: '200px' }} />
        </Box>
        
        <svg id="patternId" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M-20.133 44.568C-13.178 44.932-6.452 47.376 0 50c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432" strokeWidth="3" stroke="hsla(198.7,97.6%,48.4%,1)" fill="none" />
        </svg>

      </Container>
    </div>
  );
};

export default About;
