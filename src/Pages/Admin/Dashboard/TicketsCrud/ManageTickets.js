import React from 'react';
import SideBar from '../../AdminComponents/SideBar/SideBar';
import NavBar from '../../AdminComponents/NavBar/NavBar';
import Box from '@mui/material/Box';

const ManageTickets = () => {
  return (
    <>
    <NavBar/>
    <Box height={50}/>
    <Box sx={{ display: 'flex' }}>
    <SideBar/>
    <h1>ManageTickets</h1>
    </Box>
    </>
  )
}

export default ManageTickets
