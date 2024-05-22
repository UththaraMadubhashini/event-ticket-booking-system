import React, { useState, useEffect } from 'react';
import SideBar from './AdminComponents/SideBar/SideBar';
import NavBar from './AdminComponents/NavBar/NavBar';
import Box from '@mui/material/Box';
import { dbRef } from '../../firebase-config';
import { onValue } from 'firebase/database';

const ManageEvents = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
      unsubscribe();
    };
  }, []);

  return (
    <>
      <NavBar />
      <Box height={50} />
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <div style={{ marginTop: "50px" }}>
          <table className="style-table">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>EventID</th>
                <th style={{ textAlign: "center" }}>Title</th>
                <th style={{ textAlign: "center" }}>Event Image</th>
                <th style={{ textAlign: "center" }}>Date</th>
                <th style={{ textAlign: "center" }}>Time</th>
                <th style={{ textAlign: "center" }}>Location</th>
                <th style={{ textAlign: "center" }}>PriceRange</th>
                <th style={{ textAlign: "center" }}>Availability</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((id, index) => (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].title}</td>
                  <td>{data[id].eventimage}</td>
                  <td>{data[id].date}</td>
                  <td>{data[id].time}</td>
                  <td>{data[id].location}</td>
                  <td>{data[id].pricerange}</td>
                  <td>{data[id].availabilty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </>
  );
}

export default ManageEvents;
