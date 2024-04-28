import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Grid } from '@mui/material';
import ImageBuy1 from '../Assets/Images/01.BASS Cham_cd.jpg';
import EventCard from '../Components/EventCards/EventCards';

const BassEnigma = () => {
  // State to store the details of the selected event
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Function to handle button click and update selectedEvent state
  const handleButtonClick = (eventDetails) => {
    setSelectedEvent(eventDetails);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1" gutterBottom>
          
          <p>Summary:</p>
           
          <p><u><b>BASS ENIGMA</b></u></p>

          <p style={{ color: 'red' }}>Please take note of the following guidelines when purchasing online tickets. 
    / අන්තර්ජාල ප්‍රවේශපත්‍ර ලබා ගැනීමේදී පහත කරුණු පිළිබඳව ඔබගේ අවධානය යොමු කරන්න.</p>

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
    පණිවිඩය පමණක් ප්‍රවේශ පත්‍ර වලංගු කිරීමට භාවිත කරන අතර Screenshot, Forwarded Email පණිවිඩ සඳහා සහ වෙනයම් අයෙකුට කුමන හේතුවක් නිසා අප විසින් ප්‍රවේශපත්‍ර 
    නිකුත් කරනු නොලැබේ.</span></p>

    <p>04. Ticketify shall not be held accountable for any inconvenience caused in the organization of the concert.<br/>
    <span style={{ color: 'blue' }}>04. ප්‍රසංගයේ සංවිධාන කටයුතු වල සිදුවන අපහසුතාවයන් සඳහා Ticketify කිසිදු වගකීමක් දරනු නොලැබේ.</span></p>

        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{ textAlign: 'center', padding: '20px' }}>
          <Paper elevation={3} sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <img src={ImageBuy1} alt="" style={{ width: '100%', marginBottom: '20px' }} />
            <Typography variant="h4" gutterBottom>
              BassEnigma
            </Typography>
            <Typography variant="body1" gutterBottom>
              Date: SAT APR 27
            </Typography>
            <Typography variant="body1" gutterBottom>
              Time: 03.00 PM
            </Typography>
            <Typography variant="body1" gutterBottom>
              Location: Taprobane - Rajagiriya
            </Typography>
            <Typography variant="body1" gutterBottom>
              Availability: 150
            </Typography>
            <Typography variant="body1" gutterBottom>
              Ticket Price:
            </Typography>
            <Typography variant="body1" gutterBottom>
              - Standing: Rs. 1000
            </Typography>
            <Typography variant="body1" gutterBottom>
              - Seating: Rs. 5000
            </Typography>
            {/* Button for buying ticket */}
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => handleButtonClick({
                title: 'BASS ENIGMA',
                date: 'SAT APR 27',
                time: '03.00 PM',
                location: 'Taprobane - Rajagiriya',
                availability: 150,
                standingPrice: 1000,
                seatingPrice: 5000
              })}
            >
              Purchase Ticket
            </Button>
          </Paper>
        </Box>
        
      </Grid>

      {/* Display selected event details in the EventCard */}
      {selectedEvent && (
        <Grid item xs={12}>
          <EventCard
            title={selectedEvent.title}
            date={selectedEvent.date}
            time={selectedEvent.time}
            location={selectedEvent.location}
            availability={selectedEvent.availability}
            standingPrice={selectedEvent.standingPrice}
            seatingPrice={selectedEvent.seatingPrice}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default BassEnigma;
