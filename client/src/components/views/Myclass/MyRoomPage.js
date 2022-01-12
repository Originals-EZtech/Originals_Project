import React from 'react';
import RoomNavBar from '../NavBar/RoomNavBar';
import RoomListComponent from './RoomListComponent';
import './MyRoomPage.css';
function JoinRoomComponent() {
    
    return(
        <div className="myclass_container">
            <RoomNavBar /> 
            <div className="myclass_box">
                <h1 className="my_title">Create Room List</h1>   
                <RoomListComponent />
            </div>
        </div>
    );

};

export default JoinRoomComponent;