import React, {useRef, useState} from 'react';
import { withRouter } from 'react-router-dom';
import Label from '../../Label';
import chartInfoService from '../../../DashboardApp/service/chartInfoService';
import { toast } from 'react-toastify';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';

function UserChangeRole (props) {
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const  handleClose = () => {
        setIsOpen(false);
    }

    const changeRole = (user) => {
        let body = { email: user.USER_EMAIL }
        chartInfoService.changeRole(body)
        .then();
        toast.success(" 승인처리 되었습니다.");

        setTimeout(() => {
            props.history.push('/dashboard/user')
        }, 1200)
    }

    return (
        <>
            <IconButton ref={ref} onClick={() => setIsOpen(true)}>
                <Label
                // variant="ghost"
                color={
                    (props.user.USER_FLAG === 'banned' && 'error') || 'success'
                }
                >
                {props.user.USER_FLAG ==='true'? 'Confirm':''}
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
    )
}

export default withRouter(UserChangeRole);