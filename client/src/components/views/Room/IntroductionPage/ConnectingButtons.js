import React from 'react';
import ConnectingButton from './ConnectingButton';
import { withRouter, Link } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';

import { useCookies } from "react-cookie";

const ConnectingButtons = (props) => {
<<<<<<< HEAD
    const [cookies] = useCookies();
=======
    const cookies = new Cookies();
    const isProf = (cookies.get('user_role') === 'prof') ? true : false;
    // console.log(isProf);
>>>>>>> c0d8f610d8d11bbf9df1c4862afe2acdbe8e4f1b

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

    if(cookies.user_role==='prof'){
        return(<div className = 'connecting_buttons_container'>
            <ConnectingButton createRoomButton buttonText = 'Host a meeting' 
            onClickHandler ={pushToJoinRoomPageAsHost}/>
        </div>);
    }else{
        return(<div className = 'connecting_buttons_container'>
            <ConnectingButton buttonText = 'Join a meeting' 
            onClickHandler ={pushToJoinRoomPage}/>
        </div>);
    }
};


export default withRouter(ConnectingButtons);