import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';

const RealtimeCount = ({ icon, number, target, text }) => {
  const [count, setCount] = useState(number);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < target) {
        setCount(prevCount => prevCount + Math.ceil((target - prevCount) / 100));
      } else {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [count, target]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card sx={{ width: '212px', height: '170px', backgroundImage: 'linear-gradient(50deg, #FFF323, #439A97)' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '20px' }}>
            {icon}
            <Typography variant="h2" component="h2" sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {count}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1rem' }}>
              {text}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default RealtimeCount;
