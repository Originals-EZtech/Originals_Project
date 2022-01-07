import React from 'react';

const JoinRoomTitle = ({ isRoomHost}) => {
    const titleText = isRoomHost? 'Create Class' : 'Join Class';
    
    return (
        <p className = 'join_room_title'>{titleText}</p>
    );
};

export default JoinRoomTitle;