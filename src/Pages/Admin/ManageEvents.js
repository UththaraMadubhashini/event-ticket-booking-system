import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { database, ref, set, get } from '../../firebase-config';
import SideBar from './AdminComponents/SideBar/SideBar';
import NavBar from './AdminComponents/NavBar/NavBar';

const ManageEvents = () => {
  const [events, setEvents] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = ref(database, 'events');
        const snapshot = await get(eventsRef);
        if (snapshot.exists()) {
          setEvents(snapshot.val());
        } else {
          console.log('No events found');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleUpdate = async (eventId) => {
    // Update logic
  };

  const handleDelete = async (eventId) => {
    // Delete logic
  };

  return (
    <>
      <NavBar />
      <Box height={50} />
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Link to="/admin/add-event">
            <Button variant="contained" color="primary" sx={{ mb: 2 }}>Add Event</Button>
          </Link>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">EventID</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Event Image</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Time</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">PriceRange</TableCell>
                  <TableCell align="center">Availability</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(events).map((id, index) => (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row" align="center">{index + 1}</TableCell>
                    <TableCell align="center">{events[id].title}</TableCell>
                    <TableCell align="center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => console.log(e.target.files[0])} // Handle file upload
                      />
                    </TableCell>
                    <TableCell align="center">{events[id].date}</TableCell>
                    <TableCell align="center">{events[id].time}</TableCell>
                    <TableCell align="center">{events[id].location}</TableCell>
                    <TableCell align="center">{events[id].pricerange}</TableCell>
                    <TableCell align="center">{events[id].availability}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleUpdate(id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDelete(id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}

export default ManageEvents;
