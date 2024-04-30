// import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@mui/material/styles';
// import { Typography, Button } from '@mui/material';


// const submitTicket = () => {
//   alert('Successfully Booked.');
// };

// const moviePrices = {
//   oppenheimer: 11,
//   mission: 12,
//   titanic: 10,
//   starWars: 13,
//   endgame: 15,
//   theMarvel: 14,
//   theExorcist: 13,
//   theTenCommandments: 12,
//   fastX: 11, // Assuming fastX is enabled
//   theForceAwakens: 10,
// };

// const useStyles = makeStyles((theme) => ({
//   root: {
//     textAlign: 'center',
//     padding: theme.spacing(3),
//   },
//   seat: {
//     margin: theme.spacing(0.5),
//     width: '20px',
//     height: '26px',
//     borderRadius: '5px',
//     background: 'linear-gradient(red, darkred 40%, black 79%, red 80%, darkred 90%)',
//     fontSize: '1.4em',
//     fontWeight: 'bold',
//     color: 'transparent',
//     cursor: 'pointer',
//     '&.selected': {
//       background: 'linear-gradient(lightgreen, green 40%, darkgreen 79%, lightgreen 80%, green 90%)',
//     },
//     '&.occupied': {
//       background: 'linear-gradient(lightgrey, grey 40%, darkslategrey 79%, lightgrey 80%, grey 90%)',
//     },
//     '&:hover': {
//       background: 'linear-gradient(pink, red 40%, darkred 79%, pink 80%, red 90%)',
//       color: 'white',
//     },
//   },
// }));

// const SeatSelection = () => {
//   const classes = useStyles();
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState('oppenheimer');
//   const [totalPrice, setTotalPrice] = useState(0);

//   const handleMovieSelection = (event) => {
//     setSelectedMovie(event.target.value);
//   };

//   const moviePrice = moviePrices[selectedMovie];

//   useEffect(() => {
//     const totalPrice = selectedSeats.length * moviePrice;
//     setTotalPrice(totalPrice);
//   }, [selectedSeats, moviePrice]);

//   const handleSeatSelection = (seat) => {
//     if (selectedSeats.includes(seat)) {
//       setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
//     } else {
//       setSelectedSeats([...selectedSeats, seat]);
//     }
//   };

//   return (
//     <div className={classes.root}>
//       <Typography variant="h1">Movie Seat Booking</Typography>
//       <section id="seat-selection">
//         <Typography variant="h2">Choose your seats</Typography>
//         <div className="container">
//           <div id="seating">
//             {Array.from({ length: 5 }, (_, row) => (
//               <div key={`row-${row}`} className="row">
//                 {Array.from({ length: 16 }, (_, index) => (
//                   <div
//                     key={`seat-${row}-${index}`}
//                     className={`${classes.seat} ${selectedSeats.includes(index) ? 'selected' : ''}`}
//                     onClick={() => handleSeatSelection(index)}
//                   />
//                 ))}
//               </div>
//             ))}
//           </div>
//           <div id="seating-key">
//             <div className={classes.seat} /> Vacant
//             <div className={`${classes.seat} selected`} /> Selected
//             <div className={`${classes.seat} occupied`} /> Occupied
//           </div>
//           <section id="total">
//             <Typography variant="body1">
//               Number of seats selected: {selectedSeats.length}
//               <br />
//               Total: ${totalPrice.toFixed(2)}
//             </Typography>
//             <Button variant="contained" color="primary" onClick={submitTicket}>
//               Confirm Booking
//             </Button>
//           </section>
//           <div id="screen" />
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SeatSelection;
