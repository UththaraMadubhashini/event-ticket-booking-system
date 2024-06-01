import React from 'react';
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

const theme = createTheme();

const buttonColor = {
  background: '#439A97',
  border: '3.5px solid #135D66',
  borderRadius: 40,
  boxShadow: '#62B6B7',
  color: 'white',
};

class Payment extends React.Component {
  state = {
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
  };

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
    this.handleSuccessMessageOpen();
  };

  handleSuccessMessageOpen = () => {
    this.setState({ successMessageOpen: true });
  };
  
  handleSuccessMessageClose = () => {
    this.setState({ successMessageOpen: false });
  };
  

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
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
  
    this.setState({ [name]: formattedValue }, () => {
      this.validateField(name, formattedValue);
    });
  };  

  validateField = (name, value) => {
    let errors = this.state.errors;
    
    switch (name) {
      case 'name':
        errors.name = /^[a-zA-Z\s]+$/.test(value) ? '' : 'Name must contain only letters and spaces';
        break;
      case 'number':
        const cardNumberLength = value.replace(/\s/g, '').length;
        errors.number = (cardNumberLength >= 13 && cardNumberLength <= 19) ? '' : 'Card number must have 13-19 digits';
        break;
      case 'expiry':
        errors.expiry = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value) ? '' : 'Expiry date is invalid';
        const today = new Date();
        const [expMonth, expYear] = value.split('/');
        const expiryDate = new Date(`20${expYear}`, expMonth - 1);
        if (expiryDate < today) {
          errors.expiry = 'Card has expired';
        }
        break;
      case 'cvc':
        errors.cvc = /^[0-9]{3,4}$/.test(value) ? '' : 'CVC must be 3 or 4 digits';
        break;
      default:
        break;
    }

    this.setState({ errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { errors } = this.state;

    if (!this.validateForm(errors)) {
      this.setState({
        snackbar: {
          open: true,
          message: 'Please fill out the form correctly.',
          severity: 'error',
        },
      });
      return;
    }

    const { name, number, expiry, cvc } = this.state;
    if (!name || !number || !expiry || !cvc) {
      this.setState({
        snackbar: {
          open: true,
          message: 'Please fill out all the fields.',
          severity: 'error',
        },
      });
      return;
    }

    this.setState({
      snackbar: {
        open: true,
        message: 'You have finished payment!',
        severity: 'success',
      },
    });

    this.form.reset();
    this.setState({
      number: '',
      name: '',
      expiry: '',
      cvc: '',
      issuer: '',
      focused: '',
      formData: null,
    });
  };

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((error) => {
      if (error.length > 0) {
        valid = false;
      }
    });
    return valid;
  };

  handleCloseSnackbar = () => {
    this.setState({
      snackbar: {
        open: false,
        message: '',
        severity: 'success',
      },
    });
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, errors, snackbar } = this.state;
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
                callback={this.handleCallback}
              />
              <Box
                component="form"
                ref={(c) => (this.form = c)}
                onSubmit={this.handleSubmit}
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
                      label="Name on card"
                      name="name"
                      autoComplete="cc-name"
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
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
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
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
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
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
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
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
                width: "210px",
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
              <div style={{ marginRight: '80px' }}>
                <Typography variant="body1">
                  Customer ID:
                </Typography>
              </div>
              <Typography variant="body1">
                Customer Name:
              </Typography>
            </div>
            <Typography variant="body1">
              Email:
            </Typography>
            <Typography variant="body1">
              Contact Number:
            </Typography>
            <Typography variant="body1">
              Book Event Name:
            </Typography>
            <Typography variant="body1">
              Counts of Tickets:
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
              <Typography variant="body1">
                Total Amount: Rs.
              </Typography>
            </Box>

            
            <Button
              variant="contained"
              startIcon={<TaskAltIcon />}
              onClick={this.handleClickOpen}
              sx={{
                ...buttonColor,
                borderRadius: '40px',
                '&:hover': { background: '#135D66' },
                width: "210px",
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Cash Payment
            </Button>

            <Dialog
        open={this.state.dialogOpen}
        onClose={this.handleClose}
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
                <br/> RS.__ {}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} 
          sx={{...buttonColor,
              borderRadius: '40px',
              '&:hover': {
              background: '#135D66',
        }}}> Pay </Button>
        </DialogActions>
      </Dialog>

      <Dialog
  open={this.state.successMessageOpen}
  onClose={this.handleSuccessMessageClose}
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
    <Button onClick={this.handleSuccessMessageClose} color="primary" autoFocus>
      OK
    </Button>
  </DialogActions>
</Dialog>


          


            

              </Paper>
        </Box>
        </Grid>
        </Grid>
        </Container>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert onClose={this.handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    );
  }
}

export default Payment;
