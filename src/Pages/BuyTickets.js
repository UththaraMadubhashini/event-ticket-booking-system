import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Typography, Button, Grid, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const BuyTickets = () => {
  const location = useLocation();
  const { state } = location;
  const selectedEvent = useSelector((state) => state.ticket.selectedEvent) || (state && state.event);

  // Define button gradient style
  const buttonColor = {
    background: '#439A97',
    border: '3.5px solid #135D66',
    borderRadius: 40,
    boxShadow: '#62B6B7',
    color: 'white',
    height: 45,
    padding: '0 30px',
    marginTop: '10px',
  };

  if (!selectedEvent) {
    return <div>No event selected.</div>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1" gutterBottom>
          <p>Summary:</p>
          <p><u><b>{selectedEvent.name}</b></u></p>
          <p style={{ color: 'red' }}>Please take note of the following guidelines when purchasing online tickets.</p>
          <p>01. All tickets purchased are non-refundable.<br/>
            <span style={{ color: 'blue' }}>01. අන්තර්ජාල ප්‍රවේශපත්‍රය කිසිදු ආකාරයකින් නැවත ගෙවීමක් සිදු කරනු නොලැබේ.</span></p>
          <p>02. Please note that our online tickets cannot be changed once purchased. This includes changes to the category, show, seat, price, or 
            any other aspects of the ticket. We highly recommend that you carefully review your selection before completing your online purchase to 
            ensure that you have chosen the correct ticket.<br/>
            <span style={{ color: 'blue' }}>02. අන්තර්ජාල ප්‍රවේශපත්‍රයක් කිසිදු අයුරකින් හෝ කිසිදු හේතුවක් මත වෙනස් කිරීමකට ( ඛාණ්ඩය / ප්‍රසංගය / ආසන හෝ ආසනය / 
            මිළ ආදී කිසිවක්... ) හැකියාවක් නොමැති අතර කිසිදු අයුරකින් නැවත ගෙවීමක් අප විසින් සිදු කරනු නොලැබේ. එම නිසා ඔබගේ අන්තර්ජාල ප්‍රවේශ පත්‍රය නිවැරදි ලෙස තෝරා ලබාගන්න.</span></p>
          <p>03. Only the initial email provided by Ticketify will be accepted as proof of purchase, Tickets will not be redeemed for any 
            forwarded or screenshots.<br/>
            <span style={{ color: 'blue' }}>03. ප්‍රවේශපත්‍ර නිකුත් කරණු ලබන්නේ Ticketify ප්‍රවේශපත්‍රය ලබා ගැනීමේදී අප විසින් ඔබ වෙත එවන ලද වලංගු Email Confirmation 
            පණිවිඩය පමණක් ප්‍රවේශ පත්‍ර වලංගු කිරීමට භාවිත කරන අතර Screenshot, Forwarded Email පණිවිඩ සඳහා සහ වෙනයම් අයෙකුට කුමන හේතුවක් නිසා අප විසින් ප්‍රවේශපත්
            නිකුත් කරනු නොලැබේ.</span></p>
            <p>04. Ticketify shall not be held accountable for any inconvenience caused in the organization of the concert.<br/>
            <span style={{ color: 'blue' }}>04. ප්‍රසංගයේ සංවිධාන කටයුතු වල සිදුවන අපහසුතාවයන් සඳහා Ticketify කිසිදු වගකීමක් දරනු නොලැබේ.</span></p>
        </Typography>
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <Box sx={{ textAlign: 'center', padding: '20px' }}>
          <Paper elevation={3} 
            sx={{ 
              padding: '20px', 
              maxWidth: '800px', 
              margin: '0 auto', 
              background: '#CBEDD5',
              border: '3px solid #003C43', 
            }}
          >
            <img
              src={selectedEvent.eventImage}
              alt={selectedEvent.name}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <Typography variant="h5" component="div">
              {selectedEvent.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {selectedEvent.date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Time: {selectedEvent.time}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {selectedEvent.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price Range: {selectedEvent.priceRange}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category: {selectedEvent.category}
            </Typography>
            {/* Button for buying ticket */}
            <Button 
              variant="contained" 
              color="primary"
              component={Link}
              to="/bookings"
              sx={{
                ...buttonColor,
                '&:hover': {
                  background: '#135D66',
                }
              }}
            >
              Purchase Ticket
            </Button>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BuyTickets;

