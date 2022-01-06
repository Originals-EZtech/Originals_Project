import React, { useState, } from 'react';
import RoomNavBar from '../NavBar/RoomNavBar';
import RoomListComponent from './RoomListComponent';
import './MyRoomPage.css';
import {useCookies} from "react-cookie";
function JoinRoomComponent() {
    const [now,setnow]=useState(false);
    const [cookies]=useCookies();
    
    if(cookies.user_role === 'prof'){
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
        console.log(cookies.user_role);
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