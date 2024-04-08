import React from 'react'

const Header = () => {
  return (
    <div className="bg-yellow-200 text-center py-3 shadow-xl">
    <div className="flex gap-10 text-center mx-auto justify-center ">
      <a href="/home">Home</a>
      <a href="/about">About</a>
      <a href="/contacts">Contacts</a>
      <a href="/products">Products</a>
    </div>
  </div>
  )
}

export default Header