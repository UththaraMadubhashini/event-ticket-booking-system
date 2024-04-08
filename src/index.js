// import React from 'react';
// // import App from './App';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ReactDOM from 'react-dom';
// import Home from './Pages/Home';
// import Layout from './Components/Layouts/Layout';
// import AllEvents from './Pages/AllEvents'
// import ContactUs from './Pages/ContactUs';
// import SignIn_LogOut from './Pages/SignIn_LogOut';



// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//         {/* <Route path="/" element={<Home />}> */}
//           <Route index element={<Home />}/>
//           <Route path="home" element={<Home />} />
//           <Route path="allevents" element={<AllEvents />} />
//           <Route path="contact" element={<ContactUs />} />
//           <Route path="signin-logout" element={<SignIn_LogOut />} />


//           {/* 
//           <Route path="booking" element={<BookingPage/>} />
//           <Route path="signup" element={<SignUp/>} />
//           <Route path="tableshowing" element={<Bodyprice/>} />
//           <Route path="*" element={<NoPage />} /> */}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
