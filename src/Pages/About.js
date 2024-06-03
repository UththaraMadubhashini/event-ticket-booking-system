import React from 'react';
import { Container, Typography, Grid, TextField, Button, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

const About = () => {
  return (
    <section sx={{ position: 'relative', zIndex: 3, paddingTop: '50px', paddingBottom: '50px' }}>
      <Container maxWidth="lg">
        <div sx={{ textAlign: 'center', marginBottom: '50px' }}>
          <Typography variant="h2" sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '3em', marginBottom: '-20px' }}>
            Contact Us
          </Typography>
          <Typography sx={{ color: '#135D66', textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: '1.5rem', fontWeight: 'normal', marginBottom: '20px' }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </Typography>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: '20px', backgroundColor: '#FFF', display: 'flex', alignItems: 'center' }}>
              <HomeIcon sx={{ fontSize: '40px', color: '#1da9c0', marginRight: '15px' }} />
              <div>
                <Typography variant="h4" sx={{ color: '#1da9c0', marginBottom: '5px' }}>
                  Address
                </Typography>
                <Typography variant="body1" sx={{ color: '#333' }}>
                  4671 Sugar Camp Road,<br /> Owatonna, Minnesota,<br /> 55060
                </Typography>
              </div>
            </Paper>
            <Paper sx={{ padding: '20px', backgroundColor: '#FFF', display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <LocalPhoneIcon sx={{ fontSize: '40px', color: '#1da9c0', marginRight: '15px' }} />
              <div>
                <Typography variant="h4" sx={{ color: '#1da9c0', marginBottom: '5px' }}>
                  Phone
                </Typography>
                <Typography variant="body1" sx={{ color: '#333' }}>
                  571-457-2321
                </Typography>
              </div>
            </Paper>
            <Paper sx={{ padding: '20px', backgroundColor: '#FFF', display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <EmailIcon sx={{ fontSize: '40px', color: '#1da9c0', marginRight: '15px' }} />
              <div>
                <Typography variant="h4" sx={{ color: '#1da9c0', marginBottom: '5px' }}>
                  Email
                </Typography>
                <Typography variant="body1" sx={{ color: '#333' }}>
                  ntamerrwael@mfano.ga
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: '40px', backgroundColor: '#FFF' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', fontSize: '2em', marginBottom: '20px', color: '#333', textAlign: 'center' }}>
                Send Message
              </Typography>
              <TextField id="full-name" label="Full Name" variant="outlined" fullWidth sx={{ marginBottom: '20px' }} />
              <TextField id="email" label="Email" variant="outlined" fullWidth sx={{ marginBottom: '20px' }} />
              <TextField id="message" label="Message" multiline rows={4} variant="outlined" fullWidth sx={{ marginBottom: '20px' }} />
              <Button variant="contained" color="primary" fullWidth>
                Send
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default About;
