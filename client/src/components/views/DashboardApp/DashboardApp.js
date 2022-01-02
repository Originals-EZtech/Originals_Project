import { useState } from 'react';
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

// ----------------------------------------------------------------------

export default function DashboardApp() {
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

  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Page title="Dashboard">
          <Container maxWidth="xl">
            <Box sx={{ pb: 5 }}>
              <Typography variant="h4">차트 </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <AppWeeklySales />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppNewUsers />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppItemOrders />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppBugReports />
              </Grid>

              <Grid item xs={12} md={6} lg={8}>
                <AppWebsiteVisits />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <AppCurrentVisits />
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
