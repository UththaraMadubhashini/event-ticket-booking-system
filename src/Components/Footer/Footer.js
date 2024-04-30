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
import Logo from "../../Assets/Images/Logo.png";

const socialMediaLinks = {
  facebook: "#",
  twitter: "#",
  instagram: "#",
};

const Footer = () => {
  return (
    <Box
    sx={{
      bgcolor: "#FDE2F3", 
      color: "text.secondary",
      py: 3,
      borderTop: "1px solid",
      borderColor: "divider",
      mt: 5, 
    }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3} sx={{ textAlign: 'center' }}>
            <div>
              <img className="img" width="40%" src={Logo} alt="Logo" style={{ marginLeft: 'auto' }}/>
            </div>
            
          </Grid>
          <Grid item xs={5} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ mt: "10px", textDecoration: 'underline' }}>
              Site map
            </Typography>
            <Link href="/home" color="inherit" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Home
            </Link>
            <Link href="/all-events" color="inherit" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Events
            </Link>
            <Link href="/about" color="inherit" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              About
            </Link>
            <Link href="/signup" color="inherit" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              SignUp
            </Link>
            <Link href="/login" color="inherit" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Login
            </Link>
          </Grid>
          <Grid item xs={5} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ mt: "10px", textDecoration: 'underline' }}>
              All Events
            </Typography>
            <Link href="/musical" color="inherit" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Musical concets
            </Link>
            <Link href="/dancing" color="inherit" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Dancing Events
            </Link>
            <Link href="/stage-drama" color="inherit" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Stage Drama
            </Link>
            <Link href="/food-festival" color="inherit" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Food Festival
            </Link>
          </Grid>
          <Grid item xs={5} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ mt: "10px", textDecoration: 'underline' }}>
              Support
            </Typography>
            <Link href="#" color="inherit" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Contact
            </Link>
            <Link href="#" color="inherit" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              privacy Policy
            </Link>
            <Link href="#" color="inherit" sx={{ mt: "10px", textDecoration: 'none' }} display="block">
              Guides
            </Link>
          </Grid>
          <Grid item xs={5} sm={3} md={2}>
            <Typography
              variant="subtitle1"
              sx={{ ml: "18px", fontWeight: "700" }}
              color="text.primary"
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
                color="inherit"
                component="a"
                href={socialMediaLinks.facebook}
                sx={{ "&:hover": { color: "#1877f2" } }} // Change color on hover
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                color="inherit"
                component="a"
                href={socialMediaLinks.twitter}
                sx={{ "&:hover": { color: "#1da1f2" } }} // Change color on hover
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                color="inherit"
                component="a"
                href={socialMediaLinks.instagram}
                sx={{ "&:hover": { color: "#e56969" } }} // Change color on hover
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                aria-label="YouTube"
                color="inherit"
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
        color="text.secondary"
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
