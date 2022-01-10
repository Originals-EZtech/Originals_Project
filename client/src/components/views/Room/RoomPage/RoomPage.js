/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import ChatSection from './ChatSection/ChatSection';
import ParticipantsSection from './ParticipantsSection/ParticipantsSection';
import VideoSection from './VideoSection/VideoSection';
import RoomLabel from './RoomLabel';
import {connect} from 'react-redux';
import * as webRTCHandler from '../utils/webRTCHandler';
import Overlay from './Overlay';
import Sttsection from './Stt/SttSection'
import { isBrowser } from 'react-device-detect';
import './RoomPage.css';
import { useCookies } from "react-cookie";
import {setActiveChat} from '../../../../redux/actions/actions';
import store from '../../../../redux/store/store';

const RoomPage = ({ roomId, identity, isRoomHost, showOverlay, connectOnlyWithAudio, roomNameValue, myRoomId }) => {
    const [cookies] = useCookies();
    const user_seq = cookies.user_seq;
    console.log("RoomPage roomId::: "+roomId )
    console.log("RoomPage myRoomId:::"+myRoomId)
    const {activeChat} = store.getState()

    window.onpopstate = function () {
        window.history.go(1);
        store.dispatch(setActiveChat('yes'))
    };
    /**
     1) host
     else --> 뒤로가기 --> yes --> 
     2) 참여자 
    if =--> 뒤로가기 --> yes -->
     */
    useEffect(() => {
        if(!isRoomHost && !roomId){
            const siteUrl = window.location.origin; // get current url
            window.location.href = siteUrl; // 현재 페이지에서 siteUrl 페이지로 이동  
        }else{
            if(activeChat === ''){
                webRTCHandler.getLocalPreviewAndInitRoomConnection(
                    isRoomHost,
                    identity,
                    roomId,
                    connectOnlyWithAudio,
                    user_seq,
                    roomNameValue,
                    myRoomId
                );
            }else{
                console.log(isRoomHost);
                console.log(activeChat);
                store.dispatch(setActiveChat(''));
            }
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