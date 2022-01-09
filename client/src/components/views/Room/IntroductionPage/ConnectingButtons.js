import React from 'react';
import ConnectingButton from './ConnectingButton';
import { withRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

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
/* && cookies.user_flag  === 'false'*/
    if(cookies.user_role ==='prof'){
        return(<div className = 'connecting_buttons_container'>
            <ConnectingButton createRoomButton buttonText = 'Host a meeting' 
            onClickHandler ={pushToJoinRoomPageAsHost}/>
        </div>);
        /* || (cookies.user_role ==='prof' && cookies.user_flag  === 'true') */
    }else if(cookies.user_role ==='general'){
        return(<div className = 'connecting_buttons_container'>
            <ConnectingButton buttonText = 'Join a meeting' 
            onClickHandler ={pushToJoinRoomPage}/>
        </div>);
    }else{
        return(<div className = 'connecting_buttons_container'>
            <ConnectingButton onClickHandler ={pushToJoinRoomError}/>
        </div>);
    }
};


export default withRouter(ConnectingButtons);