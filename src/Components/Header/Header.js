import React from 'react'

const Header = () => {
  return (
  <div className="bg-yellow-200 text-center py-3 shadow-xl">
 <div className="flex gap-10 text-center mx-auto justify-center ">
<a href="/home">Home</a>
  <a href="/events">Events</a>
<a href="/contactus">Contacts Us</a>
  <a href="/loginlogout">SignIn_LogOut</a>
  </div>
  </div>
  );
  
}

export default Header