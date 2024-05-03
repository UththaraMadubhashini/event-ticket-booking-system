import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import AdminLogin from "../Admin/adminLogin";
import DancingEvents from "../Pages/DancingEvents";
import FoodFestival from "../Pages/FoodFestival";
import MusicalEvents from "../Pages/MusicalEvents";
import StageDrama from "../Pages/StageDrama";
import SeatSelection from "../Pages/SeatBookings/SeatSelection";
import ManageEvents from "../Pages/Admin/ManageEvents";
import ManageTickets from "../Pages/Admin/ManageTickets";
import Dashboard from "../Pages/Admin/DashBoard";
import Home from "../Pages/Home";
import Layout from "../Components/Layouts/Layout";
import AdminLayOut from "../Components/Layouts/AdminLayOut";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import EventCards from "../Components/EventCards/EventCards";
import AllEvents from "../Pages/AllEvents";
import BuyTickets from "../Pages/BuyTickets";
import HanthanetaPayana from "../Pages/HanthanetaPayana";
import BassEnigma from "../Pages/BassEnigma";
import About from "../Pages/About";
import Booking from "../Pages/Booking";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/seat-selection" element={<SeatSelection/>} /> 
        <Route path="/bookings" element={<Booking/>} />
        <Route path="/signup" element={<SignUp/>} /> 
        <Route path="/login" element={<Login/>} />
        <Route path="/card" element={<EventCards/>} />
        <Route path="/all-events" element={<AllEvents/>} />
        <Route path="/musical" element={<MusicalEvents/>} />
        <Route path="/dancing" element={<DancingEvents/>} />
        <Route path="/stage-drama" element={<StageDrama/>} />
        <Route path="/food-festival" element={<FoodFestival/>} />
        <Route path="/buy-tickets/:eventTitle" element={<BuyTickets />} />
        <Route path="/hanthanete-payana" element={<HanthanetaPayana/>} />
        <Route path="/bass-enigma" element={<BassEnigma/>} />


        

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
