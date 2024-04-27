import React from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ImageBuy from '../Assets/Images/chamBuyImage.jpg';

const BuyTickets = () => {
  const history = useHistory();

  const handleBuyTicket = () => {
    history.push('/buytickets');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1" gutterBottom>
          Summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et urna sed mauris placerat ultricies.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{ textAlign: 'center', padding: '20px' }}>
          <Paper elevation={3} sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <img src={ImageBuy} alt="" style={{ width: '100%', marginBottom: '20px' }} />
            <Typography variant="h4" gutterBottom>
              BASS ENIGMA
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
              - Standing: Rs. 0000
            </Typography>
            <Typography variant="body1" gutterBottom>
              - Seating: Rs. 0000
            </Typography>
            <Button variant="contained" color="primary" onClick={handleBuyTicket}>
              Buy Ticket
            </Button>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default BuyTickets;
