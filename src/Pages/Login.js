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
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { database } from '../firebase-config';

const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formValid, setFormValid] = useState('');
  const [success, setSuccess] = useState('');
  const history = useNavigate(); // Replace history with useNavigate

  const handleEmail = () => {
    setEmailError(!isEmail(emailInput));
  };

  const handlePassword = () => {
    setPasswordError(!passwordInput || passwordInput.length < 5 || passwordInput.length > 20);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const email = emailInput; // Use state variable directly
    const password = passwordInput; // Use state variable directly
  
    createUserWithEmailAndPassword(database, email, password)
      .then(() => {
        setSuccess("Login Successful");
        history("/home"); // Corrected navigation call
      })
      .catch((error) => {
        setFormValid(error.message);
      });
  
    if (emailError || !emailInput) {
      setFormValid("Email is invalid. Please Re-Enter");
      return;
    }
  
    if (passwordError) {
      setFormValid("Password is set to 5 - 20 characters. Please Re-Enter");
      return;
    }
  
    setFormValid(null);
    setSuccess("Login Successfully");
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
          <Chip
            icon={<LockOutlinedIcon />}
            label="Login"
            color="primary"
            variant="outlined"
            sx={{ color: '#003C43', borderColor: '#135D66' }}
          />
        </Box>

        <TextField
          id="standard-basic"
          name="email"
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
          sx={{
            marginBottom: '10px',
            '& label': {
              color: '#1C1678',
            },
            '& .MuiInputBase-input': {
              color: '#1C1678',
            },
          }}
        />

        <FormControl
          sx={{ width: '100%', marginBottom: '10px', '& label': { color: '#1C1678' } }}
          variant="standard"
        >
          <InputLabel error={passwordError} htmlFor="standard-adornment-password">
            Password *
          </InputLabel>
          <Input
            id="standard-adornment-password"
            name="password"
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
            sx={{ '& .MuiInputBase-input': { color: '#1C1678' } }}
          />
        </FormControl>

        <div align="left">
          <Checkbox
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />{' '}
          <span style={{ color: '#135D66' }}>Remember Me</span>
        </div>

        <p>
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            startIcon={<LoginOutlinedIcon />}
            sx={{
              borderRadius: '40px',
              background: '#439A97',
              border: '3.5px solid #135D66',
              boxShadow: '#62B6B7',
              color: 'white',
              height: '45px', // Height adjustment
              padding: '0 30px',
              marginTop: '10px',
              '&:hover': {
                background: '#135D66',
              },
            }}
          >
            LOGIN
          </Button>
        </p>
        <p>
          {formValid && <Alert severity="error">{formValid}</Alert>}
        </p>

        <p>
          {success && <Alert severity="success">{success}</Alert>}
        </p>

        <p>
          <h4>
            Do you haven't account?{' '}
            <Link to="/signup" style={{ color: '#135D66', textDecoration: 'none' }}>
              Sign Up
            </Link>
          </h4>
        </p>
      </Paper>
    </Box>
  );
}