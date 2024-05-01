import React from 'react';
import ImageSlider from '../Components/ImageSlider/ImageSlider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import ImageBtn1 from '../Assets/Images/music.jpg'
import ImageBtn2 from '../Assets/Images/dance.jpg'
import ImageBtn3 from '../Assets/Images/stageDrama.jpg'
import ImageBtn4 from '../Assets/Images/foodFestival.jpg'
import Grid from '@mui/material/Grid';
import EventCard from '../Components/EventCards/EventCards';
import { Link } from 'react-router-dom';

//set image buttons
const images = [
  {
    url: ImageBtn1,
    title: 'Musical',
    width: '25%',
    link: '/musical',
  },
  {
    url: ImageBtn2,
    title: 'Dancing Event',
    width: '25%',
    link: '/dancing',
  },
  {
    url: ImageBtn3,
    title: 'Stage Drama',
    width: '25%',
    link: '/stagedrama',
  },
  {
    url: ImageBtn4,
    title: 'Food Festival',
    width: '25%',
    link: '/foodfestival'
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  marginTop: '30px',
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: 100,


  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

// set card
const eventsData = [
  {
    title: 'BASS ENIGMA',
    image: require('../Assets/Images/01.BASS Cham_cd.jpg'),
    date: 'SAT APR 27',
    time: '03.00 PM',
    location: 'Taprobane - Rajagiriya',
    availability: '150',
    priceRange: 'Rs. 1000 - Rs. 5000',
    ticketImage: require('../Assets/Images/ticketIcon.png'),
    priceTagImage: require('../Assets/Images/priceTag.png')
  },
  {
    title: 'Hanthaneta payana',
    image: require('../Assets/Images/Hanthanata-Payana-sanda_ cd.jpg'),
    date: 'SUN APR 28',
    time: '02.00 PM',
    location: 'Colombo',
    priceRange: 'Rs. 1500 - Rs. 6000',
    ticketImage: require('../Assets/Images/ticketIcon.png'),
    priceTagImage: require('../Assets/Images/priceTag.png')
  },
  {
    title: 'Hanthaneta payana',
    image: require('../'),
    date: 'SUN APR 28',
    time: '02.00 PM',
    location: 'Colombo',
    priceRange: 'Rs. 1500 - Rs. 6000',
    ticketImage: require('../Assets/Images/ticketIcon.png'),
    priceTagImage: require('../Assets/Images/priceTag.png')
  },
  {
    title: 'Hanthaneta payana',
    image: require('../'),
    date: 'SUN APR 28',
    time: '02.00 PM',
    location: 'Colombo',
    priceRange: 'Rs. 1500 - Rs. 6000',
    ticketImage: require('../Assets/Images/ticketIcon.png'),
    priceTagImage: require('../Assets/Images/priceTag.png')
  },
  {
    title: 'Hanthaneta payana',
    image: require('../'),
    date: 'SUN APR 28',
    time: '02.00 PM',
    location: 'Colombo',
    priceRange: 'Rs. 1500 - Rs. 6000',
    ticketImage: require('../Assets/Images/ticketIcon.png'),
    priceTagImage: require('../Assets/Images/priceTag.png')
  },
  {
    title: 'Hanthaneta payana',
    image: require('../'),
    date: 'SUN APR 28',
    time: '02.00 PM',
    location: 'Colombo',
    priceRange: 'Rs. 1500 - Rs. 6000',
    ticketImage: require('../Assets/Images/ticketIcon.png'),
    priceTagImage: require('../Assets/Images/priceTag.png')
  },
  {
    title: 'Hanthaneta payana',
    image: require('../'),
    date: 'SUN APR 28',
    time: '02.00 PM',
    location: 'Colombo',
    priceRange: 'Rs. 1500 - Rs. 6000',
    ticketImage: require('../Assets/Images/ticketIcon.png'),
    priceTagImage: require('../Assets/Images/priceTag.png')
  },
  {
    title: 'Hanthaneta payana',
    image: require('../'),
    date: 'SUN APR 28',
    time: '02.00 PM',
    location: 'Colombo',
    priceRange: 'Rs. 1500 - Rs. 6000',
    ticketImage: require('../Assets/Images/ticketIcon.png'),
    priceTagImage: require('../Assets/Images/priceTag.png')
  },
  {
    title: 'Hanthaneta payana',
    image: require('../'),
    date: 'SUN APR 28',
    time: '02.00 PM',
    location: 'Colombo',
    priceRange: 'Rs. 1500 - Rs. 6000',
    ticketImage: require('../Assets/Images/ticketIcon.png'),
    priceTagImage: require('../Assets/Images/priceTag.png')
  },
  {
    title: 'Hanthaneta payana',
    image: require('../'),
    date: 'SUN APR 28',
    time: '02.00 PM',
    location: 'Colombo',
    priceRange: 'Rs. 1500 - Rs. 6000',
    ticketImage: require('../Assets/Images/ticketIcon.png'),
    priceTagImage: require('../Assets/Images/priceTag.png')
  },
  // Add more event data objects as needed
];

const Home = () => {
  return (
    <>
      <ImageSlider />

      {/* Image buttons */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
          {images.map((image) => (
            <ImageButton
              key={image.title}
              focusRipple
              style={{
                width: image.width,
              }}
              component={Link}
              to={image.link}
            >
              <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          ))}
        </Box>


      <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold', margin: '20px' }}>
      All Events
      </div>

  {/* Cards */}
  <Grid container spacing={3} justifyContent="center">
      {eventsData.map((event, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
 <Link
  key={index}
  to={{ pathname: '/buy-tickets', state: { event: event } }}
  style={{ textDecoration: 'none', color: 'inherit' }}>
  <EventCard
    title={event.title}
    image={event.image}
    date={event.date}
    time={event.time}
    location={event.location}
    priceRange={event.priceRange}
    ticketImage={event.ticketImage}
    priceTagImage={event.priceTagImage}
    availability={event.availability}
  />
</Link>
        </Grid>
      ))}
    </Grid>
    </>
  );
}

export default Home;