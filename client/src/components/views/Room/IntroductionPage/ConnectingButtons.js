import React from 'react';
import ConnectingButton from './ConnectingButton';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCookies } from "react-cookie";

const ConnectingButtons = (props) => {
    const [cookies] = useCookies();
  
    const pushToJoinRoomError = () =>{
        toast.error('승인 허가 되지 않은 유저입니다.');
    }
    const pushToJoinRoomPage = () => {
        props.history.push('/join-room');
    }
    const pushToJoinRoomPageAsHost =() =>{
        props.history.push('/join-room?host=true');
    }
    const pushToMyClass = () => {
        props.history.push('/myclass');
    }

    if(cookies.user_role ==='prof' && cookies.user_flag  === 'false'){
        return(<div className = 'connecting_buttons_container'>
            <ConnectingButton buttonText = 'Host a meeting' 
            onClickHandler ={pushToJoinRoomPageAsHost}/>
            <ConnectingButton buttonText = 'My class'
            onClickHandler={pushToMyClass} />
        </div>);
    }else if(cookies.user_role ==='general' || (cookies.user_role ==='prof' && cookies.user_flag  === 'true')){
        return(<div className = 'connecting_buttons_container'>
            <ConnectingButton buttonText = 'Join a meeting' 
            onClickHandler ={pushToJoinRoomPage}/>
            <ConnectingButton buttonText = 'My class'
            onClickHandler={pushToMyClass} />
        </div>);
    }else{
        return(<div className = 'connecting_buttons_container'>
            <ConnectingButton onClickHandler ={pushToJoinRoomError}/>
            <ConnectingButton buttonText = 'My class'
            onClickHandler={pushToMyClass} />
        </div>);
    }
};


export default withRouter(ConnectingButtons);