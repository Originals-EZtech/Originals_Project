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
//props 부분 지식과 true, false 이외의 값이 전달됐을때 오류메세지 던져주기
const JoinRoomButtons = ({handleJoinRoom, isRoomHost, history}) => {
    const successButtonText = isRoomHost ? 'Create' : 'Join';
    
    const pushToIntroductionPage = () => {
        history.push('/intro');
    };

    return (
        <div className='join_room_buttons_container'>
            <Button
            buttonText = {successButtonText}
            onClickHandler={handleJoinRoom} 
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