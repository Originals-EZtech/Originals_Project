import React, { useEffect } from 'react';
import ChatSection from './ChatSection/ChatSection';
import ParticipantsSection from './ParticipantsSection/ParticipantsSection';
import VideoSection from './VideoSection/VideoSection';
import RoomLabel from './RoomLabel';
import {connect} from 'react-redux';
import * as webRTCHandler from '../utils/webRTCHandler';
import Overlay from './Overlay';
import Sttsection from './Stt/SttSection'
//import Dictaphone from './Stt/Dictaphone';
import { isBrowser ,  isMobile } from 'react-device-detect';
import './RoomPage.css';
import { useCookies } from "react-cookie";

const RoomPage = ({ roomId, identity, isRoomHost, showOverlay, connectOnlyWithAudio, roomNameValue }) => {
    const [cookies] = useCookies();
    const user_email = cookies.user_email;
    
    useEffect(() => {
        if(!isRoomHost && !roomId){
            const siteUrl = window.location.origin; // get current url
            window.location.href = siteUrl; // 현재 페이지에서 siteUrl 페이지로 이동     
        }else{
            webRTCHandler.getLocalPreviewAndInitRoomConnection(
                isRoomHost,
                identity,
                roomId,
                //showOverlay,
                connectOnlyWithAudio,
                user_email,
                roomNameValue
            );
        }
    }, []);

    
    return (
        <div className = 'room_container' >
           {isBrowser && <ParticipantsSection />}
           <VideoSection />
           {isBrowser && <ChatSection />} 
           <Sttsection />
           <RoomLabel roomId = {roomId} />
          {showOverlay && <Overlay />}
        </div>
    );
    
};

const mapStoreStateToProps = (state) =>{
    return {
        ...state,
    };
};

export default connect(mapStoreStateToProps)(RoomPage);