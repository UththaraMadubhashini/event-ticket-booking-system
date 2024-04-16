import React from 'react'
import {Container, Row, Button} from 'reactstrap'
import { NavLink, Link } from 'react-router-dom';

import Logo from '../../Assets/Images/Logo.jpeg'

// const Header = () => {
//   return (
//   <div className="bg-yellow-200 text-center py-3 shadow-xl">
//  <div className="flex gap-10 text-center mx-auto justify-center ">
// <a href="/home">Home</a>
//   <a href="/events">Events</a>
// <a href="/contactus">Contacts Us</a>
//   <a href="/loginlogout">SignIn_LogOut</a>
//   </div>
//   </div>
//   );
  
// }

const nav__links=[

  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/events',
    display: 'Events'
  },
  {
    path: '/contactus',
    display: 'Contact Us'
  }
]

const Header = () => {
  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav__wrapper" d-flex align-items-center justify-content-between>

            {/* ----Logo---- */}
              <div className="logo">
                <img src={Logo} alt=''/>
              </div>

            {/* ----Logo-End---- */}

          </div>
        </Row>
      </Container>
    </header>
  )
}


export default Header