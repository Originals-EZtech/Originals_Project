import cookieParser from 'cookie-parser';
import React from 'react';
import { useCookies } from "react-cookie";

const ConnectingButton = ({
    createRoomButton = false,
    buttonText,
    onClickHandler
}) => {
    const buttonClass = createRoomButton? 'create_room_button' : 'join_room_button';

    return(
        <button className={buttonClass} onClick ={onClickHandler}>
            {buttonText}
        </button>
    );
};
//삼항연산자? 쿠키에 user_role //// general이 학생 교사는 머였더라...음.....
export default ConnectingButton;