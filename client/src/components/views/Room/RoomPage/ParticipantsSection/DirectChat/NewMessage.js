import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setCheckMessageSign } from '../../../../../../redux/actions/actions';
import store from '../../../../../../redux/store/store';
import sendMessageButton from '../../../resources/images/sendMessageButton.svg';
import * as wss from '../../../utils/wss';


const NewMessage = ({activeConversation, identity})=>{
    const [message, setMessage] = useState('');

    const sendMessage = ()=>{
        //console.log(checkMessageSign);
        //store.dispatch(setCheckMessageSign(true))
        //const {checkMessageSign} = store.getState()
        //store.dispatch(setCheckMessageSign(true));
        if(message.length >0){
            wss.sendDirectMessage({
                receiverSocketId: activeConversation.socketId,
                identity: identity,
                messageContent: message,
            });
            setMessage('');
        }
      
    };

    const handleTextChange = (event)=>{
<<<<<<< HEAD
        //console.log(event.target.value);
        store.dispatch(setCheckMessageSign(false));
=======
>>>>>>> 691781935d57eedc96b3a7ac2f5fed9e99f7c48f
        setMessage(event.target.value);
    }

    const handleKeyPressed = (event) =>{
        if (event.key === 'Enter' && message.length >0 ){
            event.preventDefault();
            sendMessage();
        }
    }
    return (
        
        <div className= 'new_message_container new_message_direct_border'>
            <input
                className='new_message_input'
                value = {message}
                onChange={handleTextChange}
                placeholder='Type your message...'
                type = 'text'
                onKeyDown={handleKeyPressed}
            />
            <img
                className='new_message_button'
                src = {sendMessageButton}
                onClick={sendMessage}
                alt=''
            />
        </div>
    );
};

const mapStoreStateToProps = (state) =>{
    return {
        ...state
    }
}

export default connect(mapStoreStateToProps)(NewMessage);