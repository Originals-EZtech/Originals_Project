/* eslint-disable no-const-assign */
import React from 'react';
import { useCookies } from "react-cookie";

const ConnectingButton = ({ onClickHandler, buttonText }) => {
    const [cookies] = useCookies();

    if(cookies.user_role === 'prof'){
        return(
            <button className={'create_room_button'} onClick ={onClickHandler}>
                {buttonText}
            </button>
        );
    }else{
        return(
            <button className={'join_room_button'} onClick ={onClickHandler}>
                {buttonText}
            </button>
        );
    }
};

export default ConnectingButton;