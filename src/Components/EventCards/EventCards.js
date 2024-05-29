// import React, { useState, useEffect } from "react";
// import { Grid } from "@mui/material";
// import EventCard from "./EventCard";
// import axios from "axios";

// const EventCards = () => {
//   const [eventsArray, setEventsArray] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:3000/admin/manage-events')
//       .then(res => {
//         setEventsArray(res.data); // Assuming res.data is an array of events
//       })
//       .catch(err => {
//         console.error("Error fetching events:", err);
//       });
//   }, []);

//   return (
//     <>
//       <Grid container spacing={2}>
//         {eventsArray.map((event) => (
//           <Grid item key={event.id} xs={12} sm={6} md={4}>
//             <EventCard
//               title={event.name}
//               image={event.eventImage}
//               date={event.date}
//               time={event.time}
//               location={event.location}
//               priceRange={event.priceRange}
//               availability={event.availability}
//               ticketImage="src/Assets/Images/ticketIcon.png"
//               priceTagImage="src/Assets/Images/priceTag.png"
//               editable={false} // Assuming regular users should not be able to edit
//             />
//           </Grid>
//         ))}
//       </Grid>
//     </>
//   );
// }

// export default EventCards;
