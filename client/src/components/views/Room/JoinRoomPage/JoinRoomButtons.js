import React from 'react';
import { withRouter } from 'react-router-dom';

const Button = ({ buttonText, cancelButton = false, onClickHandler }) =>{
    const buttonClass = cancelButton? 'join_room_cancel_button' : 'join_room_success_button';


    return (
        <button onClick={onClickHandler} className={buttonClass}>
            {buttonText}
        </button>
);
};
const JoinRoomButtons = (props, {handleJoinRoom, isRoomHost}) => {
    const successButtonText = isRoomHost ? 'Host' : 'Join';

    const pushToIntroductionPage = () => {
        props.history.push('/intro');
    };
   // console.log(props);
    //console.log(handleJoinRoom);
    return (
        <div className='join_room_buttons_container'>
            <Button
            buttonText = {successButtonText}
            onClickHandler={props.handleJoinRoom} 
            />
            <Button
            buttonText = 'Cancel'
            cancelButton
            onClickHandler={pushToIntroductionPage}
            />
        </div>
    );
};

export default withRouter(JoinRoomButtons);