import React from 'react'
import { Outlet } from "react-router";
import AdminHeader from '../AdminComponents/Header/AdminHeader';
import SideBar from '../AdminComponents/SideBar/SideBar';


const AdminLayOut = () => {
  return (
    <div>
   <AdminHeader/>
      <div className="flex gap-10">
        <SideBar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayOut;