import React from 'react';
import ConnectingButton from './ConnectingButton';
import { withRouter, Link } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';

const ConnectingButtons = (props) => {
    const cookies = new Cookies();
    const isProf = (cookies.get('user_role') === 'prof') ? true : false;
    // console.log(isProf);

    const pushToJoinRoomPage = () => {
        if (isProf) {
            props.history.push('/join-room');
        } else {
            toast.error('승인 허가 되지 않은 유저입니다.');
        }
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