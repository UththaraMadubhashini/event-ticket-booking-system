import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DancingEvents from "../Pages/DancingEvents";
import FoodFestival from "../Pages/FoodFestival";
import MusicalEvents from "../Pages/MusicalEvents";
import StageDrama from "../Pages/StageDrama";
import SeatSelection from "../Pages/SeatBookings/SeatSelection";
import Dashboard from "../Pages/Admin/Dashboard/DashBoard";
import ViewHome from "../Pages/ViewHome";
import Layout from "../Components/Layouts/Layout";
import AdminLayout from '../Components/Layouts/AdminLayOut';
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import EventCards from "../Components/EventCards/EventCards";
import AllEvents from "../Pages/AllEvents";
import BuyTickets from "../Pages/BuyTickets";
import HanthanetaPayana from "../Pages/HanthanetaPayana";
import BassEnigma from "../Pages/BassEnigma";
import About from "../Pages/About";
import Booking from "../Pages/Booking";
import ManageEvents from "../Pages/Admin/ManageEvents";
import ManageTickets from "../Pages/Admin/ManageTickets";
import ManageUser from "../Pages/Admin/Dashboard/ManageUser/ManageUser"
import BookingDetails from "../Pages/Admin/BookingDetails";
import Home from "../Pages/Home";
import Payment from "../Pages/Payment/Payment";
import AddEvent from "../Pages/Admin/EventTicketCrud/AddEvent";
import DeleteEvent from "../Pages/Admin/EventTicketCrud/DeleteEvent";
import UpdateEvent from "../Pages/Admin/EventTicketCrud/UpdateEvent";
import ViewEvent from "../Pages/Admin/EventTicketCrud/ViewEvent";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Navigate to="/view-home" />} />
        <Route path="/view-home" element={<ViewHome/>} />
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
        <Route path="/cd-payment" element={<Payment />} />
      </Route>

      <Route path="/admin" element={<AdminLayout/>}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="manage-events" element={<ManageEvents />} />
      <Route path="manage-tickets" element={<ManageTickets />} /> 
      <Route path="manage-user" element={<ManageUser />} /> 
      <Route path="add-event" element={<AddEvent />} /> 
      <Route path="delete-event" element={<DeleteEvent />} /> 
      <Route path="update-event" element={<UpdateEvent />} /> 
      <Route path="view-event" element={<ViewEvent />} /> 
      <Route path="booking-details" element={<BookingDetails />} /> 
      
     </Route>
    
    </Routes>
  );
};

export default Routers;
