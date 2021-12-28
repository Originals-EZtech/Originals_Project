import React from 'react';
import checkImg from '../resources/images/check.png';

const OnlyWithAudioCheckbox = ({connectOnlyWithAudio, setConnectOnlyWithAudio}) =>{
    const handleConnectionTypeChange = () =>{
        setConnectOnlyWithAudio(!connectOnlyWithAudio);
    };

    return (
        <div className = 'checkbox_container'>
            <div className = 'checkbox_connection' onClick={handleConnectionTypeChange}>
                {connectOnlyWithAudio && (
                <img className='checkbox_image' src ={checkImg}></img>
                )}
            </div>
            <p className='checkbox_container_paragraph'> Only audio </p>
        </div>
    );
};

export default OnlyWithAudioCheckbox;