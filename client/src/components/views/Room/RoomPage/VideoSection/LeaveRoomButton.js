import React from 'react';

const LeaveRoomButton = () =>{
    // this logic will allow us to redirect to that first page, introduction page
    const handleRoomDisconnection = () =>{
        const siteUrl = window.location.origin; // get current url
        window.location.href = siteUrl; // 현재 페이지에서 siteUrl 페이지로 이동 
    }
    
    return <div className='video_button_container'>
        <button className='video_button_end' onClick={handleRoomDisconnection}>
            Leave Room
        </button>
    </div>
};

export default LeaveRoomButton;