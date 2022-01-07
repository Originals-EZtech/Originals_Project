import React from 'react';
import ConnectingButton from './ConnectingButton';
import { withRouter, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCookies } from "react-cookie";

const ConnectingButtons = (props) => {
    const [cookies] = useCookies();
<<<<<<< HEAD
    const isProf = (cookies.user_role === 'general') ? true : false;
=======
>>>>>>> 310ef8f87dd6b469460b485d86b110492c57250c
    // console.log(isProf);
  
    const pushToJoinRoomPage = () => {
        props.history.push('/join-room');
    }
    const pushToJoinRoomPageAsHost =() =>{
        props.history.push('/join-room?host=true');
    }

    const pushToMyClass = () => {
        props.history.push('/myclass');
    }

    if(cookies.user_role ==='prof' && cookies.user_flag ==='false'){
        return(<div className = 'connecting_buttons_container'>
            <ConnectingButton createRoomButton buttonText = 'Host a meeting' 
            onClickHandler ={pushToJoinRoomPage}/>
        </div>);
    }else{
        return(<div className = 'connecting_buttons_container'>
            <ConnectingButton buttonText = 'Join a meeting' 
            onClickHandler ={pushToJoinRoomPageAsHost}/>
        </div>);
    }
};


export default withRouter(ConnectingButtons);