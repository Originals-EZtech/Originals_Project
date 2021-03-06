import React, { useState, useEffect } from 'react';
import DirectChatHeader from './DirectChatHeader';
import MessagesContainer from './MessagesContainer';
import NewMessage from './NewMessage';
import ConversationNotChosen from './ConversationNotChosen';
import { connect} from 'react-redux';


const getDirectChatHistory = (directChatHistory, socketId = null) =>{
    if(!socketId || !directChatHistory){
        return [];
    }
    const history = directChatHistory.find((h) => h.socketId=== socketId);
    return history ? history.ChatHistory : [];
};

const DirectChat = ({activeConversation, directChatHistory, socketId, checkMessage})=>{
    const [messages, setMessages] = useState([]);
    //console.log( document.getElementsByClassName('author_direct_message').length); // author 측에서 message 길이 뜬다. length-1 길이
    console.log(socketId);
    console.log(checkMessage);
    useEffect(()=>{
        setMessages(
            getDirectChatHistory(
                directChatHistory,
                activeConversation? activeConversation.socketId: null
            )
        );

    }, [activeConversation, directChatHistory]);

    return(
        <div className='direct_chat_container'>
            <DirectChatHeader activeConversation={activeConversation} />
            <MessagesContainer messages = {messages} />
            <NewMessage />
            {!activeConversation && <ConversationNotChosen />}
        </div>
    );
};

const mapStoreStateToProps = (state) =>{
    console.log(state);
    return {
        ...state
    }
}

export default connect(mapStoreStateToProps)(DirectChat);
        

