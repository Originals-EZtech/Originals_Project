import React from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import copy from '../resources/images/copy.svg';
import {ToastContainer, toast} from "react-toastify"
const RoomLabel = ({roomId}) => {
    const copys= () =>{
        toast.success('Copy Success!');
    }
    return (
        <div className ='room_label'>
            <details className="mark">
                <summary className="mark_name">▼　　　　　　　　　　　　CLASS ID　　　　　　　　　　　　▼</summary>
                <p className = 'room_label_paragraph'> {roomId} </p>
                <CopyToClipboard text={roomId}>
                    <img
                    className="copybutton"
                    onClick={copys}
                    src={copy}
                    alt=''>
                    </img>
                </CopyToClipboard>
            </details>
            <ToastContainer hideProgressBar={true}/>
        </div>
    );
};

export default RoomLabel;

