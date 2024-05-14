import React from 'react';
import SideBar from '../../Pages/Admin/AdminComponents/SideBar/SideBar';
import { Outlet } from 'react-router';

const AdminLayOut = () => {
  return (
    <>
      <SideBar />
      <Outlet /> 
    </>
  );
}


export default AdminLayOut;
