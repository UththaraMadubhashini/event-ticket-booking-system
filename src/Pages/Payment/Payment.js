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
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

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
      // Remove any non-digit characters and limit input to 19 digits
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

    if (this.validateForm(errors)) {
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
    } else {
      this.setState({
        snackbar: {
          open: true,
          message: 'Please fill out the form correctly.',
          severity: 'error',
        },
      });
    }
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
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Enter your payment details
            </Typography>
            <Typography variant="body2">
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
              sx={{ mt: 3 }}
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
    helperText={errors.expiry.length > 0 ? errors.expiry :''}
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
              </Grid>
              <input type="hidden" name="issuer" value={issuer} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
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
