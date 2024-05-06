import * as React from "react";
import {
  Box,
  Grid,
  Link,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
// import Logo from "../../Assets/Images/Logo.png";
import Logo2 from "../../Assets/Images/Logo2.png";

const socialMediaLinks = {
  facebook: "#",
  twitter: "#",
  instagram: "#",
};

const Footer = () => {
  return (
    <Box
    sx={{
      bgcolor: "#135D66", 
      color: "text.secondary",
      py: 3,
      borderTop: "1px solid",
      borderColor: "divider",
      mt: 3, 
    }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: '' }}>
            <div>
              <img className="img" width="40%" src={Logo2} alt="Logo" style={{ marginLeft: 'auto' }}/>
            </div>
            
          </Grid>
          <Grid item xs={5} sm={3} md={2}>
            <Typography variant="subtitle1" color="#ffff" gutterBottom sx={{ mt: "10px", textDecoration: 'underline' }}>
              Site map
            </Typography>
            <Link href="/home" color="#ffff" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Home
            </Link>
            <Link href="/all-events" color="#ffff" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Events
            </Link>
            <Link href="/about" color="#ffff" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              About
            </Link>
            <Link href="/signup" color="#ffff" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              SignUp
            </Link>
            <Link href="/login" color="#ffff" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Login
            </Link>
          </Grid>
          <Grid item xs={5} sm={3} md={2}>
            <Typography variant="subtitle1" color="#ffff" gutterBottom sx={{ mt: "10px", textDecoration: 'underline' }}>
              All Events
            </Typography>
            <Link href="/musical" color="#ffff" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Musical concets
            </Link>
            <Link href="/dancing" color="#ffff" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Dancing Events
            </Link>
            <Link href="/stage-drama" color="#ffff" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Stage Drama
            </Link>
            <Link href="/food-festival" color="#ffff" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Food Festival
            </Link>
          </Grid>
          <Grid item xs={5} sm={3} md={2}>
            <Typography variant="subtitle1" color="#ffff" gutterBottom sx={{ mt: "10px", textDecoration: 'underline' }}>
              Support
            </Typography>
            <Link href="#" color="#ffff" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Contact
            </Link>
            <Link href="#" color="#ffff" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              privacy Policy
            </Link>
            <Link href="#" color="#ffff" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Guides
            </Link>
          </Grid>
          <Grid item xs={5} sm={3} md={2}>
            <Typography
              variant="subtitle1"
              sx={{ ml: "18px", fontWeight: "700" }}
              color="#ffff"
              gutterBottom
            >
              SOCIAL MEDIA
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "80px",
              }}
            >
              <IconButton
                aria-label="Facebook"
                color="#A3D8FF"
                component="a"
                href={socialMediaLinks.facebook}
                sx={{ "&:hover": { color: "#1877f2" } }} // Change color on hover
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                color="#A3D8FF"
                component="a"
                href={socialMediaLinks.twitter}
                sx={{ "&:hover": { color: "#1da1f2" } }} // Change color on hover
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                color="#A3D8FF"
                component="a"
                href={socialMediaLinks.instagram}
                sx={{ "&:hover": { color: "#e56969" } }} // Change color on hover
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                aria-label="YouTube"
                color="#A3D8FF"
                component="a"
                href={socialMediaLinks.youtube}
                sx={{ "&:hover": { color: "#E72929" } }} // Change color on hover
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Typography
        variant="body2"
        color="#A3D8FF"
        align="center"
        sx={{ pt: 4, fontSize: "15px" }}
      >
       Copyright  © 2024  TICKETIFY.  
       <br/>Powered by Ticketify Events
      </Typography>
    </Box>
  );
};

export default Footer;
