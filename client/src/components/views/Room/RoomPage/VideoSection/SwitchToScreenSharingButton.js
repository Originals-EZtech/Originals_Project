import React, {useState} from 'react';
import shar from '../../resources/images/shar.svg';
import sharin from '../../resources/images/sharin.svg';
import LocalScreenSharingPreview from './LocalScreanSharingPreview';
import * as webRTCHandler from '../../utils/webRTCHandler';

const constraints = {
    audio: false,
    video: true,
};

const SwitchToScreenSharingButton = () =>{
    const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
    const [screenSharingStream, setScreenSharingStream] = useState(null);
    
    
    const handleScreenShareToggle = async() =>{
        if(!isScreenSharingActive){
            let stream = null;
            try{
                stream = await navigator.mediaDevices.getDisplayMedia(constraints);
            }catch(err){
                console.log('err occured when trying to get an access to screen share stream');
            }
            if(stream){
                setScreenSharingStream(stream);

                webRTCHandler.toggleScreenShare(isScreenSharingActive, stream);
                setIsScreenSharingActive(true);
                // execute here function to switch the video track which we are sending to other users
            }
        }else{
            // switch for video track from camera
            webRTCHandler.toggleScreenShare(isScreenSharingActive);
            setIsScreenSharingActive(false);

            //stop screen sharing stream
            screenSharingStream.getTracks().forEach(t => t.stop());
            setScreenSharingStream(null);
        }

        //setIsScreenSharingActive(!isScreenSharingActive);
    
};
    return(
        <>
        <div className = 'video_shar'>
            <img
            src = {isScreenSharingActive ? sharin:shar}
            onClick={handleScreenShareToggle}
            className='video_button_image'
            alt=""
            />
        </div>
        {isScreenSharingActive && (
            <LocalScreenSharingPreview stream = {screenSharingStream} />
        )}
        </>
    );
};

export default SwitchToScreenSharingButton;