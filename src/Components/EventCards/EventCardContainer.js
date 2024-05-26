import React, { useState, useEffect } from 'react';
import { ref, get, onValue } from 'firebase/database';
import { database } from '../../../../firebase-config';
import EventCard from './EventCard';

const EventCardContainer = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventsRef = ref(database, 'events');
    
    // Fetch events from Firebase in real-time
    onValue(eventsRef, (snapshot) => {
      const eventData = snapshot.val();
      if (eventData) {
        // Convert object of events to array
        const eventsArray = Object.entries(eventData).map(([eventId, eventData]) => ({
          id: eventId,
          ...eventData
        }));
        setEvents(eventsArray);
      } else {
        setEvents([]);
      }
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          title={event.name}
          image={event.eventImage}
          date={event.date}
          time={event.time}
          location={event.location}
          priceRange={event.priceRange}
          ticketImage={event.ticketImage} 
          priceTagImage={event.priceTagImage}
          availability={event.availability}
        />
      ))}
    </div>
  );
};

export default EventCardContainer;
