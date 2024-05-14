import React from 'react';
import SideBar from './AdminComponents/SideBar/SideBar';
import NavBar from './AdminComponents/NavBar/NavBar';
import Box from '@mui/material/Box';

const ManageUser = () => {
  return (
    <>
    <NavBar/>
    <Box height={50}/>
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <h1>ManageUser</h1>
      </Box>
    </>
  )
}

export default ManageUser;
