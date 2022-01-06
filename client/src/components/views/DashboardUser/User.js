import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
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
// import Label from '../../../dashboard_components/Label';
import Scrollbar from '../../../dashboard_components/Scrollbar';
import { UserListHead, UserCheckFile, UserChangeRole } from '../../../dashboard_components/_dashboard/user';
//

import DashboardNavbar from '../../../dashboard_layouts/dashboard/DashboardNavbar';
import DashboardSidebar from '../../../dashboard_layouts/dashboard/DashboardSidebar';
import chartInfoService from '../DashboardApp/service/chartInfoService';
import { toast, ToastContainer } from 'react-toastify';

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

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

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

export default function User() {
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState(initState);
  const [flag, serFlag] = useState(false);

  console.log("클라에서 users : ", users)


  useEffect(() => {

    chartInfoService.getPermitList().then(res => {
      console.log("클라에서 res : ", res)
      setUsers(res.data)
    })

  }, [flag])

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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  // const changeRole = (user) => {
  //   let body = { email: user.USER_EMAIL }
  //   // console.log("on chagerole click", body)
  //   chartInfoService.changeRole(body)
  //     .then();
  //   toast.success(" 승인처리 되었습니다.");
  //   setTimeout(() => {
  //     serFlag(!flag);
  //   }, 800)
  // }

  const list = users.permitlist.map(user => {
    return <TableRow
      hover
      key={user.EMAIL}
      tabIndex={-1}
      role="checkbox"
    // selected={isItemSelected}
    // aria-checked={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
        // checked={isItemSelected}
        // onChange={(event) => handleClick(event, name)}
        />
      </TableCell>

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
        {user.USER_FLAG ? 'Yes' : 'No'}
      </TableCell>

      <TableCell align="left" 
      // onClick={() => changeRole(user)}
      >
        {/* <Label
          variant="ghost"
          color={
            (user.USER_FLAG === 'banned' && 'error') || 'success'
          }
        >
          {user.USER_FLAG}
        </Label> */}
        <UserChangeRole user={user} />
      </TableCell>

      <TableCell align="left">
        <UserCheckFile image={user.DIRECTORY} />
      </TableCell>
    </TableRow>
  })

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Request for Approval 
            </Typography>
          </Stack>
          <Card>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    // rowCount={USERLIST.length}
                    // numSelected={selected.length}
                    // onRequestSort={handleRequestSort}
                    // onSelectAllClick={handleSelectAllClick}
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
