import React from 'react';
import SideBar from '../AdminComponents/SideBar/SideBar';
import NavBar from '../AdminComponents/NavBar/NavBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import BarChart from '../Charts/BarChart';
import PieChart from '../Charts/PieChart';
import LineChart from '../Charts/LineChart';
import RealtimeCount from '../Dashboard/RealtimeCounts/RealtimeCount';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import CameraRollIcon from '@mui/icons-material/CameraRoll';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ClassIcon from '@mui/icons-material/Class';
import CountUp, { useCountUp } from 'react-countup';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import FaceIcon from '@mui/icons-material/Face';


const Dashboard = () => {

  useCountUp({
    ref: 'counter',
    end: 1234567,
    enableScrollSpy: true,
    scrollSpyDelay: 1000,
  });

  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        <Box height={20} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card sx={{ height: "60vh", width: "700px"}}>
                <CardContent>
                  <LineChart />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ float: 'right'}}>
          <Grid container spacing={2} />
            <Grid item xs={4} >
              <Stack spacing={2} direction="row" sx={{ padding: '10px', marginTop: "-420px", }}>
              <Card sx={{ width: '243px', height: '203px', backgroundImage: 'linear-gradient(50deg, #FFF323, #439A97)' }}>
              <CardContent>
                <RealtimeCount icon={<AddReactionIcon />} number={0} target={2} text='Our Customers' />
              </CardContent>
            </Card>

            <Card sx={{ width: '243px', height: '203px', backgroundImage: 'linear-gradient(50deg, #FFF323, #439A97)' }}>
              <CardContent>
                <RealtimeCount icon={<ReceiptIcon />} number={0} target={1} text='Sold Tickets' />
              </CardContent>
            </Card>
              </Stack>
            </Grid>
            
            <Grid item xs={4}>
              <Stack spacing={2} direction="row" sx={{ padding: '10px' }}>
              <Card sx={{ width: '243px', height: '203px', backgroundImage: 'linear-gradient(50deg, #FFF323, #439A97)' }}>
              <CardContent>
                <RealtimeCount icon={<CameraRollIcon />} number={0} target={5} text='All Events' />
              </CardContent>
            </Card>

            <Card sx={{ width: '243px', height: '203px', backgroundImage: 'linear-gradient(50deg, #FFF323, #439A97)' }}>
              <CardContent>
                <RealtimeCount icon={<ClassIcon />} number={0} target={5} text='Events availability' />
              </CardContent>
            </Card>
              </Stack>
            </Grid>
            </Box>

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Stack spacing={2} direction="row">

                {/* <Card 
                  sx={{ minWidth: '49%', height: 150, backgroundImage: 'linear-gradient(50deg, #FFF323, #439A97)' }}>
                  <CardContent>
                    <div>
                      <PaymentsIcon sx={{ color: '#003C43' }}/>
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                    <CountUp end={9860} enableScrollSpy />
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" sx={{color: "#135D66"}}>
                      Visitors
                    </Typography>
                  </CardContent>
                </Card> */}

                {/* <Card sx={{ minWidth: '49%', height: 150, backgroundImage: 'linear-gradient(50deg, #FFF323, #439A97)' }}>
                  <CardContent>
                    <div>
                      <LocalActivityIcon sx={{ color: '#003C43' }}/>
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                    <CountUp end={110} enableScrollSpy />
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" sx={{color: "#135D66"}}>
                      Events availability
                    </Typography>
                  </CardContent>
                </Card> */}
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={2}>
                {/* <Card sx={{ width: 400, backgroundImage: 'linear-gradient(50deg, #439A97, #FFD31D)' }}>
                  <Stack spacing={2} direction="row" sx={{ padding: '10px' }}>
                    <FamilyRestroomIcon sx={{ marginTop: '20px', marginLeft: '20px', color: '#FFFE9A' }} />
                    <div sx={{ padding: '3px' }}>
                    <Typography variant="h2" component="h2" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                      805
                    </Typography>
                    <Typography>Adult Tickets Sales</Typography>
                    </div>
                  </Stack>
                </Card> */}
                {/* <Card sx={{ width: 400, backgroundImage: 'linear-gradient(50deg, #439A97, #FFD31D)' }}>
                  <Stack spacing={2} direction="row" sx={{ padding: '10px' }}>
                    <FaceIcon sx={{ marginTop: '20px', marginLeft: '20px', color: '#FFFE9A' }} />
                    <div sx={{ padding: '3px' }}>
                    <Typography variant="h2" component="h2" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                      1000
                    </Typography>
                    <Typography>Child Tickets Sales</Typography>
                    </div>
                  </Stack>
                </Card> */}
              </Stack>
            </Grid>
          </Grid>
          <Box height={20} />
          
          {/* <Grid container spacing={2}>
            <Grid item xs={8}>
              <Card sx={{ height: "60vh" }}>
                <CardContent>
                  <BarChart/>
                </CardContent>
              </Card>
            </Grid>    
            <Grid item xs={4}>
              <Card sx={{ height: "60vh" }}>
                <CardContent>
                  <PieChart />
                </CardContent>
              </Card>
            </Grid>
          </Grid> */}

          
        </Box>
      </Box>
         
             



    </>
  );
}

export default Dashboard;
