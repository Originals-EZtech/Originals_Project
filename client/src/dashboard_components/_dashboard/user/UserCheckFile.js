import React, {useState,useRef} from 'react';
import { Icon } from '@iconify/react';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import attachFill from '@iconify/icons-eva/attach-fill';
import { IconButton } from '@mui/material';


export default function UserCheckFile ({image}) {
    // console.log('image', image);
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const  handleClose = () => {
        setIsOpen(false);
    }

    return (
        <>
        <IconButton ref={ref} onClick={() => setIsOpen(true)}>
            <Icon icon={attachFill} width={20} height={20} />
        </IconButton>

        <Dialog open={isOpen} onClose={handleClose} fullWidth={true}>
            <DialogTitle>CERTIFICATE</DialogTitle>

            <DialogContent>
                <div>
                    <img style={{alignItems:"center"}} src={image} width="500px" height="300px" alt="attached" />
                </div>
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
        </>
    );
}
