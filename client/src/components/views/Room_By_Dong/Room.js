import React from 'react';
import { Link } from 'react-router-dom';
import RoomNavBar from '../NavBar/RoomNavBar';

function Room() {
    return (
        <div>
            <RoomNavBar />
            <div style={{marginTop: 150}}></div>
            <div class="wrap">
                <div class="createRoom">
                    <h3><li><Link to="/roomcreate_2" >방 만들기</Link></li></h3>
                </div>
                <div class="enterRoom">
                    <h3><li><Link to="/roomjoin_2" >방 참여하기</Link></li></h3>
                </div>
            </div>
        </div>
    );
};

export default Room;