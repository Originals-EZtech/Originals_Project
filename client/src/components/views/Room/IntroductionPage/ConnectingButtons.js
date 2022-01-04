import React from 'react';
import ConnectingButton from './ConnectingButton';
import { withRouter, Link } from 'react-router-dom';

const ConnectingButtons = (props) => {
    const pushToJoinRoomPage = () => {
        props.history.push('/join-room');
    }
    
    const pushToJoinRoomPageAsHost =() =>{
        props.history.push('/join-room?host=true');
    }
    return(
        <div className = 'connecting_buttons_container'>
            <ConnectingButton buttonText = 'Join class' 
            onClickHandler ={pushToJoinRoomPage}/>
            <ConnectingButton createRoomButton buttonText = 'Create class' 
            onClickHandler ={pushToJoinRoomPageAsHost}/>
            <h2><Link to="../Myclass" >My class</Link></h2>
        </div>
    );
};

export default withRouter(ConnectingButtons);