import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import AdminLogin from "../Admin/adminLogin";
import ContactUs from "../Pages/ContactUs";
import DancingEvents from "../Pages/DancingEvents";
import FoodEvents from "../Pages/FoodEvents";
import MusicalEvents from "../Pages/MusicalEvents";
import StageDrama from "../Pages/StageDrama";
import TicketsBooking from "../Pages/TicketsBooking";
import ManageEvents from "../Pages/Admin/ManageEvents";
import ManageTickets from "../Pages/Admin/ManageTickets";
import Dashboard from "../Pages/Admin/DashBoard";
import Home from "../Pages/Home";
import Layout from "../Components/Layouts/Layout";
import AdminLayOut from "../Components/Layouts/AdminLayOut";
import LoginSignup from "../Pages/LoginSignup/LoginSignup";
import Events from "../Pages/Events";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/events" element={<Events/>} />
        <Route path="/contactus" element={<ContactUs/>} />
        <Route path="/dancingevents" element={<DancingEvents/>} />
        <Route path="/foodevents" element={<FoodEvents/>} />
        <Route path="/musicalevents" element={<MusicalEvents/>} />
        <Route path="/stagedrama" element={<StageDrama/>} />
        <Route path="/ticketbooking" element={<TicketsBooking/>} /> 
        <Route path="/loginlogout" element={<LoginSignup/>} /> 
      </Route>

      {/* <Route path="/admin/login" element={<AdminLogin />} /> */}

      <Route path="/admin" element={<AdminLayOut/>}>
        {/* <Route path="/admin" element={<Navigate to="/admin/dashboard"/>} /> */}
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="/admin/manageevents" element={<ManageEvents/>} />
        <Route path="/admin/managetickets" element={<ManageTickets/>} />
      </Route>
    </Routes>
  );
};

export default Routers;
