import React from 'react';
import RoomJoinComp from './RoomJoinComp';
import RoomJoinCompRoomName from './RoomJoinCompRoomName';
import { Link } from 'react-router-dom';
import CreateRoomComponent from '../../Myroom/CreateRoomComponent';
import JoinRoomComponent from '../../Myroom/JoinRoomComponent';

function RoomJoin() {

    return (
        <div>
            <RoomJoinComp />
            <br></br>
            <br></br>
            <RoomJoinCompRoomName/> 
            <h3><li><Link to="../room_2" >나가기</Link></li></h3>
            <h3></h3>
            
            <JoinRoomComponent/>
            <CreateRoomComponent />
        </div>
    );
};

export default RoomJoin;