import React from 'react'

import SideBar from "./Layout";
import { Outlet } from "react-router";
import AdminHeader from '../AdminComponents/Header/AdminHeader';


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