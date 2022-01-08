import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// material
import {
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,

} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Scrollbar from '../../../dashboard_components/Scrollbar';
import { UserListHead, UserCheckFile, UserChangeRole } from '../../../dashboard_components/_dashboard/user';

import DashboardNavbar from '../../../dashboard_layouts/dashboard/DashboardNavbar';
import DashboardSidebar from '../../../dashboard_layouts/dashboard/DashboardSidebar';
import chartInfoService from '../DashboardApp/service/chartInfoService';
import { ToastContainer } from 'react-toastify';
import { sideOpen } from '../../../redux/actions/actions';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'Email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'attached', label: 'Attached', alignRight: false }
];

// ----------------------------------------------------------------------

const initState = {
  permitlist: [
    {
      EMAIL: "",
      NAME: "",
      ROLE: "",
      FLAG: ""
    }
  ]
}

function DashboardUser(props) {
  const { open, sideOpenAction } = props;

  const [users, setUsers] = useState(initState);

  useEffect(() => {
    sideOpenAction(false);
    chartInfoService.getPermitList().then(res => {
      setUsers(res.data)
    })
  }, [])

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


  const list = users.permitlist.map(user => {
    return <TableRow
      hover
      key={user.EMAIL}
      tabIndex={-1}
    >
      <TableCell></TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2" noWrap>
            {user.USER_NAME}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="left">
        {user.USER_EMAIL}
      </TableCell>

      <TableCell align="left">
        {user.USER_ROLE}
      </TableCell>

      <TableCell align="left">
        {user.USER_FLAG ? 'No' : 'Yes'}
      </TableCell>

      <TableCell align="left">
        <UserChangeRole user={user} />
      </TableCell>

      <TableCell align="left">
        <UserCheckFile image={user.DIRECTORY} />
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
            <Typography variant="h3" gutterBottom style={{fontFamily:"Georgia, 'Times New Roman', Times, serif"}}>
              Request for Approval 
            </Typography>
          </Stack>
          <Card>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
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

export default connect(mapStoreStateToProps, mapActionsToProps)(DashboardUser);