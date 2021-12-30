import React from 'react';
import { Link } from 'react-router-dom';
import RoomNavBar from '../NavBar/RoomNavBar';
import styles from '../Room_By_Dong/room.module.css';

function Room() {
    return (
        <div>
            <RoomNavBar />
            <div style={{marginTop: 150}}></div>
            <div class="wrap">
                <div class="createRoom">
                    <h3><li><Link to="/roomcreate" >방 만들기</Link></li></h3>
                </div>
                <div class="enterRoom">
                    <h3><li><Link to="/roomjoin" >방 참여하기</Link></li></h3>
                </div>
            </div>
        </div>
    );
};

export default Room;