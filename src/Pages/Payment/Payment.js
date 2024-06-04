import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Card from 'react-credit-cards';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from './utils';
import 'react-credit-cards/es/styles-compiled.css';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CssBaseline,
  Grid,
  Snackbar,
  Alert,
  Paper,
  Divider,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
  DialogActions,
} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SendPdf from '../Payment/SendPdf/SendPdf';

const theme = createTheme();

const buttonColor = {
  background: '#439A97',
  border: '3.5px solid #135D66',
  borderRadius: 40,
  boxShadow: '#62B6B7',
  color: 'white',
};

const Payment = () => {
  const pdfRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const textFeild = useRef();
  const [state, setState] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
    errors: {
      name: '',
      number: '',
      expiry: '',
      cvc: '',
    },
    snackbar: {
      open: false,
      message: '',
      severity: 'success',
    },
    dialogOpen: false,
    successMessageOpen: false,
  });

  const { number, name, expiry, cvc, focused, issuer, errors, snackbar, dialogOpen, successMessageOpen } = state;

  const handleClickOpen = () => {
    setState({ ...state, dialogOpen: true });
  };

  const handleClose = () => {
    setState((prevState) => ({
      ...prevState,
      dialogOpen: false,
      successMessageOpen: !prevState.successMessageOpen,
    }));
  };

  const handleClose2 = () => {
    setState({
      ...state,
      dialogOpen: false,
      successMessageOpen: false,
    });
  };
  

  // const handleSuccessMessageOpen = () => {
  //   setState({ ...state, successMessageOpen: true });
  // };

  const handleSuccessMessageClose = () => {
    sendEmail();
    setState({ ...state, successMessageOpen: false });
    navigate("/home");
  };

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setState({ ...state, issuer });
    }
  };

  const handleInputFocus = ({ target }) => {
    setState({
      ...state,
      focused: target.name,
    });
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    let formattedValue = value;

    if (name === 'number') {
      formattedValue = value.replace(/\D/g, '').slice(0, 19);
      formattedValue = formatCreditCardNumber(formattedValue);
    } else if (name === 'expiry') {
      formattedValue = formatExpirationDate(value);
    } else if (name === 'cvc') {
      formattedValue = formatCVC(value);
    }

    setState({ ...state, [name]: formattedValue }, () => {
      validateField(name, formattedValue);
    });
  };

  const validateField = (name, value) => {
    let updatedErrors = { ...errors };
    
    switch (name) {
      case 'name':
        updatedErrors.name = /^[a-zA-Z\s]+$/.test(value) ? '' : 'Name must contain only letters and spaces';
        break;
      case 'number':
        const cardNumberLength = value.replace(/\s/g, '').length;
        updatedErrors.number = (cardNumberLength >= 13 && cardNumberLength <= 19) ? '' : 'Card number must have 13-19 digits';
        break;
      case 'expiry':
        updatedErrors.expiry = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value) ? '' : 'Expiry date is invalid';
        const today = new Date();
        const [expMonth, expYear] = value.split('/');
        const expiryDate = new Date(`20${expYear}`, expMonth - 1);
        if (expiryDate < today) {
          updatedErrors.expiry = 'Card has expired';
        }
        break;
      case 'cvc':
        updatedErrors.cvc = /^[0-9]{3,4}$/.test(value) ? '' : 'CVC must be 3 or 4 digits';
        break;
      default:
        break;
    }

    setState({ ...state, errors: updatedErrors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors } = state;

    if (!validateForm(errors)) {
      setState({
        ...state,
        snackbar: {
          open: true,
          message: 'Please fill out the form correctly.',
          severity: 'error',
        },
      });
      return;
    }

    const { name, number, expiry, cvc } = state;
    if (!name || !number || !expiry || !cvc) {
      setState({
        ...state,
        snackbar: {
          open: true,
          message: 'Please fill out all the fields.',
          severity: 'error',
        },
      });
      return;
    }

    setState({
      ...state,
      snackbar: {
        open: true,
        message: 'You have finished payment!',
        severity: 'success',
      },
    });

    setState({
      ...state,
      number: '',
      name: '',
      expiry: '',
      cvc: '',
      issuer: '',
      focused: '',
      formData: null,
    });
  };



  const sendEmail = () => {
  const bookingDetails = location.state && location.state.bookingDetails;
  const emailData = {
    to_name: bookingDetails.customerName,
    event_name: bookingDetails.eventName,
    ticket_count: bookingDetails.ticketCount,
    total_amount: bookingDetails.totalAmount,
    customer_name: bookingDetails.customerName,
    contact_number: bookingDetails.contactNumber,

    from_name: "Team Ticketify", // Change this to the sender's name
    message: `\nThank you for your booking!\n\nEvent Name: ${bookingDetails.eventName}
      Tickets Counts: ${bookingDetails.ticketCount}\nTotal Amount: ${bookingDetails.totalAmount}\nYour Name: ${bookingDetails.customerName}`,
  };

    // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailData, 'PUBLICK_KEY')
    emailjs.send('service_66yj6al', 'template_e5izx5t', emailData, 'nahRi-I21XB8YHHtc')
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
    })
    .catch((error) => {
      console.error('Failed to send email. Error: ', error);
    });
};

const handleDownloadPdf = () => {
  const input = pdfRef.current;
  html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('invoice.pdf');
  });
};

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((error) => {
      if (error.length > 0) {
        valid = false;
      }
    });
    return valid;
  };

  const handleCloseSnackbar = () => {
    setState({
      ...state,
      snackbar: {
        open: false,
        message: '',
        severity: 'success',
      },
    });
  };

  const bookingDetails = location.state && location.state.bookingDetails ? location.state.bookingDetails : null;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} padding="20px" marginTop="30px">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Enter your payment details
              </Typography>
              <Typography variant="body2" gutterBottom>
                Please input your information below
              </Typography>
              <Card
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focused}
                callback={handleCallback}
              />
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 3, width: '100%' }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label ="Name on card"
                      name="name"
                      autoComplete="cc-name"
                      onChange={handleInputChange} 
                      onFocus={handleInputFocus} 
                      error={errors.name.length > 0}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="number"
                      label="Card Number"
                      name="number"
                      autoComplete="cc-number"
                      onChange={handleInputChange} 
                      onFocus={handleInputFocus} 
                      error={errors.number.length > 0}
                      helperText={errors.number}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="expiry"
                      label="MM/YY"
                      name="expiry"
                      autoComplete="cc-exp"
                      onChange={handleInputChange} 
                      onFocus={handleInputFocus} 
                      error={errors.expiry.length > 0}
                      helperText={errors.expiry}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="cvc"
                      label="CVC"
                      name="cvc"
                      autoComplete="cc-csc"
                      onChange={handleInputChange} 
                      onFocus={handleInputFocus} 
                      error={errors.cvc.length > 0}
                      helperText={errors.cvc}
                    />
                  </Grid>
                </Grid><br/>
                <input type="hidden" name="issuer" value={issuer} /> 
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    ...buttonColor,
                    borderRadius: '40px',
                    '&:hover': { background: '#135D66' },
                    width: "150px",
                    margin: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  Checkout
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'left', padding: '60px' }}>
              <Paper elevation={3} 
                sx={{ 
                  padding: '20px', 
                  maxWidth: '800px', 
                  margin: '0 auto', 
                  background: '#CBEDD5',
                  border: '3px solid #003C43', 
                }}
              >
                <Typography component="h2" variant="h6" sx={{ textAlign: 'center' }}>
                  <b><u>Bill Summary</u></b>
                </Typography>
                <div style={{ display: 'flex' }}>
                  <Typography variant="body1" ref={textFeild} onSubmit={sendEmail}>
                    <b>Customer Name:</b> &nbsp; {bookingDetails && bookingDetails.customerName}
                  </Typography>
                </div>
                <Typography variant="body1" ref={textFeild} onSubmit={sendEmail}>
                  <b>Email:</b> &nbsp; {bookingDetails && bookingDetails.email}
                </Typography>
                <Typography variant="body1" ref={textFeild} onSubmit={sendEmail}>
                  <b>Contact Number:</b> &nbsp; {bookingDetails && bookingDetails.contactNumber}
                </Typography>
                <Typography variant="body1" ref={textFeild} onSubmit={sendEmail}>
                  <b>Book Event Name:</b> &nbsp; {bookingDetails && bookingDetails.eventName}
                </Typography>
                <Typography variant="body1" ref={textFeild} onSubmit={sendEmail}>
                  <b>Counts of Tickets:</b> &nbsp; {bookingDetails && bookingDetails.ticketCount}
                </Typography> 
                <br/>
                <Divider variant="middle" component="li" sx={{ border: '2px solid' }} />  
                <br/>
                <Box
                  sx={{
                    width: "100%",
                    height: 50,
                    borderRadius: 1,
                    bgcolor: "#E3FEF7",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: 'black',
                    marginBottom: '10px'
                  }}
                >
                  <Typography variant="body1" ref={textFeild} onSubmit={sendEmail}>
                    <b>Total Amount: Rs.</b> &nbsp; {bookingDetails && bookingDetails.totalAmount}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  startIcon={<TaskAltIcon />}
                  onClick={handleClickOpen}
                  sx={{
                    ...buttonColor,
                    borderRadius: '40px',
                    '&:hover': { background: '#135D66' },
                    width: "150px",
                    margin: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                 Pay Now
                </Button>

                <Dialog
                  open={dialogOpen} 
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
                      Ticket Booking Total Amount
                      <Typography variant="subtitle1" color="textPrimary" textAlign="center">
                        <br/> RS. &nbsp; {bookingDetails && bookingDetails.totalAmount}
                      </Typography>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    
                      <Button onClick={handleClose}> 
                      Pay 
                      </Button>
                    
                    <Button onClick={handleClose2} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={successMessageOpen} 
                  onClose={handleClose}
                  aria-labelledby="success-dialog-title"
                  aria-describedby="success-dialog-description"
                >
                  <DialogTitle id="success-dialog-title">Payment Successful</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="success-dialog-description">
                      Your payment was successful. You have received an email and invoice.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                  <Button onClick={handleClose} color="primary" marginBottom = "30">
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        handleSuccessMessageClose();
                      }}
                      color="primary"
                      autoFocus
                    >
                      OK
                    </Button>
                    
                  </DialogActions>
                  <div ref={pdfRef} id="pdfContent">
                    <SendPdf bookingDetails={bookingDetails} />
                  </div>
                    <Button
                      onClick={() => handleDownloadPdf(bookingDetails)}
                      color="primary"
                      autoFocus
                    >
                      Download PDF
                    </Button>
                </Dialog>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar} 
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default Payment;

