// SignUp.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
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
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config'; // Import auth from firebase-config

const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [contactNumberInput, setContactNumberInput] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);
  const [formValid, setFormValid] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); 

  const handleUsername = () => {
    setUsernameError(!usernameInput);
  };

  const handleEmail = () => {
    setEmailError(!isEmail(emailInput));
  };

  const handlePassword = () => {
    setPasswordError(!passwordInput || passwordInput.length < 5 || passwordInput.length > 20);
  };

  const handleContactNumber = () => {
    setContactNumberError(!contactNumberInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormValid('');
    setSuccess('');

    if (!usernameInput) {
      setUsernameError(true);
      setFormValid("Username is required");
      return;
    }

    if (emailError || !emailInput) {
      setFormValid("Email is invalid. Please Re-Enter");
      return;
    }

    if (passwordError || !passwordInput) {
      setFormValid("Password is set to 5 - 20 characters. Please Re-Enter");
      return;
    }

    if (contactNumberError || !contactNumberInput) {
      setFormValid("Contact number is required");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
      setSuccess("Registration Successful");
      navigate("/login");
    } catch (error) {
      setFormValid(error.message);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>
      <Paper elevation={4} sx={{ background: '#CBEDD5', border: '3px solid #003C43', width: '350px', textAlign: 'center', p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Chip icon={<FaceIcon />} label="Sign Up" color="primary" variant="outlined" sx={{ color: '#003C43', borderColor: '#135D66' }} />
        </Box>
        <TextField
          id="standard-basic"
          error={usernameError}
          label="Username"
          value={usernameInput}
          onChange={(event) => { setUsernameInput(event.target.value); setUsernameError(false); }}
          onBlur={handleUsername}
          variant="standard"
          fullWidth
          size="small"
          required
          sx={{ marginBottom: '10px', '& label': { color: '#1C1678' }, '& .MuiInputBase-input': { color: '#003C43' } }}
        />
        <TextField
          id="standard-basic"
          error={emailError}
          label="Email"
          value={emailInput}
          onChange={(event) => { setEmailInput(event.target.value); setEmailError(false); }}
          onBlur={handleEmail}
          variant="standard"
          fullWidth
          size="small"
          required
          sx={{ marginBottom: '10px', '& label': { color: '#1C1678' }, '& .MuiInputBase-input': { color: '#003C43' } }}
        />
        <TextField
          id="standard-basic"
          error={contactNumberError}
          label="Contact Number"
          value={contactNumberInput}
          onChange={(event) => { setContactNumberInput(event.target.value); setContactNumberError(false); }}
          onBlur={handleContactNumber}
          variant="standard"
          fullWidth
          size="small"
          required
          sx={{ marginBottom: '10px', '& label': { color: '#1C1678' }, '& .MuiInputBase-input': { color: '#003C43' } }}
        />
        <FormControl sx={{ width: '100%', marginBottom: '10px', '& label': { color: '#1C1678' } }} variant="standard">
          <InputLabel error={passwordError} htmlFor="standard-adornment-password">Password *</InputLabel>
          <Input
            id="standard-adornment-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={passwordInput}
            error={passwordError}
            onChange={(event) => { setPasswordInput(event.target.value); setPasswordError(false); }}
            onBlur={handlePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            required
            sx={{ '& .MuiInputBase-input': { color: '#003C43' } }}
          />
        </FormControl>
        <Button
          onClick={handleSubmit}
          size="medium"
          fullWidth
          variant="contained"
          startIcon={<LoginOutlinedIcon />}
          sx={{ borderRadius: '40px', background: '#439A97', border: '3.5px solid #135D66', boxShadow: '#62B6B7', color: 'white', height: '45px', padding: '0 30px', marginTop: '10px', '&:hover': { background: '#135D66' } }}
        >
          SIGN UP
        </Button>
        {formValid && <Alert severity="error">{formValid}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <p>
          <h4>Already have an account? <Link to="/login" style={{ color: '#135D66', textDecoration: 'none' }}>Login</Link></h4>
        </p>
      </Paper>
    </Box>
  );
}
