import React, { useState, useEffect } from 'react';
import { Paper, Button, Typography, Box, Divider, DialogContent, DialogContentText, DialogTitle, Dialog, DialogActions } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// data base coonect user details

const buttonColor = {
  background: '#439A97',
  border: '3.5px solid #135D66',
  borderRadius: 40,
  boxShadow: '#62B6B7',
  color: 'white',
};

const BillSummary = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const navigate = useNavigate();

  const selectEvent = useSelector(state => state.ticket.selectedEvent);
  const customer = useSelector(state => state.customer.customerDetails);

  useEffect(() => {
    if (!customer) {
      // navigate('/signup');
    }
  }, [customer, navigate]);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    handleSuccessMessageOpen();
  };

  const handleSuccessMessageOpen = () => {
    setSuccessMessageOpen(true);
  };

  const handleSuccessMessageClose = () => {
    setSuccessMessageOpen(false);
  };

   if (!customer || !selectEvent) {
    return <Typography>Loading...</Typography>;
   }

  return (
    <Paper elevation={3}
      sx={{
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        background: '#CBEDD5',
        border: '3px solid #003C43',
      }}
    >
      <Typography component="h2" variant="h6" sx={{ textAlign: 'center' }}>
        <b><u>Bill Summary</u></b>
      </Typography>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '80px' }}>
          <Typography variant="body1">
            Customer ID: {customer.id}
          </Typography>
        </div>
        <Typography variant="body1">
          Customer Name: {customer.name}
        </Typography>
      </div>
      <Typography variant="body1">
        Email: {customer.email}
      </Typography>
      <Typography variant="body1">
        Contact Number: {customer.contactNumber}
      </Typography>
      <Typography variant="body1">
        Book Event Name: {selectEvent.name}
      </Typography>
      <Typography variant="body1">
        Counts of Tickets: {selectEvent.ticketCount}
      </Typography>
      <br />
      <Divider variant="middle" component="li" sx={{ border: '2px solid' }} />
      <br />
      <Box
        sx={{
          width: "100%",
          height: 50,
          borderRadius: 1,
          bgcolor: "#E3FEF7",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'black',
          marginBottom: '10px'
        }}
      >
        <Typography variant="body1">
          Total Amount: Rs. {selectEvent.amount}
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<TaskAltIcon />}
        onClick={handleClickOpen}
        sx={{
          ...buttonColor,
          borderRadius: '40px',
          '&:hover': { background: '#135D66' },
          width: "210px",
          margin: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Cash Payment
      </Button>

      <Dialog
        open={dialogOpen}
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
            Ticket Booking Total Amount
            <Typography variant="subtitle1" color="textPrimary" textAlign="center">
              <br /> Rs. {selectEvent.amount}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}
            sx={{
              ...buttonColor,
              borderRadius: '40px',
              '&:hover': {
                background: '#135D66',
              }
            }}> Pay </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={successMessageOpen}
        onClose={handleSuccessMessageClose}
        aria-labelledby="success-dialog-title"
        aria-describedby="success-dialog-description"
      >
        <DialogTitle id="success-dialog-title">Payment Successful</DialogTitle>
        <DialogContent>
          <DialogContentText id="success-dialog-description">
            Your payment was successful. You have received an email and invoice.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessMessageClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

    </Paper>
  )
}

export default BillSummary;
