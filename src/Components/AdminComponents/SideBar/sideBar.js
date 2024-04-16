import React from "react";

const SideBar = () => {
  return (
    <div className=" flex flex-col gap-10 text-white  py-10 w-60 font-medium text-center  shadow-xl">
      <a href="/admin/dashboard">
        <button className="bg-blue-500 rounded-3xl py-3 w-44">Dashboard</button>
      </a>
      <a href="/admin/manageevents">
        <button className="bg-blue-500 rounded-3xl w-44 py-3">Manage Events</button>
      </a>

      <a href="/admin/managetickets">
        <button className="bg-blue-500 rounded-3xl w-44 py-3">Manage Tickets</button>
      </a>
    </div>
  );
};

export default SideBar;