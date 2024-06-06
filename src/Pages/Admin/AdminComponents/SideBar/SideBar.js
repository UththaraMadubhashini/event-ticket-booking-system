import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PeopleIcon from '@mui/icons-material/People';
import DateRangeIcon from '@mui/icons-material/DateRange';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../../../appStore';
import admin from '../../../../Assets/Images/admin.png';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideBar() {
  const navigate = useNavigate();
  const open = useAppStore((state) => state.dopen);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleNavigation = (path, item) => {
    navigate(path);
    setSelectedItem(item);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <Divider /> <br/><br/><br/><br/>
        <List>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <img src={admin} alt="Logo" style={{ height: "70px", marginLeft: "10px" , color: "#135D66"}} />
          <Typography variant="h6" align="center" gutterBottom sx={{ flexGrow: 1, color: "#135D66" }}>
           Administrator
          </Typography>
        </Box>
          <ListItem disablePadding 
            sx={{ display: 'block', backgroundColor: selectedItem === "dashboard" ? '#E3FEF7' : 'transparent' }}
            onClick={() => handleNavigation("/admin/dashboard", "dashboard")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                '&:hover': {
                  backgroundColor: '#E3FEF7',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <DashboardIcon sx={{ color: '#135D66' }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding 
            sx={{ display: 'block', backgroundColor: selectedItem === "manage-user" ? '#E3FEF7' : 'transparent' }} 
            onClick={() => handleNavigation("/admin/manage-user", "manage-user")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                '&:hover': {
                  backgroundColor: '#E3FEF7',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <PeopleIcon sx={{ color: '#135D66' }} />
              </ListItemIcon>
              <ListItemText primary="User Details" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding 
            sx={{ display: 'block', backgroundColor: selectedItem === "manage-events" ? '#E3FEF7' : 'transparent' }} 
            onClick={() => handleNavigation("/admin/manage-events", "manage-events")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                '&:hover': {
                  backgroundColor: '#E3FEF7', 
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <DateRangeIcon sx={{ color: '#135D66' }} />
              </ListItemIcon>
              <ListItemText primary="Events/Tickets Manage" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding 
            sx={{ display: 'block', backgroundColor: selectedItem === "booking-details" ? '#E3FEF7' : 'transparent' }} 
            onClick={() => handleNavigation("/admin/manage-booking", "booking-details")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                '&:hover': {
                  backgroundColor: '#E3FEF7', 
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <StickyNote2Icon sx={{ color: '#135D66' }} />
              </ListItemIcon>
              <ListItemText primary="Manage Book Tickets" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding 
            sx={{ display: 'block', backgroundColor: selectedItem === "login" ? '#E3FEF7' : 'transparent' }} 
            onClick={() => handleNavigation("/login", "login")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                '&:hover': {
                  backgroundColor: '#E3FEF7', // Set hover color
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <ExitToAppIcon sx={{ color: '#135D66' }} />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
