import React from 'react';
import ConnectingButton from './ConnectingButton';
import { withRouter, Link } from 'react-router-dom';

import { useCookies } from "react-cookie";

const ConnectingButtons = (props) => {
    const [cookies] = useCookies();

    const pushToJoinRoomPage = () => {
        props.history.push('/join-room');
    }
    
    const pushToJoinRoomPageAsHost =() =>{
        props.history.push('/join-room?host=true');
    }

    const pushToMyClass = () => {
        props.history.push('/myclass');
    }

    if(cookies.user_role==='prof'){
        return(<div className = 'connecting_buttons_container'>
            <ConnectingButton createRoomButton buttonText = 'Host a meeting' 
            onClickHandler ={pushToJoinRoomPageAsHost}/>
            <ConnectingButton createRoomButton buttonText = 'My class'
            onClickHandler={pushToMyClass}/>
        </div>);
    }else{
        return(<div className = 'connecting_buttons_container'>
            <ConnectingButton buttonText = 'Join a meeting' 
            onClickHandler ={pushToJoinRoomPage}/>
            <ConnectingButton createRoomButton buttonText = 'My class'
            onClickHandler={pushToMyClass}/>
        </div>);
    }
};


export default withRouter(ConnectingButtons);