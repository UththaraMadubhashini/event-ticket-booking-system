// Payment.js
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
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    alert('You have finished payment!');
    this.form.reset();
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer } = this.state;

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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="expiry"
                    label="Expiration Date"
                    name="expiry"
                    autoComplete="cc-exp"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
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
      </ThemeProvider>
    );
  }
}

export default Payment;
