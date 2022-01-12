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

    // user_role = general && user_flag = true이면 승인 허가 기다리는 선생님
    // user_role = general && user_flag = false이면 학생
    // user_role = prof && user_flag = false이면 승인 허가된 선생님
    if (cookies.user_flag === 'false') {
        if (cookies.user_role === 'prof') {
            return(<div className = 'connecting_buttons_container'>
            <ConnectingButton buttonText = 'Create a class' 
            onClickHandler ={pushToJoinRoomPageAsHost}/>
            <ConnectingButton buttonText = 'My class'
            onClickHandler={pushToMyClass} />
            </div>);
        } else {
            return(<div className = 'connecting_buttons_container'>
            <ConnectingButton buttonText = 'Join a class' 
            onClickHandler ={pushToJoinRoomPage}/>
            </div>);
        }
    } else {
        return(<div className = 'connecting_buttons_container'>
        <ConnectingButton buttonText = 'Create a class' 
        onClickHandler ={pushToJoinRoomError}/>
        </div>);
    }
};


export default withRouter(ConnectingButtons);