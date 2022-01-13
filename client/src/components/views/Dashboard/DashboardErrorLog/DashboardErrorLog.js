import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Scrollbar from '../dashboard_components/Scrollbar';
import { UserListHead } from '../dashboard_components/_dashboard/user';
import DashboardNavbar from '../dashboard_layouts/DashboardNavbar';
import DashboardSidebar from '../dashboard_layouts/DashboardSidebar';
import chartInfoService from '../DashboardApp/service/chartInfoService';
import { ToastContainer } from 'react-toastify';
import { sideOpen } from '../../../../redux/actions/actions';
import AppCurrentLog from '../dashboard_components/_dashboard/app/AppCurrentLog';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Email', label: 'Email', alignRight: false },
  { id: 'Level', label: 'Level', alignRight: false },
  { id: 'Error Message', label: 'Error Message', alignRight: false },
  { id: 'IP Address', label: 'IP Address', alignRight: false },
  { id: 'Issue Date', label: 'Issue Date', alignRight: false }
];

// ----------------------------------------------------------------------

const initState = {
  list: [
    {
      ERRORLOG_SEQ: "",
      ERRORLOG_LEVEL: "",
      ERRORLOG_MESSAGE: "",
      USER_EMAIL: "",
      ERRORLOG_IP: "",
      ERRORLOG_DATE: ""
    }
  ]
}

function DashboardUserLog(props) {
  const { open, sideOpenAction } = props;

  const [errorloglist, setErrorloglist] = useState(initState);

  console.log(errorloglist)
  useEffect(() => {
    sideOpenAction(false);
    chartInfoService.getErrorloglist().then(res => {
      setErrorloglist(res.data)
    })
  }, [sideOpenAction])

  /* 스타일 설정 */
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
  /* 스타일 설정 */


  const list = errorloglist.list.map((user) => {

    return <TableRow
      hover
      key={user.ERRORLOG_SEQ}
      tabIndex={-1}
    >
      <TableCell></TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2" noWrap>
            {user.USER_EMAIL}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="left">
        {user.ERRORLOG_LEVEL}
      </TableCell>

      <TableCell align="left">
        {user.ERRORLOG_MESSAGE}
      </TableCell>

      <TableCell align="left">
        {user.ERRORLOG_IP}
      </TableCell>

      <TableCell align="left">
        {user.ERRORLOG_DATE}
      </TableCell>

    </TableRow>
  })

  return (
    <RootStyle>
      <DashboardNavbar />
      <DashboardSidebar isOpenSidebar={open} />
      <MainStyle>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h3" gutterBottom style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
              Error Log Monitoring
            </Typography>
          </Stack>
        <AppCurrentLog />
          <Card style={{ maxHeight: 400 }}>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800, maxHeight: 500, overflow: "scroll" }}>
                <Table>
                  <UserListHead
                    headLabel={TABLE_HEAD}
                  />
                  <TableBody>
                    {list}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card>

        </Container>
      </MainStyle>
      <ToastContainer hideProgressBar={true} />
    </RootStyle>
  );
}

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    sideOpenAction: (open) => dispatch(sideOpen(open))
  }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(DashboardUserLog);