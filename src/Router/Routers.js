import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home";
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
import AllEvents from "../Pages/AllEvents";
import BuyTickets from "../Pages/BuyTickets";
import About from "../Pages/About";
import Booking from "../Pages/Booking";
import ManageUser from "../Pages/Admin/Dashboard/ManageUser/ManageUser"
import Payment from "../Pages/Payment/Payment";
import AddEvent from "../Pages/Admin/Dashboard/EventsCrud/AddEvent";
import ManageEvents from "../Pages/Admin/Dashboard/EventsCrud/ManageEvents";
import ViewBooking from "../Pages/Organizer/ViewBooking";
import ViewEvent from "../Pages/Organizer/ViewEvent";
import SentMail from "../Pages/Payment/SentMail/SentMail";
import ManageBooking from "../Pages/Admin/Dashboard/BookingDetails/ManageBooking";
import SendPdf from "../Pages/Payment/SendPdf/SendPdf";


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
        <Route path="/all-events" element={<AllEvents/>} />
        <Route path="/musical" element={<MusicalEvents/>} />
        <Route path="/dancing" element={<DancingEvents/>} />
        <Route path="/stage-drama" element={<StageDrama/>} />
        <Route path="/food-festival" element={<FoodFestival/>} />
        <Route path="/buy-tickets/:title" element={<BuyTickets />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/send-pdf" element={<SendPdf />} />


      </Route>

      <Route path="/admin" element={<AdminLayout/>}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="manage-events" element={<ManageEvents />} />
      <Route path="add-event" element={<AddEvent />} />  
      <Route path="manage-user" element={<ManageUser />} /> 
      <Route path="manage-booking" element={<ManageBooking />} /> 
      <Route path="sent-mails" element={<SentMail />} />
      <Route path="view-event" element={<ViewEvent />} />
      <Route path="view-booking" element={<ViewBooking />} /> 
      
     </Route>
    
    </Routes>
  );
};

export default Routers;
