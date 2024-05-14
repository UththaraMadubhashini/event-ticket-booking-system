import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Menu, MenuItem } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
// import logo from '../../Assets/Images/Logo.png';
import logo2 from '../../Assets/Images/Logo2.png'

const pages = ['Home', 'Events', 'About', 'SignUp', 'Login'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: '50px',
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '30ch',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [selectedPage, setSelectedPage] = React.useState('Home');
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePageClick = (page) => {
    setSelectedPage(page); 
    handleCloseNavMenu(); 
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#135D66' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ marginTop: 1.5,  alignItems: 'center', marginLeft:5 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={logo2} alt="Logo" style={{ height: 80, width: 95, borderRadius: '50%'}} />
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <React.Fragment key={page}>
                {page === 'Events' ? (
                  <React.Fragment>
                    <Button
                      aria-controls="menu-events"
                      aria-haspopup="true"
                      onClick={(event) => setAnchorElNav(event.currentTarget)}
                      sx={{
                        mx: 4,
                        color: 'white',
                        textDecoration: 'none',
                        backgroundColor: selectedPage === page ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                      }}
                    >
                      {page}
                    </Button>
                    <Menu
                      id="menu-events"
                      anchorEl={anchorElNav}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                    >
                      <MenuItem component={Link} to="/all-events" onClick={() => handlePageClick('All Events')}>All Events</MenuItem>
                      <MenuItem component={Link} to="/musical" onClick={() => handlePageClick('Musical')}>Musical</MenuItem>
                      <MenuItem component={Link} to="/dancing" onClick={() => handlePageClick('Dancing')}>Dancing</MenuItem>
                      <MenuItem component={Link} to="/stage-drama" onClick={() => handlePageClick('Stage Drama')}>Stage Drama</MenuItem>
                      <MenuItem component={Link} to="/food-festival" onClick={() => handlePageClick('Food Festival')}>Food Festival</MenuItem>
                    </Menu>
                  </React.Fragment>
                ) : (
                  <Button
                    key={page}
                    component={Link}
                    to={`/${page.toLowerCase().replace(' ', '')}`}
                    onClick={() => handlePageClick(page)} 
                    sx={{
                      mx: 4,
                      color: 'white',
                      textDecoration: 'none',
                      backgroundColor: selectedPage === page ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                      fontFamily: 'sans-serif', // Change the font family here
                    }}
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
