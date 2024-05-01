import * as React from 'react';
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
import { useState } from 'react';
import Alert from '@mui/material/Alert';

// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgNlwY4ud5WAf7PlfjIsggYKame36kGh4",
  authDomain: "event-ticket-booking-sys-60ef0.firebaseapp.com",
  databaseURL: "https://event-ticket-booking-sys-60ef0-default-rtdb.firebaseio.com",
  projectId: "event-ticket-booking-sys-60ef0",
  storageBucket: "event-ticket-booking-sys-60ef0.appspot.com",
  messagingSenderId: "16796915105",
  appId: "1:16796915105:web:565bc332434abb81cf27e0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  // Inputs
  const [UsernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [contactNumberInput, setContactNumberInput] = useState('');

  // Input errors
  const [UsernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);

  // Form validity
  const [formValid, setFormvalid] = useState('');
  const [success, setSuccess] = useState('');

  // Validation for onBlur Username
  const handleUsername = () => {
    if (!UsernameInput || 
        UsernameInput.length < 5 || 
        UsernameInput.length > 50
    ) {
      setUsernameError(true);
      return;
    }

    setUsernameError(false);
  };

  // Validation for onBlur Email
  const handleEmail = () => {
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };

  // Validation for onBlur password
  const handlePassword = () => {
    if (!passwordInput ||
        passwordInput.length < 5 ||
        passwordInput.length > 20
    ) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  // Validation for onBlur Contact number
  const handleContactNumber = () => {
    if (!contactNumberInput || 
        contactNumberInput.length !== 10 || 
        isNaN(contactNumberInput)
    ) {
      setContactNumberError(true);
      return;
    }
    setContactNumberError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);

    if (UsernameError || !UsernameInput) {
      setFormvalid(
        "Username is between 5 - 50 characters long. Please Re-Enter"
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

    try {
      const userData = {
        username: UsernameInput,
        email: emailInput,
        password: passwordInput,
        contactNumber: contactNumberInput
      };
      const options = {
        method : 'POST',
        headers : {
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          username: UsernameInput,
          email: emailInput,
          password: passwordInput,
          contactNumber: contactNumberInput
        }),
      };

      const res = await fetch(
        "https://event-ticket-booking-sys-60ef0-default-rtdb.firebaseio.com/UserData.json",
        options
      );
      console.log(res);

      // Push the user data to Firebase
      await push(ref(database, 'users'), userData);
      
      setSuccess("Form Submitted Successfully");
      setFormvalid('');

      // Reset form inputs
      setUsernameInput('');
      setEmailInput('');
      setPasswordInput('');
      setContactNumberInput('');

    } catch (error) {
      console.error('Error:', error);
      setFormvalid("Error occurred while submitting the form. Please try again later.");
    }
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

  // Paper gradient
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
        flexDirection: 'column', 
        alignItems: 'center', 
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
        <Chip
          icon={<FaceIcon sx={{ color: '#a05aff' }} />} 
          label="Sign Up" 
          color="primary" 
          variant="outlined" 
          sx={{ color: '#a05aff', borderColor: '#a05aff' }} 
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

<FormControl
  sx={{
    width: '100%',
    marginBottom: '10px',
    '& label': {
      color: '#1C1678', // Change label color
    },
  }}
  variant="standard"
>
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

        <TextField
          id="date-of-birth"
          label="Date of Birth"
          type="date"
          variant="standard"
          fullWidth
          size="small"
          InputLabelProps={{ shrink: true }}
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
        <p>
          <Button onClick={handleSubmit} fullWidth variant="contained" startIcon={<LoginOutlinedIcon />}
          sx={buttonGradient}>
            SIGN UP
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
      </Paper>
    </Box>
  );
}
