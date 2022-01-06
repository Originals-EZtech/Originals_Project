import React, { useState, } from 'react';
import RoomNavBar from '../NavBar/RoomNavBar';
import RoomListComponent from './RoomListComponent';
import './MyRoomPage.css';
function JoinRoomComponent() {
    const [now,setnow]=useState(false);
    if(now){
        return(
            <div className="myall">
                <div className="mycalss_room_conta">
                <RoomNavBar /> 
                </div>
                <div className="mycalss">
                    <h1>참여했던 방 목록</h1>
                    <h3><RoomListComponent /></h3>
                </div>
            </div>
        );
    }
    else{
        return (
            <div className="myall">
                <div className="mycalss_room_conta">
                <RoomNavBar />          
                </div>
                <div className="mycalss">
                    <h1 className="my_title">Create Room List</h1>   
                    <RoomListComponent />
                </div>
            </div>
            
        );
    }
    

};

export default JoinRoomComponent;