import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Switch from '@mui/material/Switch';

export default function Login() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
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
          width: '450px',
          textAlign: 'center',
          p: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {checked ?
          <Chip icon={<LockOutlinedIcon />} label="Login" 
          color="primary" variant="outlined" />
          :
          <Chip icon={<FaceIcon />} label="Sign Up" 
          color="primary" variant="outlined" />
          }
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>
        Login
      </Paper>
    </Box>
  );
}

 
