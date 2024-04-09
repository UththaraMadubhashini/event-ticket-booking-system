import React from 'react'

import SideBar from "./Layout";
import { Outlet } from "react-router";



const AdminLayOut = () => {
  return (
    <div>
   
      <div className="flex gap-10">
        <SideBar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayOut;