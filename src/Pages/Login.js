import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
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
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';

export default function Login() {
  // Password field
  const [showPassword, setShowPassword] = React.useState(false);

  // Inputs
  const [UsernameInput, setUsernameInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [rememberMe, setRememberMe] = useState(false);

  // Input errors
  const [UsernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Form validity
  const [formValid, setFormvalid] = useState();
  const [success, setSuccess] = useState();

  // Validation for onBlur Username
  const handleUsername = () => {
    if (!UsernameInput || 
        UsernameInput.length < 5 || 
        UsernameInput.length > 20
    ){
      setUsernameError(true);
      return;
    }

    setUsernameError(false);
  };


  // Validation for onBlur password
  const handlePassword = () => {
    if (!passwordInput ||
        passwordInput.length < 5 ||
        passwordInput.length > 20
    ){
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(null);
  
    if (UsernameError || !UsernameInput) {
      setFormvalid(
        "Username is between 5 - 15 characters long. Please Re-Enter"
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
    setSuccess("Login Successfully");
  
    console.log(UsernameInput);
    console.log(passwordInput);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Button color
  const buttonGradient = {
    background: 'linear-gradient(45deg, #a05aff 30%, #9e58ff 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(158, 88, 255, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginTop: '10px',
  };

  // Paper color
  const paperGradient = {
    background: '#B9F3FC',
    textAlign: 'center',
    p: 2,
    width: '350px',
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
          ...paperGradient,
          width: '350px',
          textAlign: 'center',
          p: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Chip icon={<LockOutlinedIcon sx={{ color: '#a05aff' }}/>} label="Login" color="primary" variant="outlined" 
          sx={{ color: '#a05aff', borderColor: '#a05aff' }} />
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
          sx={{
            marginBottom: '10px',
            '& label': {
              color: '#1C1678', // Change label color
            },
            '& .MuiInputBase-input': {
              color: '#1C1678', // Change text field color
            },
          }}
        />

        <FormControl sx={{ width: '100%', marginBottom: '10px', '& label': {
            color: '#1C1678', // Change label color
          }, }} variant="standard">
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
            onBlur={handlePassword}
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
            sx={{
              '& .MuiInputBase-input': {
                color: '#1C1678', // Change text field color
              },
            }}
          />
        </FormControl>

        <div align="left">
          <Checkbox
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          /> <span style={{ color: '#1C1678' }}>Remember Me</span>
        </div>

        <p>
          <Button onClick={handleSubmit} fullWidth variant="contained" startIcon={<LoginOutlinedIcon />}
          sx={buttonGradient}>
            LOGIN
          </Button>
        </p>
        <p>
          {formValid && 
            <Alert severity="error">
              {formValid}
            </Alert>
          }
        </p>

        <p>
          {success && 
            <Alert severity="success">
              {success}
            </Alert>
          }
        </p>

        <p>
          <h4>Do you haven't account? <Link to="/signup" style={{ color: '#1C1678', textDecoration: 'none' }}>Sign Up</Link></h4>
        </p>
      </Paper>
    </Box>
  );
}