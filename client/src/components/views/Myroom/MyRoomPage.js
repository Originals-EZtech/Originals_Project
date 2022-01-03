import React, { useState, } from 'react';
import RoomListComponent from './RoomListComponent';

function JoinRoomComponent() {

    return (
        <div>
            <h3>만들었던 방 목록</h3><br></br>   
            <h3><RoomListComponent /></h3>

            <br></br>
            <h3>참여했던 방 목록</h3><br></br>
            <h3><RoomListComponent /></h3>  
        </div>
    );
};

export default JoinRoomComponent;