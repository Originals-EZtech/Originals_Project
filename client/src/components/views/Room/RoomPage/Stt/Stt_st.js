import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';//stt라이브러리
import Dictaphone from './Stt';

const St =()=>{
    const sts=SpeechRecognition.startListening({continuous: true, language: 'ko'})
    return(
        <Dictaphone order={sts}/>
    );
}

export default St