import React from 'react'
import { Outlet } from "react-router";
import Home from '../../Pages/Home'
import AllEvents from '../../Pages/AllEvents'
import ContactUs from '../../Pages/ContactUs'
import SignIn_LogOut from '../../Pages/SignIn_LogOut'



const Layout = () => {
  return (
<>
<Home/>
<AllEvents/>
<ContactUs/>
<Outlet/>
<SignIn_LogOut/>
</>
  )
}

export default Layout