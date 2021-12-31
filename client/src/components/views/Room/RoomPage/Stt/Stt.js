import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';//stt라이브러리
import Stt_li from './Stt_middle';
const Dictaphone = () => {
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
    
    //SpeechRecognition.startListening({ continuous: true,language: 'ko' }); 
    if (transcript.length>70){
      resetTranscript();
    }
    return(
      <div>
        <Stt_li props={transcript}/>
      </div>
      

      
      
      
    );
  };
  
 export default Dictaphone;