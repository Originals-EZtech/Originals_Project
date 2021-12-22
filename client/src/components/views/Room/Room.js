import React from 'react';
import { Link } from 'react-router-dom';

function Room() {
    return (
        <div>
            <h3><li><Link to="/roomcreate">방 만들기</Link></li></h3>
            <h3><li><Link to="/roomjoin" >방 참여하기</Link></li></h3>
        </div>
    );
};

export default Room;