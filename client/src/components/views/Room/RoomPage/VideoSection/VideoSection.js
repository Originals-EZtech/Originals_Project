import React from 'react';
import VideoButtons from './VideoButtons';
import { useCookies } from "react-cookie";


const VideoSection = () => 
{
        return (
            <div className='general_video_section_container'>
                <VideoButtons />
            </div>
        );

};

export default VideoSection;