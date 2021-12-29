import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function RoomAdmin() {
    const sum = useLocation()
    console.log("sum: "+(sum));
    console.log("typeof(sum): "+typeof(sum));

    console.log("sum.state: "+sum.state);
    console.log("typeof(sum.state): "+typeof(sum.state));

    console.log("sum.state: "+sum.state.name);
    console.log("typeof(sum.state.name): "+typeof(sum.state.name));
    return (
            <div>
                <h3>방장 화면페이지</h3><br></br>
                <h3>방고유번호 : {sum.state.body} </h3><br></br>
                <h3>방고유번호 : {sum.state.name} </h3><br></br>
                <h3><Link to='../room'>나가기</Link></h3><br></br>
                
            </div>
    );
};

export default RoomAdmin;