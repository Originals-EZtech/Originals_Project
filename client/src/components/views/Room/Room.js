import React from 'react';
// import { Route, Link } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Room() {

    return (
        <div>
            <h3><li><Link to="/roomcreate" >방 만들기</Link></li></h3>
            {/* <Link to="">방 만들기</Link> */}

            <h3><li><a href="/roomjoin" >방 참여하기</a></li></h3>

        </div>
    );
};

export default Room;