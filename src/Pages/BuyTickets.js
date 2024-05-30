import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const BuyTickets = () => {
  const location = useLocation();
  const { state } = location;
  const selectedEvent = useSelector((state) => state.ticket.selectedEvent) || (state && state.event);

  // Check if selectedEvent is null or undefined
  if (!selectedEvent) {
    return <div>No event selected.</div>;
  }

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 5, padding: 2 }}>
      <CardMedia
        component="img"
        height="194"
        image={selectedEvent.eventImage}
        alt={selectedEvent.name}
      />
      <CardContent>
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
          Availability: {selectedEvent.availability}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {selectedEvent.category}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BuyTickets;
