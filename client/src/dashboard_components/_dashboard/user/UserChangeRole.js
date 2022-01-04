import React, {useRef, useState} from 'react';
import { withRouter } from 'react-router-dom';
import Label from '../../../dashboard_components/Label';
import chartInfoService from '../../../components/views/DashboardApp/service/chartInfoService';
import { toast } from 'react-toastify';
import { IconButton } from '@mui/material';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";

function UserChangeRole (props) {
    console.log('user', props.user);
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const  handleClose = () => {
        setIsOpen(false);
    }

    const changeRole = (user) => {
        let body = { email: user.EMAIL }
        console.log("on chagerole click", body)
        chartInfoService.changeRole(body)
          .then();
        toast.success(" 승인처리 되었습니다.");

        setTimeout(() => {
            props.history.push('/dashboard/user')
        }, 1200)

        // setTimeout(() => {
        //   serFlag(!flag);
        // }, 800)
    }

    return (
        <>
        <IconButton ref={ref} onClick={() => setIsOpen(true)}>
            <Label
            // variant="ghost"
            color={
                (props.user.FLAG === 'banned' && 'error') || 'success'
            }
            >
            {props.user.FLAG}
            </Label> 
        </IconButton>

        <Dialog open={isOpen} onClose={handleClose} fullWidth={true}>
        <DialogTitle>ALERT</DialogTitle>

        <DialogContent>
            <Typography gutterBottom>해당 사용자를 승인하시겠습니까?</Typography>
        </DialogContent>

        <DialogActions>
            <Button variant="contained" color="primary" onClick={() => changeRole(props.user)}>
              승인
            </Button>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              닫기
            </Button>
        </DialogActions>
        </Dialog>
        </>
    );
}

export default withRouter(UserChangeRole);