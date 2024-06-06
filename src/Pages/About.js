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
          Ticketify is a comprehensive online ticket booking management system designed to streamline the event ticketing process with ease and efficiency. With its intuitive user interface and robust features, Ticketify offers users a seamless experience from event discovery to ticket purchase. Whether you're an event organizer or an attendee, Ticketify provides the tools you need to manage events, book tickets, and stay informed about upcoming events. From user-friendly registration to real-time ticket availability tracking, Ticketify ensures a smooth and hassle-free experience for all users. Say goodbye to long queues and manual booking processes – with Ticketify, organizing and attending events has never been easier.
          </Typography>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: '20px', bgcolor: '#E3FEF7', display: 'flex', alignItems: 'center' }}>
              <HomeIcon sx={{ fontSize: '40px', color: '#1da9c0', marginRight: '15px' }} />
              <div>
                <Typography variant="h4" sx={{ color: '#1da9c0', marginBottom: '15px' }}>
                  Address
                </Typography>
                <Typography variant="body1" sx={{ color: '#333' }}>
                  27/A,<br /> Negombo Road, <br />Nittambuwa
                </Typography>
              </div>
            </Paper>
            <Paper sx={{ padding: '20px', bgcolor: '#E3FEF7', display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <LocalPhoneIcon sx={{ fontSize: '40px', color: '#1da9c0', marginRight: '15px' }} />
              <div>
                <Typography variant="h4" sx={{ color: '#1da9c0', marginBottom: '15px' }}>
                  Phone
                </Typography>
                <Typography variant="body1" sx={{ color: '#333' }}>
                  033-229-5639
                </Typography>
              </div>
            </Paper>
            <Paper sx={{ padding: '20px', bgcolor: '#E3FEF7', display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <EmailIcon sx={{ fontSize: '40px', color: '#1da9c0', marginRight: '15px' }} />
              <div>
                <Typography variant="h4" sx={{ color: '#1da9c0', marginBottom: '15px' }}>
                  Email
                </Typography>
                <Typography variant="body1" sx={{ color: '#333' }}>
                  ticketifysl@gmail.com
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: '20px', bgcolor: '#E3FEF7' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', fontSize: '2em', marginBottom: '20px', color: '#333', textAlign: 'center' }}>
                Send Message
              </Typography>
              <TextField id="full-name" label="Full Name" variant="outlined" fullWidth sx={{ marginBottom: '20px' }} />
              <TextField id="email" label="Email" variant="outlined" fullWidth sx={{ marginBottom: '20px' }} />
              <TextField id="message" label="Message" multiline rows={4} variant="outlined" fullWidth sx={{ marginBottom: '20px' }} />
              
              <Button variant="contained" color="primary" fullWidth sx={{borderRadius: '40px', background: '#439A97', border: '3.5px solid #135D66', boxShadow: '#62B6B7', color: 'white', height: '45px', padding: '0 30px', marginTop: '10px', '&:hover': { background: '#135D66' }}}>
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
