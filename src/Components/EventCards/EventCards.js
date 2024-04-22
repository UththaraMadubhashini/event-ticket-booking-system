import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ImageCard1 from '../../Assets/Images/01.BASS Cham_cd.jpg';
import TicketBuy from '../../Assets/Images/ticketIcon.png';

const EventCard = () => {
  return (
    <Card sx={{ width: 325, height: 425, marginTop: 3.5, marginRight: 3 }}>
      <CardHeader
        title="Shrimp and Chorizo Paella"
      />
      <CardMedia
        component="img"
        height="194"
        image={ImageCard1}
        alt="Paella dish"
      />
      <CardContent>
        <Grid container alignItems="center" spacing={8}>
          <Grid item>
            <Chip icon={<CalendarMonthIcon />} label="SAT APR 27" />
          </Grid>
          <Grid item>
            <Chip icon={<AccessTimeIcon />} label="03.00 PM" />
          </Grid>
        </Grid>
        <Grid container alignItems="center" marginTop={2}>
          <Grid item>
            <Chip icon={<RoomIcon />} label="Taprobane - Rajagiriya" />
          </Grid>
        </Grid>
      </CardContent>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" 
        startIcon={<img src={TicketBuy} alt="Ticket Icon" style={{ width: '25px', height: '20px', marginRight: '5px'}} />}>
          Buy Ticket
        </Button>
      </Stack>
    </Card>
  );
}

export default EventCard;
