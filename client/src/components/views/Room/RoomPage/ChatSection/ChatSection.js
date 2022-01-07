import React from 'react';
import ChatLabel from './ChatLabel';
import Messages from './Messages';
import NewMessage from './NewMessage';
import FileSharing from './FileSharing';

const ChatSection = () => {
    return (
        <div className ='chat_section_container'>
            <ChatLabel />
            <Messages />
            <FileSharing />
            <NewMessage />
        </div>
    );
};

export default ChatSection;