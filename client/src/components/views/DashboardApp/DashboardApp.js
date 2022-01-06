import { useEffect, useState } from 'react';
import { connect} from 'react-redux';
// material
import { Box, Grid, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../../dashboard_components/Page';
import DashboardNavbar from '../../../dashboard_layouts/dashboard/DashboardNavbar';
import DashboardSidebar from '../../../dashboard_layouts/dashboard/DashboardSidebar';
import {
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppWeeklySales,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppCurrentSubject,
  AppConversionRates
} from '../../../dashboard_components/_dashboard/app';
import chartInfoService from './service/chartInfoService';
import { sideOpen } from '../Room/store/actions';

// ----------------------------------------------------------------------

function DashboardApp(props) {
  const { open, sideOpenAction } = props;
  // console.log(open);

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

  // const [open, setOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState();
  const [roomCount, setRoomCount] = useState();
  const [usersCount, setUsersCount] = useState({ general: 0, prof: 0, total: 0 });
  const [visitorList, setVisitorList] = useState(initState);
  const [userSignUpList, setUserSignUpList] = useState(userInitState);


  console.log("상태값???",visitorList)
  
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

  }, [])

  return (
    <RootStyle>
      <DashboardNavbar />
      <DashboardSidebar isOpenSidebar={open} />
      <MainStyle>
        <Page title="Dashboard">
          <Container maxWidth="xl">
            <Box sx={{ pb: 5 }}>
              <Typography variant="h4">Admin Chart</Typography>
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
                <AppBugReports />
              </Grid>
              <Grid item xs={12} md={6} lg={8}>
                <AppWebsiteVisits visitorList={visitorList} userSignUpList={userSignUpList}  />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits usersCount={usersCount} />
              </Grid>

              <Grid item xs={12} md={6} lg={8}>
                <AppConversionRates />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentSubject />
              </Grid>
            </Grid>
          </Container>
        </Page>
      </MainStyle>
    </RootStyle>
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