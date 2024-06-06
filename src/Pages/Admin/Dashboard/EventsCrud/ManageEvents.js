import React, { useState, useEffect } from 'react';
import SideBar from '../../AdminComponents/SideBar/SideBar';
import NavBar from '../../AdminComponents/NavBar/NavBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { getDatabase,database, ref, get, remove, set } from '../../../../firebase-config';
import { Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, IconButton, 
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, 
  TextField, MenuItem, Alert, } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from '@mui/material/TablePagination';

const ManageEvents = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
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
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState('');
  const [editMode, setEditMode] = useState({}); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const database = getDatabase();
        const eventsRef = ref(database, 'events');
        const snapshot = await get(eventsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const eventData = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setRows(eventData);
          setEvents(data);

          // Fetch categories
          const categoriesArray = eventData.reduce((acc, curr) => {
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
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [eventId]: true,
    }));
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
        setRows((prevRows) => prevRows.filter((row) => row.id !== selectedEventId));
        console.log(`Event with ID ${selectedEventId} deleted successfully`);
        handleDeleteDialogClose();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleUpdate = async (eventId) => {
    try {
      if (eventId) {
        await set(ref(database, `events/${eventId}`), eventData);
        setEvents((prevEvents) => ({ ...prevEvents, [eventId]: eventData })); 
        console.log(`Event with ID ${eventId} updated successfully`);
        setEditMode((prevEditMode) => ({ ...prevEditMode, [eventId]: false }));
        handleClose();
        setSuccess('Event updated successfully');
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  }; 

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <NavBar />
      <Box height={50} />
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ padding: "20px", bgcolor: '#E3FEF7' }}
            >
              <b>Events & Tickets Management</b>
            </Typography>
            {/* <Divider /> */}
          
          <Link to="/admin/add-event">
            <Button variant="contained" color="primary" 
            style={{ marginBottom: "20px",backgroundColor: "#135D66" ,'&:hover': { background: "#1C1678" }}}>Add Event</Button>
          </Link>

          <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"><b>EventID</b></TableCell>
                  <TableCell align="center"><b>Title</b></TableCell>
                  <TableCell align="center"><b>Event Image</b></TableCell>
                  <TableCell align="center"><b>Date</b></TableCell>
                  <TableCell align="center"><b>Time</b></TableCell>
                  <TableCell align="center"><b>Location</b></TableCell>
                  <TableCell align="center"><b>Price Range</b></TableCell>
                  <TableCell align="center"><b>Availability</b></TableCell>
                  <TableCell align="center"><b>Category</b></TableCell>
                  <TableCell align="center"><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">
                          <img src={row.eventImage} alt={row.name} style={{ width: '100px', height: 'auto' }} />
                        </TableCell>
                        <TableCell align="center">{row.date}</TableCell>
                        <TableCell align="center">{row.time}</TableCell>
                        <TableCell align="center">{row.location}</TableCell>
                        <TableCell align="center">{row.priceRange}</TableCell>
                        <TableCell align="center">{row.availability}</TableCell>
                        <TableCell align="center">{row.category}</TableCell>
                        <TableCell align="center">
                          <IconButton color="primary" onClick={() => handleOpen(row.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="secondary" onClick={() => handleDeleteDialogOpen(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
              rowsPerPageOptions={[5, 10, 15, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle><b>Edit Event</b></DialogTitle>
            <DialogContent>
              <DialogContentText>
                <b>Update event details:</b>
              </DialogContentText>
              <TextField
                margin="dense"
                label="Title"
                type="text"
                fullWidth
                name="name"
                value={eventData.name}
                onChange={handleChange}
                sx={{ marginBottom: '10px', '& label': { color: '#1C1678' }, '& .MuiInputBase-input': { color: '#1C1678' } }}
              />
              <TextField
                label="Event Image"
                name="eventImage"
                type="file"
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
                sx={{ marginBottom: '10px', '& label': { color: '#1C1678' }, '& .MuiInputBase-input': { color: '#1C1678' } }}
              />
              <TextField
                margin="dense"
                label="Date"
                type="date"
                fullWidth
                name="date"
                value={eventData.date}
                onChange={handleChange}
                sx={{ marginBottom: '10px', '& label': { color: '#1C1678' }, '& .MuiInputBase-input': { color: '#1C1678' } }}
              />
              <TextField
                margin="dense"
                label="Time"
                type="time"
                fullWidth
                name="time"
                value={eventData.time}
                onChange={handleChange}
                sx={{ marginBottom: '10px', '& label': { color: '#1C1678' }, '& .MuiInputBase-input': { color: '#1C1678' } }}
              />
              <TextField
                margin="dense"
                label="Location"
                type="text"
                fullWidth
                name="location"
                value={eventData.location}
                onChange={handleChange}
                sx={{ marginBottom: '10px', '& label': { color: '#1C1678' }, '& .MuiInputBase-input': { color: '#1C1678' } }}
              />
              <TextField
                margin="dense"
                label="Price Range"
                type="text"
                fullWidth
                name="priceRange"
                value={eventData.priceRange}
                onChange={handleChange}
                sx={{ marginBottom: '10px', '& label': { color: '#1C1678' }, '& .MuiInputBase-input': { color: '#1C1678' } }}
              />
              <TextField
                margin="dense"
                label="Availability"
                type="text"
                fullWidth
                name="availability"
                value={eventData.availability}
                onChange={handleChange}
                sx={{ marginBottom: '10px', '& label': { color: '#1C1678' }, '& .MuiInputBase-input': { color: '#1C1678' } }}
              />
              <TextField
                select
                label="Category"
                name="category"
                value={eventData.category}
                onChange={handleChange}
                fullWidth
                margin="dense"
                sx={{ marginBottom: '10px', '& label': { color: '#1C1678' }, '& .MuiInputBase-input': { color: '#1C1678' } }}
              >
                <MenuItem value="Musical">Musical</MenuItem>
                <MenuItem value="Dancing">Dancing</MenuItem>
                <MenuItem value="Stage Drama">Stage Drama</MenuItem>
                <MenuItem value="Food festivals">Food festivals</MenuItem>
                {categories
                  .filter(category => category !== eventData.category) 
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
              <Button onClick={() => handleUpdate(selectedEventId)} color="primary">
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

          {/* Success message */}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          </Paper>
        </Box>
      </Box>
    </>
  );
};


export default ManageEvents;