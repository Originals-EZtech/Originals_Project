import { useEffect, useState } from 'react';
import { connect} from 'react-redux';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
// components
import Page from '../dashboard_components/Page';
import DashboardNavbar from '../dashboard_layouts/DashboardNavbar';
import DashboardSidebar from '../dashboard_layouts/DashboardSidebar';
import {
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppWeeklySales,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppConversionRates
} from '../dashboard_components/_dashboard/app';
import chartInfoService from './service/chartInfoService';
import { sideOpen } from '../../../../redux/actions/actions';
import Spinner from '../../Loading/Spinner';

// ----------------------------------------------------------------------

function DashboardApp(props) {
  const { open, sideOpenAction } = props;

  const APP_BAR_MOBILE = 64;
  const APP_BAR_DESKTOP = 92;

  const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
  });

  const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
      paddingTop: APP_BAR_DESKTOP + 24,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  }));

  const initState = {
    "a": [0],    
    "b": [0],
    "c": [0],
    "d": [0],
    "e": [0],
    "f": [0],
    "g": [0],
    "h": [0],
    "i": [0],
    "j": [0],
    "k": [0]
  }
  const userInitState = {
    "countA": [0],
    "countB": [0],
    "countC": [0],
    "countD": [0],
    "countE": [0],
    "countF": [0],
    "countG": [0],
    "countH": [0],
    "countI": [0],
    "countJ": [0],
    "countK": [0]
  }
  const roomInitState = {
    "roomA": [0],
    "roomB": [0],
    "roomC": [0],
    "roomD": [0],
    "roomE": [0],
    "roomF": [0],
    "roomG": [0],
    "roomH": [0],
    "roomI": [0],
    "roomJ": [0],
    "roomK": [0]
  }

  const [visitorCount, setVisitorCount] = useState();
  const [roomCount, setRoomCount] = useState();
  const [usersCount, setUsersCount] = useState({ general: 0, prof: 0, total: 0 });
  const [visitorList, setVisitorList] = useState(initState);
  const [userSignUpList, setUserSignUpList] = useState(userInitState);
  const [roomList, setRoomList] = useState(roomInitState);
  const [usageTime, setUsageTime] = useState();
  const [isLoaded, setIsLoaded] = useState(false);


  const theme = useTheme();
  
  useEffect(() => {
    sideOpenAction(false);

    chartInfoService.getVisitorTotal().then(res =>{
      setVisitorCount(res.data);
    })
    chartInfoService.getRoomsTotal().then(res => {
      setRoomCount(res.data);
    })
    chartInfoService.getUsersCount().then(res => {
      setUsersCount(res.data)
    })
    chartInfoService.getVisitorlist().then(res => {
      setVisitorList(res.data);
    })
    chartInfoService.getSignUpList().then(res => {
      setUserSignUpList(res.data);
    })
    chartInfoService.getRoomUpList().then(res => {
      setRoomList(res.data);
    })
    chartInfoService.getUsageTime().then(res => {
      setUsageTime(res.data);
    })

    // setIsLoaded(true)

    setTimeout(() =>
      setIsLoaded(true)
    , 1500)
    
  }, [sideOpenAction])

  return (
    <>
      {isLoaded ?
      <RootStyle>
        <DashboardNavbar />
        <DashboardSidebar isOpenSidebar={open} theme={theme}/>
        <MainStyle>
          <Page title="Dashboard">
            <Container maxWidth="xl">
              <Box sx={{ pb: 5 }}>
                <Typography variant="h3" style={{fontFamily:"Georgia, 'Times New Roman', Times, serif"}}>
                  Admin Chart
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <AppWeeklySales usersTotal={usersCount} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <AppNewUsers visitorCount={visitorCount} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <AppItemOrders roomCount={roomCount} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <AppBugReports usageTime={usageTime}/>
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                  <AppWebsiteVisits visitorList={visitorList} userSignUpList={userSignUpList} roomList={roomList} />
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <AppCurrentVisits usersCount={usersCount} />
                </Grid>

                <Grid item xs={12} md={6} lg={8}>
                  <AppConversionRates roomList={roomList}/>
                </Grid>

                {/* <Grid item xs={12} md={6} lg={4}>
                  <AppCurrentSubject />
                </Grid> */}
              </Grid>
            </Container>
          </Page>
        </MainStyle>
      </RootStyle> : <Spinner />
      }
    </>
  );
}

const mapStoreStateToProps = (state) =>{
  return {
      ...state,
  }
}

const mapActionsToProps = (dispatch) => {
  return {
      sideOpenAction: (open) => dispatch(sideOpen(open))
  }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(DashboardApp);