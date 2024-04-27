import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';


const EventCard = ({ title, image, date, time, location, priceRange, ticketImage, priceTagImage, availability }) => {
  return (
    <Card sx={{ width: 325, height: 525, marginTop: 3.5, marginRight: 3 }}>
      <CardHeader
        title={title}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Event"
      />
      <CardContent>
        <Grid container alignItems="center" spacing={8}>
          <Grid item>
            <Chip icon={<CalendarMonthIcon />} label={date} />
          </Grid>
          <Grid item>
            <Chip icon={<AccessTimeIcon />} label={time} />
          </Grid>
        </Grid>
        <Grid container alignItems="center" marginTop={2}>
          <Grid item>
            <Chip icon={<RoomIcon />} label={location} />
          </Grid>
        </Grid>
        <Grid item>
          <Chip
            icon={<img src={require('../../Assets/Images/availabilityIcon.png')} alt="Availability" 
            style={{ width: '20px', height: '20px', marginRight: '0px'}} />}
            label={`Availability: ${availability}`} 
            sx={{ marginTop: '15px' }}
          />
        </Grid>
        <Grid container alignItems="center" marginTop={2}>
          <Grid item>
            <Chip
              icon={<img src={priceTagImage} alt="Price Tag" 
              style={{ width: '25px', height: '20px', marginRight: '5px'}} />}
              label={priceRange}
            />
          </Grid>
        </Grid>
      </CardContent>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" 
          component={Link} to="/buy-tickets"
          startIcon={<img src={ticketImage} alt="Ticket Icon" 
          style={{ width: '25px', height: '20px', marginRight: '5px'}} />}
        >
          Buy Tickets
        </Button>
      </Stack>
    </Card>
  );
}

export default EventCard;
