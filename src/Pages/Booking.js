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
  createData('Event Name', 100, 1, 24, 100), // Default count is set to 1
];

export default function Booking() {
  const [count, setCount] = React.useState(rows[0].count); // State for the selected count

  const handleChange = (event) => {
    const newCount = parseInt(event.target.value);
    if (!isNaN(newCount)) {
      setCount(newCount);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Typography style={{ fontFamily: 'YourCreativeFont, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        {/* Breadcrumb */}
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              MUI
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="#"
            >
              Core
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
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
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#FFEFEF' }}>TICKET</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#FFEFEF' }}>PRICE</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#FFEFEF' }}>COUNT OF TICKETS</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#FFEFEF' }}>SEATS</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '14px', bgcolor: '#F3D0D7' }}>AMOUNT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
        <Button sx={{
                width: '200px',
                height: '40px',
                mx: 'auto', // horizontally center the button
            }}
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<ThumbUpAltIcon />}
        >
            Booking Confirm</Button>
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
                <br/> RS. {}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NEXT</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>




      </div>
    </Typography>
  );
}
