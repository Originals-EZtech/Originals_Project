import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, Typography, IconButton } from '@mui/material';
// components
import MenuPopover from '../dashboard_components/MenuPopover';
//
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';
import { logout } from '../../../../redux/actions/actions';

function AccountPopover(props) {
  const imgStyle = {
    width: 60,
    height: 60,
    borderRadius: '50%'
  }

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [cookies] = useCookies();
  const { logoutAction } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logoutHandler = (e) => {
    e.preventDefault();

    logoutAction()
    .then(response => {
        if (response.response.logoutSuccess) {
            toast.success(response.response.msg)
            setTimeout(() => {
              window.location.replace('/')
            }, 1500)
        } else if (!response.response.logoutSuccess) {
            toast.error(response.response.msg) 
        }
    })
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 60,
          height: 60,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.3)
            }
          })
        }}
      >
        <img style={imgStyle} src="/static/illustrations/admin_avatar.png" alt="" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {cookies.un}
          </Typography>
          {/* <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userEmail}
          </Typography> */}
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))} */}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={logoutHandler} >
            Logout
          </Button>
        </Box>
      </MenuPopover>
      <ToastContainer hideProgressBar={true}/>
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
      logoutAction: () => dispatch(logout())
  }
}

export default withRouter(connect(mapStoreStateToProps, mapActionsToProps)(AccountPopover));