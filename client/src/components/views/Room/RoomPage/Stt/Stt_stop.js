import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';//stt라이브러리
import Dictaphone from './Stt';

const St_stop=()=>{
    const stt_stop=SpeechRecognition.abortListening();
    return(
        <Dictaphone props={stt_stop} />
    );

}
export default St_stop;