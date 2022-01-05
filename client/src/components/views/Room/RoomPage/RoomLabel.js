import React from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import copy from '../resources/images/copy.svg';
const RoomLabel = ({roomId}) => {
    return (
        <div className ='room_label'>
           <p className = 'room_label_paragraph'>Class ID: {roomId} </p>
           <CopyToClipboard text={roomId}>
               <img
               className="copybutton"
               src={copy}>
               </img>
           </CopyToClipboard>
        </div>
    );
};

export default RoomLabel;

