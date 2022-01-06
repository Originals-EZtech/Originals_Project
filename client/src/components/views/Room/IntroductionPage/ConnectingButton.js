/* eslint-disable no-const-assign */
import cookieParser from 'cookie-parser';
import React from 'react';
import { useCookies } from "react-cookie";



const ConnectingButton = ({
    onClickHandler
}) => {
    const [cookies] = useCookies();

    if(cookies.user_role === 'prof'){
        return(
            <button className={'create_room_button'} onClick ={onClickHandler}>
                {'create_room_button'}
            </button>
        );
    }else{
        return(
            <button className={'join_room_button'} onClick ={onClickHandler}>
                {'join_room_button'}
            </button>
        );
    }
   


};
export default ConnectingButton;