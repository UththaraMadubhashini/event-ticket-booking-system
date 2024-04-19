import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

export default function SignUp() {
  const [checked, setChecked] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  //Inputs
  const[UsernameInput, setUsernameInput]=useState();
  const[emailInput, setEmailInput]=useState();
  const[passwordInput, setPasswordInput]=useState();
  const [contactNumberInput, setContactNumberInput] = useState('');

  //Input errors
  const[UsernameError, setUsernameError]=useState(false);
  const[emailError, setEmailError]=useState(false);
  const[passwordError, setPasswordError]=useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);

  //Form validity
  const [formValid, setFormvalid] = useState();

  //validation for onBlur Username
  const handleUsername = () => {
    if(!UsernameInput || 
      UsernameInput.length < 5 || 
      UsernameInput.length > 20
    ){
      setUsernameError(true);
      return;
    }

    setUsernameError(false)
  };

  //validation for onBlur Email

  const handleEmail = () => {
    if(!isEmail(emailInput)){
      setEmailError(true);
      return;
    }
    setEmailError(false);

  }

  //validation for onBlur password
  const hanndlePassword = () =>{
    if(
      !passwordInput ||
      passwordInput.length < 5 ||
      passwordInput.length > 20
    ){
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  } 

  //validation for onBlur Contact number
  const handleContactNumber = () => {
    if (!contactNumberInput || 
      contactNumberInput.length !== 10 || 
      isNaN(contactNumberInput)) {
      setContactNumberError(true);
      return;
    }
    setContactNumberError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (UsernameError || !UsernameInput) {
      setFormvalid(
        "Username is between 5 - 15 characters long. Please Re-Enter"
      );
      return;
    }
  
    if (emailError || !emailInput) {
      setFormvalid(
        "Email is invalid. Please Re-Enter"
      );
      return;
    }
    
    if (contactNumberError) {
      setFormvalid(
        "Contact number is set to only 10 numbers. Please Re-Enter"
      );
      return;
    }
    
    if (passwordError) {
      setFormvalid(
        "Password is set to 5 - 20 characters. Please Re-Enter"
      );
      return;
    }

    setFormvalid(null);
  
    console.log(UsernameInput);
    console.log(emailInput);
    console.log(passwordInput);
    console.log(contactNumberInput);
  };


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // Change flex direction to column
        alignItems: 'center', // Center items vertically
        marginTop: '30px',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: '350px',
          textAlign: 'center',
          p: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {checked ? (
            <Chip icon={<FaceIcon />} label="Sign Up" color="primary" variant="outlined" />
          ) : (
            <Chip icon={<LockOutlinedIcon />} label="Login" color="primary" variant="outlined" />
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>
        <TextField
          id="standard-basic"
          error={UsernameError}
          label="Username"
          value={UsernameInput}
          onChange={(event) => {
            setUsernameInput(event.target.value);
            setUsernameError(false); 
          }}
          onBlur={handleUsername}
          variant="standard"
          fullWidth
          size="small"
          required
          sx={{ marginBottom: '10px' }}
        />

        <TextField
          id="standard-basic"
          error={emailError}
          label="Email Address"
          value={emailInput}
          onChange={(event) => {
            setEmailInput(event.target.value);
            setEmailError(false);
          }}
          onBlur={handleEmail}
          variant="standard"
          fullWidth
          size="small"
          required
          sx={{ marginBottom: '10px' }}
        />

        <FormControl sx={{ width: '100%', marginBottom: '10px' }} variant="standard">
          <InputLabel error={passwordError} htmlFor="standard-adornment-password">Password *</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={passwordInput}
            error={passwordError}
            onChange={(event) => {
              setPasswordInput(event.target.value);
              setPasswordError(false);
            }}
            onBlur={hanndlePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            required
          />
        </FormControl>

        <TextField
          id="standard-basic"
          error={contactNumberError}
          label="Contact Number"
          value={contactNumberInput}
          onChange={(event) => {
            setContactNumberInput(event.target.value);
            setContactNumberError(false);
          }}
          onBlur={handleContactNumber}
          variant="standard"
          fullWidth
          size="small"
          sx={{ marginBottom: '10px' }}
        />

        <TextField
          id="date-of-birth"
          label="Date of Birth"
          type="date"
          variant="standard"
          fullWidth
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{ marginBottom: '10px' }}
        />
        <p>
        <Button onClick={handleSubmit} fullWidth variant="contained" startIcon={<LoginOutlinedIcon />}>
        Sign Up
      </Button>
        </p>
        <p>
          {formValid && 
          <Alert severity="error">
          {formValid}
          </Alert>
          }
        </p>
      </Paper>
    </Box>
  );
}
