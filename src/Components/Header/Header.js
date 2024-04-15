import React from 'react'

const Header = () => {
  return (
    <div className="bg-yellow-200 text-center py-3 shadow-xl">
    <div className="flex gap-10 text-center mx-auto justify-center ">
      <a href="/home">Home</a>
      <a href="/allevents">AllEvents</a>
      <a href="/contactus">Contacts Us</a>
      {/* <a href="/sign-in_log-out">Sign-In_Log-out</a> */}
    </div>
  </div>
  )
}

export default Header