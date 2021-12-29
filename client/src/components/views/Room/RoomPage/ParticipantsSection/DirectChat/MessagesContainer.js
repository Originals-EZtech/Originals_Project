import React from 'react';

const SingleMessage = ({messageContent, isAuthor}) =>{
    console.log(isAuthor);
    console.log(messageContent);
    const messageStyling = isAuthor
    ? 'author_direct_message'
    :'receiver_direct_message'; 

    const containerStyling = isAuthor
    ?'direct_message_container_author' 
    : 'direct_message_container_receiver';

    return (
        <div className= {containerStyling}>
            <p className={messageStyling}>{messageContent}</p>
        </div>
    )
};

const MessagesContainer = ({messages}) =>{
    console.log(messages);
    // messages 값 전달된다!! 
    // return을 못하는 듯.. 왜 why?
        return (
            <div className='direct_messages_container'>
                {messages.map((message) => {
                    return(                        
                    <SingleMessage
                        messageContent = {message.messageContent}
                        isAuthor ={message.isAuthor}
                        key = {`${message.messageContent} - ${message.identity}`}
                    />);

                })}
            </div>
        );

};

export default MessagesContainer;