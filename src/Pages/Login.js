import React, { useState } from 'react';
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
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config'; 

const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formValid, setFormValid] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const fetchUserRoleByEmail = async (email) => {
    try {
      // Define email-role mappings
      const rolesByEmail = {
        'admin23@gmail.com': 'admin',
        // 'org123@gmail.com': 'organizer',
      };

      const role = rolesByEmail[email] || 'customer';
      return role;
    } catch (error) {
      console.error('Error fetching user role by email:', error);
      return 'customer';
    }
  };

  const handleEmail = () => {
    setEmailError(!isEmail(emailInput));
    fetchUserRoleByEmail(emailInput).then((role) => {
      setSelectedRole(role);
    });
  };

  const handlePassword = () => {
    setPasswordError(!passwordInput || passwordInput.length < 5 || passwordInput.length > 8);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormValid('');
    setSuccess('');

    if (emailError || !emailInput) {
      setFormValid("Email is invalid. Please Re-Enter");
      return;
    }

    if (passwordError || !passwordInput) {
      setFormValid("Password is set to 5 - 8 characters. Please Re-Enter");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);
      setSuccess("Login Successful");

      const userRole = await fetchUserRoleByEmail(emailInput);
      if (userRole === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
      setSuccess("Login Successful");
    } catch (error) {
      setFormValid(error.message);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
      <Paper elevation={4} sx={{ background: '#CBEDD5', border: '3px solid #003C43', width: '350px', textAlign: 'center', p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Chip icon={<LockOutlinedIcon />} label="Login" color="primary" variant="outlined" sx={{ color: '#003C43', borderColor: '#135D66' }} />
        </Box>

        <FormControl variant="standard" sx={{ width: '100%', marginBottom: '10px', '& label': { color: '#1C1678' } }}>
          <InputLabel id="role-label">Role *</InputLabel>
          <Select
            labelId="role-label"
            id="role-select"
            value={selectedRole}
            onChange={handleRoleChange}
            required
            fullWidth
            disabled
          >
            <MenuItem value="customer">Customer</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            {/* <MenuItem value="organizer">Organizer</MenuItem> */}
          </Select>
        </FormControl>

        <TextField
          id="standard-basic"
          name="email"
          error={emailError}
          label="Email Address"
          value={emailInput}
          onChange={(event) => { setEmailInput(event.target.value); setEmailError(false); }}
          onBlur={handleEmail}
          variant="standard"
          fullWidth
          size="small"
          required
          sx={{ marginBottom: '10px', '& label': { color: '#1C1678' }, '& .MuiInputBase-input': { color: '#1C1678' } }}
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
            sx={{ '& .MuiInputBase-input': { color: '#1C1678' } }}
          />
        </FormControl>
        <div align="left">
          <Checkbox checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} inputProps={{ 'aria-label': 'controlled' }} />{' '}
          <span style={{ color: '#135D66' }}>Remember Me</span>
        </div>
        <p>
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            startIcon={<LoginOutlinedIcon />}
            sx={{ borderRadius: '40px', background: '#439A97', border: '3.5px solid #135D66', boxShadow: '#62B6B7', color: 'white', height: '45px', padding: '0 30px', marginTop: '10px', '&:hover': { background: '#135D66' } }}
          >
            LOGIN
          </Button>
        </p>
        {formValid && <Alert severity="error">{formValid}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <p>
          <h4>Do you haven't account? <Link to="/signup" style={{ color: '#135D66', textDecoration: 'none' }}>Sign Up</Link></h4>
        </p>
      </Paper>
    </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
    {/* Text */}
    <Box sx={{ textAlign: 'left', padding: '60px', lineHeight: '2'}}>
      <h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.5rem', fontWeight: 'normal', color: '#135D66' }}>Log in to your account to access exclusive event ticket bookings, manage your reservations, and stay updated on upcoming events.</h2>
    </Box>
  </Grid>


    </Grid>

    
    
  );
}
