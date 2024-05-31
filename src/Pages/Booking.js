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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


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
  const navigate = useNavigate();


  const handleChange = (event) => {
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
    if (!selectedTicket) {
      setOpen(true); // Open the Snackbar if no ticket is selected
    } else {
      // Proceed with booking logic
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
    setOpen(true);
    navigate('/payment');
  };

  if (!selectedEvent) {
    return <div>No event selected.</div>;
  }
  

  return (
    
    <Typography style={{ fontFamily: 'YourCreativeFont, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="#">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="#">
              Buy Ticket
            </Link>
            <Typography color="text.primary">Ticket Bookings</Typography>
          </Breadcrumbs>

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
                      onChange={handleChange}
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



          {/* <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <Typography variant="h6" component="div" fontWeight="bold">
                Your Booking Confirmations
              </Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Your Booking Total Amount
                <Typography variant="subtitle1" color="textPrimary" textAlign="center">
                  <br /> RS.__ {}
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} sx={{ ...buttonColor, borderRadius: '40px', '&:hover': { background: '#135D66' } }}>
                NEXT
              </Button>
            </DialogActions>
          </Dialog> */}

        </React.Fragment>
      </div>
    </Typography>
  );
}
