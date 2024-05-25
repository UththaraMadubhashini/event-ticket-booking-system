import React, { useState, useEffect } from 'react';
import SideBar from '../../AdminComponents/SideBar/SideBar';
import NavBar from '../../AdminComponents/NavBar/NavBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { database, ref, get, remove, set } from '../../../../firebase-config';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageEvents = () => {
  const [events, setEvents] = useState({});
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [eventData, setEventData] = useState({
    name: '',
    eventImage: '',
    date: '',
    time: '',
    location: '',
    priceRange: '',
    availability: '',
    category: ''
  });
  const [categories, setCategories] = useState([]); // State for categories

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = ref(database, 'events');
        const snapshot = await get(eventsRef);
        if (snapshot.exists()) {
          const eventData = snapshot.val();
          setEvents(eventData);
          
          // Fetch categories
          const categoriesArray = Object.values(eventData).reduce((acc, curr) => {
            if (curr.category && !acc.includes(curr.category)) {
              acc.push(curr.category);
            }
            return acc;
          }, []);
          
          setCategories(categoriesArray);
        } else {
          console.log('No events found');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleOpen = (eventId) => {
    setSelectedEventId(eventId);
    setOpen(true);
    // Populate the event data when the dialog opens
    setEventData(events[eventId]);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEventId(null);
    setEventData({
      name: '',
      eventImage: '',
      date: '',
      time: '',
      location: '',
      priceRange: '',
      availability: '',
      category: ''
    });
  };

  const handleDeleteDialogOpen = (eventId) => {
    setSelectedEventId(eventId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedEventId(null);
  };

  const handleDelete = async () => {
    try {
      if (selectedEventId) {
        await remove(ref(database, `events/${selectedEventId}`));
        setEvents((prevEvents) => {
          const updatedEvents = { ...prevEvents };
          delete updatedEvents[selectedEventId];
          return updatedEvents;
        });
        console.log(`Event with ID ${selectedEventId} deleted successfully`);
        handleDeleteDialogClose();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (selectedEventId) {
        await set(ref(database, `events/${selectedEventId}`), eventData);
        console.log(`Event with ID ${selectedEventId} updated successfully`);
        handleClose();
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };   

  return (
    <>
      <NavBar />
      <Box height={50} />
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <div style={{ marginTop: "50px", width: '100%' }}>
          <Link to="/admin/add-event">
            <Button variant="contained" color="primary" style={{ marginBottom: "20px" }}>Add Event</Button>
          </Link>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">EventID</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Event Image</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Time</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Price Range</TableCell>
                  <TableCell align="center">Availability</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(events).map((id, index) => (
                  <TableRow key={id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{events[id].name}</TableCell>
                    <TableCell align="center">
                      <img src={events[id].eventImage} alt={events[id].name} style={{ width: '100px', height: 'auto' }} />
                    </TableCell>
                    <TableCell align="center">{events[id].date}</TableCell>
                    <TableCell align="center">{events[id].time}</TableCell>
                    <TableCell align="center">{events[id].location}</TableCell>
                    <TableCell align="center">{events[id].priceRange}</TableCell>
                    <TableCell align="center">{events[id].availability}</TableCell>
                    <TableCell align="center">{events[id].category}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleOpen(id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDeleteDialogOpen(id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Update event details:
              </DialogContentText>
              <TextField
                margin="dense"
                label="Title"
                type="text"
                fullWidth
                name="name"
                value={eventData.name}
                onChange={handleChange}
              />
              <TextField
            label="Event Image"
            name="eventImage"
            type="file"
            onChange={handleChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
              <TextField
                margin="dense"
                label="Date"
                type="date"
                fullWidth
                name="date"
                value={eventData.date}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Time"
                type="time"
                fullWidth
                name="time"
                value={eventData.time}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Location"
                type="text"
                fullWidth
                name="location"
                value={eventData.location}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Price Range"
                type="text"
                fullWidth
                name="priceRange"
                value={eventData.priceRange}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Availability"
                type="text"
                fullWidth
                name="availability"
                value={eventData.availability}
                onChange={handleChange}
              />
              <TextField
                select
                label="Category"
                name="category"
                value={eventData.category}
                onChange={handleChange}
                fullWidth
                margin="dense"
              >
                <MenuItem value="Musical">Musical</MenuItem>
                <MenuItem value="Dancing">Dancing</MenuItem>
                <MenuItem value="Stage Drama">Stage Drama</MenuItem>
                <MenuItem value="Food festivals">Food festivals</MenuItem>
                {categories
                  .filter(category => category !== eventData.category) // Filter out the currently selected category
                  .map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
              </TextField>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleUpdate} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this event?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="secondary">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Box>
    </>
  );
};

export default ManageEvents;
