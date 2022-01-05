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

    const pushToMyClass = () => {
        props.history.push('/myclass');
    }

    return(
        <div className = 'connecting_buttons_container'>
            <ConnectingButton buttonText = 'Join class' 
            onClickHandler ={pushToJoinRoomPage}/>
            <ConnectingButton createRoomButton buttonText = 'Create class' 
            onClickHandler ={pushToJoinRoomPageAsHost}/>
            <ConnectingButton createRoomButton buttonText = 'My class'
            onClickHandler={pushToMyClass}/>
        </div>
    );
};

export default withRouter(ConnectingButtons);