import React from 'react';
import SideBar from '../AdminComponents/SideBar/SideBar';
import NavBar from '../AdminComponents/NavBar/NavBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import StoreIcon from '@mui/icons-material/Store';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import BarChart from '../Charts/BarChart';
import PieChart from '../Charts/PieChart';
import LineChart from '../Charts/LineChart';

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Stack spacing={2} direction="row">
                <Card 
                  sx={{ minWidth: '49%', height: 150, backgroundImage: 'linear-gradient(50deg, #FFF323, #439A97)' }}>
                  <CardContent>
                    <div>
                      <PaymentsIcon sx={{ color: '#003C43' }}/>
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                      0000
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" sx={{color: "#135D66"}}>
                      Total sell Tickets
                    </Typography>
                  </CardContent>
                </Card>

                <Card sx={{ minWidth: '49%', height: 150, backgroundImage: 'linear-gradient(50deg, #FFF323, #439A97)' }}>
                  <CardContent>
                    <div>
                      <LocalActivityIcon sx={{ color: '#003C43' }}/>
                    </div>
                    <Typography gutterBottom variant="h5" component="div">
                      0000
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div" sx={{color: "#135D66"}}>
                      Events availability
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack spacing={2}>
                <Card sx={{ width: 400, backgroundImage: 'linear-gradient(50deg, #439A97, #FFD31D)' }}>
                  <Stack spacing={2} direction="row" sx={{ padding: '10px' }}>
                    <StoreIcon sx={{ marginTop: '20px', marginLeft: '20px', color: '#FFFE9A' }} />
                    <div sx={{ padding: '10px' }}>
                      <span sx={{ fontWeight: 600 }}>Rs.00000.00</span>
                      <br />
                      <span sx={{ fontSize: '14px' }}>Total Income</span>
                    </div>
                  </Stack>
                </Card>
                <Card sx={{ width: 400, backgroundImage: 'linear-gradient(50deg, #439A97, #FFD31D)' }}>
                  <Stack spacing={2} direction="row" sx={{ padding: '10px' }}>
                    <StoreIcon sx={{ marginTop: '20px', marginLeft: '20px', color: '#FFFE9A' }} />
                    <div sx={{ padding: '10px' }}>
                      <span sx={{ fontWeight: 600 }}>Rs.00000.00</span>
                      <br />
                      <span sx={{ fontSize: '14px' }}>Total Income</span>
                    </div>
                  </Stack>
                </Card>
              </Stack>
            </Grid>
          </Grid>
          <Box height={20} />
          <Grid container spacing={2}>
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
          </Grid>

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
                <Card 
                  sx={{ width: '243px', height: '203px', backgroundImage: 'linear-gradient(50deg, #FFF323, #439A97)' }}>
                  <CardContent>
      
                  </CardContent>
                </Card>

                <Card sx={{ width: '243px', height: '203px', backgroundImage: 'linear-gradient(50deg, #FFF323, #439A97)' }}>
                  <CardContent>
                    
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            
            <Grid item xs={4}>
              <Stack spacing={2} direction="row" sx={{ padding: '10px' }}>
                <Card 
                  sx={{ width: '243px', height: '203px', backgroundImage: 'linear-gradient(50deg, #FFF323, #439A97)' }}>
                  <CardContent>
                    
                  </CardContent>
                </Card>

                <Card sx={{ width: '243px', height: '203px', backgroundImage: 'linear-gradient(50deg, #FFF323, #439A97)' }}>
                  <CardContent>
                    
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            </Box>
        </Box>
      </Box>
         
             



    </>
  );
}

export default Dashboard;
