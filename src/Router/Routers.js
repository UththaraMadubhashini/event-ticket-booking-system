import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Home from './Pages/Home';
import About from "../pages/about";
import Contact from "../pages/contact";
import Products from "../pages/products";
import AdminLogin from "../Admin/adminLogin";
import AdminLayout from "../components/layouts/AdminLayout";
import Dashboard from "../Admin/dashboard";
import AddUser from "../Admin/addUser";
import ManageProducts from "../Admin/manageProducts";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contacts" element={<Contact/>} />
        <Route path="/products" element={<Products/>} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/addUser" element={<AddUser />} />
        <Route path="/admin/manageProducts" element={<ManageProducts />} />
      </Route>
    </Routes>
  );
};

export default Routers;
