import React from 'react';
import { Container, Typography, Grid, Paper, Divider, Box } from '@mui/material';
import logo from "../../../Assets/Images/Logo.png"


function SendPdf({ bookingDetails  }) {

    if (!bookingDetails) {
        return (
          <Container>
            <Typography variant="h4" align="center" gutterBottom>
              INVOICE
            </Typography>
            <Typography variant="body1">No booking details available.</Typography>
          </Container>
        );
      }
      
  return (
    <Container>
        <Paper sx={{ p: 6, marginTop:"20px", maxWidth:"550px", }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <img src={logo} alt="Logo" style={{ height: "60px" }} />
          <Typography variant="h4" align="center" gutterBottom sx={{ flexGrow: 1 }}>
            <center>INVOICE</center>
          </Typography>
        </Box>

      <Typography justifyContent="center">
      <center>Your tickets booking has being Successfully Completed and get it on 
        that day pick your ticket...</center>
      </Typography>
      
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          
          <Typography><b>Customer Name:</b> &nbsp; {bookingDetails.customerName}</Typography>
          <Typography><b>Email:</b> &nbsp; {bookingDetails.email}</Typography>
          <Typography><b>Book Event Name:</b> &nbsp; {bookingDetails.eventName}</Typography>
          <Typography><b>Counts of Tickets:</b> &nbsp; {bookingDetails.ticketCount}</Typography>
          <Divider variant="middle" sx={{ mt: 2, mb: 2 }} />
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography>Total Amount: &nbsp; {bookingDetails.totalAmount} </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <Typography align="center" sx={{ mt: 2 }}>
        Thank you for buying tickets from our website. Enjoy the event with us. Happy entertainment!
      </Typography>
      <Typography align="center" sx={{ mt: 2 }}>
        &copy; Ticketify
      </Typography>
      </Paper>
    </Container>
  );
}

export default SendPdf;
