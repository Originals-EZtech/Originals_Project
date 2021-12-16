import React from 'react';
import { Link } from 'react-router-dom';

function RoomAdmin() {

    return (
        <div>
            <h3>방장 화면페이지</h3><br></br>
            <h3><Link to='../room'>나가기</Link></h3><br></br>
        </div>
    );
};

export default RoomAdmin;