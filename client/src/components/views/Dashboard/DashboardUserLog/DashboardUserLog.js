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

} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Scrollbar from '../dashboard_components/Scrollbar';
import { UserListHead  } from '../dashboard_components/_dashboard/user';

import DashboardNavbar from '../dashboard_layouts/DashboardNavbar';
import DashboardSidebar from '../dashboard_layouts/DashboardSidebar';
import chartInfoService from '../DashboardApp/service/chartInfoService';
import { ToastContainer } from 'react-toastify';
import { sideOpen } from '../../../../redux/actions/actions';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'User', label: 'User', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false },
  { id: 'IP', label: 'IP Address', alignRight: false },
  { id: 'Date', label: 'Date', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  // { id: 'attached', label: 'Attached', alignRight: false }
];

// ----------------------------------------------------------------------

const initState = {
  list: [
    {
      USERLOG_SEQ: "",
      USER_EMAIL: "",
      USERLOG_IP: "",
      USERLOG_ACTION: "",
      USERLOG_DATE: ""
    }
  ]
}

function DashboardUserLog(props) {
  const { open, sideOpenAction } = props;
  const [userlog, setUserLog] = useState(initState);
  useEffect(() => {
    sideOpenAction(false);
    chartInfoService.getUserloglist().then(res => {
      setUserLog(res.data)
      console.log(res.data)
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


  const list = userlog.list.map((user) => {
    return <TableRow
      hover
      key={user.USERLOG_SEQ}
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
        {user.USERLOG_ACTION}
      </TableCell>

      <TableCell align="left">
        {user.USERLOG_IP}
      </TableCell>



      <TableCell align="left">
        {user.USERLOG_DATE}
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
              Request
            </Typography>
          </Stack>
          <Card style={{maxHeight:6500}}>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 500 ,maxHeight: 650 ,overflow: "scroll" }}>
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