import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import Snackbar from '@mui/material/Snackbar';
import { Alert, TextField, Box  } from '@mui/material';



const buttonColor = {
  background: '#439A97',
  border: '3.5px solid #135D66',
  borderRadius: 3,
  boxShadow: '#62B6B7',
  color: 'white',
  height: 45,
  padding: '0 30px',
  marginTop: '10px',
};

export default function Booking() {
  const selectedEvent = useSelector((state) => state.ticket.selectedEvent);
  const [count, setCount] = React.useState(0);
  const [seats, setSeats] = useState(0);
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedTicket, setSelectedTicket] = React.useState(false);
  const [formValues, setFormValues] = useState({
    customerId: '',
    customerName: '',
    email: '',
    contactNumber: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();


const validateForm = () => {
    const errors = {};
    if (!formValues.customerName) errors.customerName = "Customer Name is required";
    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formValues.contactNumber) {
      errors.contactNumber = "Contact Number is required";
    } else if (!/^\d{10}$/.test(formValues.contactNumber)) {
      errors.contactNumber = "Contact Number is invalid";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleTicketChange = (event) => {
    const newCount = parseInt(event.target.value);
    if (!isNaN(newCount) && newCount >= 0) {
      setCount(newCount);
      setSeats(newCount);
      // calculation
      const newAmount = newCount === 1 ? selectedEvent.priceRange : newCount * selectedEvent.priceRange;
      setAmount(newAmount);
      setSelectedTicket(true);
    }
  };

  const handleClick = () => {
    if (!validateForm()) {
      setOpen(true);
    } else if (!selectedTicket) {
      setOpen(true);
    } else {
      handleBookingConfirm();
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  const handleBookingConfirm = () => {
    const bookingDetails = {
      customerId: formValues.customerId,
      customerName: formValues.customerName,
      email: formValues.email,
      contactNumber: formValues.contactNumber,
      eventName: selectedEvent.name,
      ticketCount: count,
      totalAmount: amount
    };
    navigate('/payment', { state: { bookingDetails } });
    setOpen(true);
  };
    
  if (!selectedEvent) {
    return <div>No event selected.</div>;
  }
  

  return (
    
    <Typography style={{ fontFamily: 'YourCreativeFont, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        {/* <div role="presentation" onClick={handleClick}> */}
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="#">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="#">
              Buy Ticket
            </Link>
            <Typography color="text.primary">Ticket Bookings</Typography>
          </Breadcrumbs>


          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center', p: 2 }}>
          <Paper elevation={2} sx={{ padding: '20px', width: '300px', textAlign: 'center' }}>
            <h2>Fill Your Details</h2>
            <form>
              <TextField
                label="CustomerID"
                name="customerId"
                value={formValues.customerId}
                onChange={handleFormChange}
                variant="outlined"
                margin="normal"
                required
                disabled
              />
              <TextField
                label="Customer Name"
                name="customerName"
                value={formValues.customerName}
                onChange={handleFormChange}
                variant="outlined"
                margin="normal"
                required
                error={!!formErrors.customerName}
                helperText={formErrors.customerName}
              />
              <TextField
                label="Email"
                name="email"
                value={formValues.email}
                onChange={handleFormChange}
                variant="outlined"
                margin="normal"
                required
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
              <TextField
                label="Contact Number"
                name="contactNumber"
                value={formValues.contactNumber}
                onChange={handleFormChange}
                variant="outlined"
                margin="normal"
                required
                error={!!formErrors.contactNumber}
                helperText={formErrors.contactNumber}
              />
            </form>

            <Button
              sx={{
                width: '100px',
                height: '40px',
                mx: 'auto',
                ...buttonColor,
                borderRadius: '40px',
                '&:hover': {
                  background: '#135D66',
                }
              }}
              variant="contained"
              onClick={handleClick}
              startIcon={<AutoModeIcon />}
              disabled={!selectedEvent}
            >
              OK
            </Button>
          </Paper>
        </Box>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', textAlign: 'center' }}>
            Select Your Tickets
          </Typography>
        </div>

        <div>
          <TableContainer component={Paper} sx={{ width: '80%', margin: 'auto', marginTop: '30px', marginBottom: '80px' }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#E3FEF7' }}>EVENT NAME</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#E3FEF7' }}>PRICE</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#E3FEF7' }}>COUNT OF TICKETS</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#E3FEF7' }}>SEATS</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#7AB2B2' }}>AMOUNT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 2 } }}>
                  <TableCell align="center">{selectedEvent.name}</TableCell>
                  <TableCell align="center">{selectedEvent.priceRange}</TableCell>
                  <TableCell align="center">
                    <input
                      type="number"
                      value={count}
                      onChange={handleTicketChange}
                      style={{ width: 60, textAlign: 'center' }}
                      min="1"
                    />
                  </TableCell>
                  <TableCell align="center">{seats}</TableCell>
                  <TableCell align="center">{amount}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', textAlign: 'center' }}>
          Pick Your Tickets
        </Typography>

        <React.Fragment>
          <Button
            sx={{
              width: '250px',
              height: '40px',
              mx: 'auto',
              ...buttonColor,
              borderRadius: '40px',
              '&:hover': {
                background: '#135D66',
              }
            }}
            variant="contained"
            onClick={handleClick}
            startIcon={<AutoModeIcon />}
            disabled={!selectedEvent}
          >
            Proceed
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%', justifyContent: 'center' }}>
          Please select a ticket before proceeding.
        </Alert>
      </Snackbar>
        </React.Fragment>
      {/* </div> */}
    </Typography>
  );
}
