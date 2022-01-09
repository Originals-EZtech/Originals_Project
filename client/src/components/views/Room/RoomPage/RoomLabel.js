import React from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import copy from '../resources/images/copy.svg';
const RoomLabel = ({roomId}) => {
    return (
        <div className ='room_label'>
            <details className="mark">
                <summary className="mark_name">▼　　　　　　　　　　　　ROOM ID　　　　　　　　　　　　▼</summary>
                <p className = 'room_label_paragraph'>Class ID: {roomId} </p>
                <CopyToClipboard text={roomId}>
                    <img
                    className="copybutton"
                    src={copy}
                    alt=''>
                    </img>
                </CopyToClipboard>
            </details>
         
        </div>
    );
};

export default RoomLabel;

