import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";

// Import your logo image
import logo from '../../Assets/Images/Logo.jpeg';

const pages = ['Home', 'Events', 'ContactUs', 'SignIn', 'LogOut'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [selectedPage, setSelectedPage] = React.useState('Home'); // State to manage the selected page

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePageClick = (page) => {
    setSelectedPage(page); // Update the selected page when a navbar button is clicked
    handleCloseNavMenu(); // Close the navbar menu
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Always display MenuIcon on small screens */}
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={logo} alt="Logo" style={{ height: 40 }} />
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase().replace(' ', '')}`}
                onClick={() => handlePageClick(page)} // Update selected page on click
                sx={{
                  mx: 4, // Add margin to separate buttons
                  color: 'white',
                  textDecoration: 'none',
                  backgroundColor: selectedPage === page ? 'rgba(255, 255, 255, 0.08)' : 'transparent', // Apply background color based on selected page
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar src="/broken-image.jpg" />
              </IconButton>
            </Tooltip>
          </Box>
          {/* Hide MenuIcon on medium screens */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={() => handlePageClick(page)}>
                <Typography textAlign="center">
                  <Link style={{ textDecoration: "none", color: "black" }} to={`/${page.toLowerCase().replace(' ', '')}`}>
                    {page}
                  </Link>
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
