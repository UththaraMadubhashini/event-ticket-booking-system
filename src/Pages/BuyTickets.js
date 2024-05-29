import React from 'react';

const BuyTickets = (props) => {
  // Check if props.location exists before accessing its state property
  const event = props.location ? props.location.state.event : null;

  if (!event) {
    // If event data is not available, render an appropriate message or redirect to a different page
    return (
      <div>
        <h1>Event Not Found</h1>
        <p>The event details are not available.</p>
      </div>
    );
  }

  // Render details of the event
  return (
    <div>
      <h1>{event.title}</h1>
      {/* Render other details of the event */}
    </div>
  );
};

export default BuyTickets;
