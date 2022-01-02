import React, { useState, useEffect } from 'react';
import DirectChatHeader from './DirectChatHeader';
import MessagesContainer from './MessagesContainer';
import NewMessage from './NewMessage';
import ConversationNotChosen from './ConversationNotChosen';
import { connect} from 'react-redux';

const getDirectChatHistory = (directChatHistory, socketId = null) =>{
    //console.log(directChatHistory);
    if(!socketId || !directChatHistory){
        return [];
    }
    const history = directChatHistory.find((h) => h.socketId=== socketId);
    //console.log(history);
    //console.log(socketId);
    return history ? history.ChatHistory : [];
};

const DirectChat = ({activeConversation, directChatHistory})=>{
    const [messages, setMessages] = useState([]);
    
    useEffect(()=>{
        setMessages(
            getDirectChatHistory(
                directChatHistory,
                activeConversation? activeConversation.socketId: null
            )
        );

    }, [activeConversation, directChatHistory]);
    //console.log(activeConversation);
    // 넘어간다!!!  
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
    return {
        ...state
    }
}

export default connect(mapStoreStateToProps)(DirectChat);
        

