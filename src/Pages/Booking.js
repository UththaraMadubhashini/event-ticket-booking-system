import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';


//button color
const buttonColor = {
  background: '#439A97',
  border: '3.5px solid #135D66',
  borderRadius: 3,
  boxShadow: '#62B6B7',
  color: 'white',
  height: 45,
  padding: '0 30px',
  marginTop: '10px',
};

// Breadcrumbs
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

// Create table
function createData(name, price, count, seats, amount) {
  return { name, price, count, seats, amount };
}

const rows = [
  createData(),
];

export default function Booking() {
  const [count, setCount] = React.useState(rows[0].count);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    const newCount = parseInt(event.target.value);
    if (!isNaN(newCount) && newCount >= 1) {
      setCount(newCount);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleBookingConfirm = () => {
    setOpen(true);
    navigate('/payment');
  };

  return (
    <Typography style={{ fontFamily: 'YourCreativeFont, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        {/* Breadcrumb */}
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="#">
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="#"
            >
              Buy Ticket
            </Link>
            <Typography color="text.primary">Ticket Bookings</Typography>
          </Breadcrumbs>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', textAlign: 'center' }}>
            Select Your Seats
          </Typography>
        </div>

        {/* Table */}
        <div>
          <TableContainer component={Paper} sx={{ width: '80%', margin: 'auto', marginTop: '30px', marginBottom: '80px'}}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#E3FEF7' }}>EVENT NAME</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#E3FEF7' }}>PRICE</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#E3FEF7' }}>COUNT OF TICKETS</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#E3FEF7' }}>SEATS</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#7AB2B2' }}>AMOUNT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 2 } }}
                  >
                    <TableCell align="center" component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">
                      <input
                        type="number"
                        value={count}
                        onChange={handleChange}
                        style={{ width: 60, textAlign: 'center' }}
                      />
                    </TableCell>
                    <TableCell align="center">{row.seats}</TableCell>
                    <TableCell align="center">{row.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: '700', textAlign: 'center' }}>
            Pick Your Seats
        </Typography>

        {/* Confrim popup */}
        <React.Fragment>
        <Button
        sx={{
        width: '250px',
        height: '40px',
        mx: 'auto', // horizontally center the button
        ...buttonColor,
        borderRadius: '40px',
        '&:hover': {
          background: '#135D66', // Change hover background color
        }}}
        variant="contained"
        onClick={handleBookingConfirm}
        startIcon={<ThumbUpAltIcon />}
      >
        Booking Confirm
        </Button>











        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" 
      >
        <DialogTitle id="alert-dialog-title">
        <Typography variant="h6" component="div" fontWeight="bold">
            Your Booking Confirmations
        </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your Booking Total Amount
            <Typography variant="subtitle1" color="textPrimary" textAlign="center">
                <br/> RS.__ {}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} 
          sx={{...buttonColor,
              borderRadius: '40px',
              '&:hover': {
              background: '#135D66', // Change hover background color
        }}}> NEXT</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
      </div>
    </Typography>
  );
}
