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
import { Link, useNavigate  } from 'react-router-dom';

const buttonColor = {
  background: '#439A97',
  border: '3.5px solid #135D66',
  boxShadow: '#62B6B7',
  color: 'white',
  height: 45,
  padding: '0 30px',
  marginTop: '10px',
};

const EventCard = ({ event, title, image, date, time, location, priceRange, availability, ticketImage, priceTagImage }) => {
  const navigate = useNavigate();
  
  const handleBuyTickets = () => {
    navigate(`/buy-tickets/${event.id}`, { state: { event } });
  };

  return (
    <Card sx={{
      width: 325,
      height: 530,
      marginTop: 3.5,
      marginRight: 3,
      background: '#CBEDD5',
      border: '3px solid #003C43',
    }}>
      <CardHeader title={title} />
      <CardMedia component="img" height="194" image={image} alt="Event" />
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Chip icon={<CalendarMonthIcon />} label={`Date: ${date}`} sx={{ backgroundColor: '#E3FEF7' }} />
          </Grid>
          <Grid item>
            <Chip icon={<AccessTimeIcon />} label={`Time: ${time}`} sx={{ backgroundColor: '#E3FEF7' }} />
          </Grid>
        </Grid>
        <Grid container alignItems="center" marginTop={2}>
          <Grid item>
            <Chip icon={<RoomIcon />} label={`Location: ${location}`} sx={{ backgroundColor: '#E3FEF7' }} />
          </Grid>
        </Grid>
        <Grid item>
          <Chip
            icon={<img src={require('../../Assets/Images/availabilityIcon.png')} alt="Availability" style={{ width: '20px', height: '20px', marginRight: '0px' }} />}
            label={`Availability: ${availability}`}
            sx={{ backgroundColor: '#E3FEF7', marginTop: '15px' }}
          />
        </Grid>
        <Grid container alignItems="center" marginTop={2}>
          <Grid item>
            <Chip
              icon={<img src={priceTagImage} alt="Price Tag" style={{ width: '25px', height: '20px', marginRight: '5px' }} />}
              label={`Price Range: ${priceRange}`}
              sx={{ backgroundColor: '#E3FEF7' }}
            />
          </Grid>
        </Grid>
      </CardContent>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          component={Link}
          to={`/buy-tickets/${title.replace(/\s+/g, '-').toLowerCase()}`}
          startIcon={<img src={ticketImage} alt="Ticket Icon" style={{ width: '25px', height: '20px', marginRight: '5px' }} />}
          onClick={handleBuyTickets}
          sx={{ ...buttonColor, borderRadius: '40px', '&:hover': { background: '#135D66' } }}
        >
          Buy Tickets
        </Button>
      </Stack>
    </Card>
  );
};

export default EventCard;
