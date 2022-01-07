import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as RouterLink, } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Drawer } from '@mui/material';
// components
import Logo from '../../dashboard_components/Logo';
import Scrollbar from '../../dashboard_components/Scrollbar';
import NavSection from '../../dashboard_components/NavSection';
import { MHidden } from '../../dashboard_components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
import Clock from 'react-live-clock';

import { sideOpen } from '../../components/views/Room/store/actions';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

function DashboardSidebar(props) {
  const { open, sideOpenAction, theme } = props;

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }} style={{backgroundColor: "#bee9b4"}}>
        <Box component={RouterLink} to="/dashboard/app" sx={{ display: 'inline-flex' }}>
          <Logo />
        </Box>
      </Box>

      <br/>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <AccountStyle>
            <h4><Clock format={'YYYY-MM-DD HH:mm:ss'} ticking={true} timezone={'US/Pacific'} /></h4>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig} theme={theme} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  const closeHandler = () => {
    sideOpenAction(false)
  }

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={open}
          onClose={closeHandler} /*open값을 false로 만들기*/
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}

const mapStoreStateToProps = (state) =>{
  return {
      ...state,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
      sideOpenAction: (open) => dispatch(sideOpen(open))
  }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(DashboardSidebar);