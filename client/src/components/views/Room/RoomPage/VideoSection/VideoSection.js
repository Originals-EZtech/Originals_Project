import React from 'react';
import VideoButtons from './VideoButtons';
import { useCookies } from "react-cookie";
import TeacherVideoButton from './TeacherVideoButton';


const VideoSection = () => 
{
    const [cookies] = useCookies();
    if (cookies.user_role === 'prof') 
    {
        <div className='prof_video_section_container'>
            <TeacherVideoButton />
        </div>
    } else 
    {
        return (
            <div className='general_video_section_container'>
                <VideoButtons />
            </div>
        );
    }



};

export default VideoSection;