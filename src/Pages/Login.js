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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        marginTop: '30px',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          background: '#CBEDD5',
          border: '3px solid #003C43',
          width: '350px',
          textAlign: 'center',
          p: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Chip icon={<LockOutlinedIcon/>} label="Login" color="primary" variant="outlined" 
          sx={{ color: '#003C43', borderColor: '#135D66' }} />
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
          /> <span style={{ color: '#135D66' }}>Remember Me</span>
        </div>

        <p>
          <Button onClick={handleSubmit} fullWidth variant="contained" startIcon={<LoginOutlinedIcon />}
           sx={{
            borderRadius: '40px',
            background: '#439A97',
            border: '3.5px solid #135D66',
            boxShadow: '#62B6B7',
            color: 'white',
            height: 45,
            padding: '0 30px',
            marginTop: '10px',
            '&:hover': {
              background: '#135D66', // Change hover background color
            }
            }}
          >
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
          <h4>Do you haven't account? <Link to="/signup" style={{ color: '#135D66', textDecoration: 'none' }}>Sign Up</Link></h4>
        </p>
      </Paper>
    </Box>
  );
}