import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Button = ({ buttonText, cancelButton = false, onClickHandler }) =>{
    const buttonClass = cancelButton? 'join_room_cancel_button' : 'join_room_success_button';


    return (
        <button onClick={onClickHandler} className={buttonClass}>
            {buttonText}
        </button>
);
};
//props 부분 지식과 true, false 이외의 값이 전달됐을때 오류메세지 던져주기
const JoinRoomButtons = (props) => {
    const successButtonText = props.isRoomHost ? 'Host' : 'Join';
    
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
            <Link to ="/intro" >버튼동작</Link>
            <Button
            buttonText = 'Cancel'
            cancelButton
            onClickHandler={pushToIntroductionPage}
            />
        </div>
    );
};

export default withRouter(JoinRoomButtons);