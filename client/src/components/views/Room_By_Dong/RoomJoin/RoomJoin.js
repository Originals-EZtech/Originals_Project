import React from 'react';

import RoomJoinComp from './RoomJoinComp';
import RoomJoinCompRoomName from './RoomJoinCompRoomName';
import { Link } from 'react-router-dom';

function RoomJoin() {

    return (
        <div>
            <RoomJoinComp />
            <br></br>
            <br></br>
            <RoomJoinCompRoomName/> 
            <h3><li><Link to="../room" >나가기</Link></li></h3>
        </div>
    );
};

export default RoomJoin;