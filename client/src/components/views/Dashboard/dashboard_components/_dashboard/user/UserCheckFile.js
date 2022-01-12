import React, {useState,useRef} from 'react';
import { Icon } from '@iconify/react';
import attachFill from '@iconify/icons-eva/attach-fill';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';

export default function UserCheckFile ({image}) {
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
