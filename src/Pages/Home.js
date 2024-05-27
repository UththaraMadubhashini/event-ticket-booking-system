import React, { useState, useEffect } from "react";
import ImageSlider from '../Components/ImageSlider/ImageSlider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import ImageBtn1 from '../Assets/Images/music.jpg'
import ImageBtn2 from '../Assets/Images/dance.jpg'
import ImageBtn3 from '../Assets/Images/stageDrama.jpg'
import ImageBtn4 from '../Assets/Images/foodFestival.jpg'
import EventCard from '../Components/EventCards/EventCard';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { getDatabase, ref, get } from '../firebase-config';

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

const Home = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const database = getDatabase();
        const eventsRef = ref(database, 'events');
        const snapshot = await get(eventsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const eventData = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setEvents(eventData);
        } else {
          console.log('No events found');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

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
                    fontSize: '25px',
                    fontFamily: 'American Typewriter, serif',
                    fontStyle: 'italic', 
                    fontWeight: 300, 
                    fontVariant: 'normal',
                  }}
                >
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          ))}
        </Box>


      <div style={{ textAlign: 'center', fontSize: '50px', margin: '20px', 
      fontFamily: 'Trattatello, fantasy', fontStyle: 'oblique', fontWeight: 900, fontVariant: 'small-caps' }}>
      All Events
      </div>

  {/* Cards */}

  <Box sx={{ flexGrow: 4, p: 4 }}>
      <Grid container spacing={0} justifyContent="center">
        {events.map((event) => (
          <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
            <EventCard
              title={event.name}
              image={event.eventImage}
              date={event.date}
              time={event.time}
              location={event.location}
              priceRange={event.priceRange}
              availability={event.availability}
              ticketImage={require('../Assets/Images/ticketIcon.png')}
              priceTagImage={require('../Assets/Images/priceTag.png')}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
}

export default Home;