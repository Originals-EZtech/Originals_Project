import React from 'react';
import MicButton from './MicButton';
import CameraButton from './CameraButton';
import LeaveRoomButton from './LeaveRoomButton';
import SwitchToScreenSharingButton from './SwitchToScreenSharingButton';
import {connect} from 'react-redux';
import { isBrowser ,  isMobile } from 'react-device-detect';
const VideoButtons = (props) =>{
    const { connectOnlyWithAudio} = props;

    if(isMobile){
        return(
            <div className ='video_buttons_container'>
                <LeaveRoomButton />
                
            </div>
            
        );
    }
    return (
        <div className ='video_buttons_container'>
            <MicButton />
            {!connectOnlyWithAudio && <CameraButton />}
            <LeaveRoomButton />
            {!connectOnlyWithAudio && <SwitchToScreenSharingButton /> }
            
        </div>
  );
};

const mapStoreStateToProps = (state)=> {
    return{
        ...state
   };
}

export default connect(mapStoreStateToProps)(VideoButtons);