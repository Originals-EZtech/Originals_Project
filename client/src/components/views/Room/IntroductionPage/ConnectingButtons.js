import React from 'react';
import ConnectingButton from './ConnectingButton';
import { withRouter } from 'react-router-dom';

const ConnectingButtons = (props) => {
    const pushToJoinRoomPage = () => {
        props.history.push('/join-room');
    }
    
    const pushToJoinRoomPageAsHost =() =>{
        props.history.push('/join-room?host=true');
    }
    return(
        <div className = 'connecting_buttons_container'>
            <ConnectingButton buttonText = '방 참여하기' 
            onClickHandler ={pushToJoinRoomPage}/>
            <ConnectingButton createRoomButton buttonText = '방 만들기' 
            onClickHandler ={pushToJoinRoomPageAsHost}/>
        </div>
    );
};

export default withRouter(ConnectingButtons);