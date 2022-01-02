import React from 'react';

const JoinRoomTitle = ({ isRoomHost}) => {
    const titleText = isRoomHost? '방 만들기' : '방 참여하기';
    
    return (
        <p className = 'join_room_title'>{titleText}</p>
    );
};

export default JoinRoomTitle;