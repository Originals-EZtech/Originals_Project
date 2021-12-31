import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';//stt라이브러리

import onbut from '../../resources/images/stt_on_icon.svg';
import offbut from '../../resources/images/stt_off_icon.svg';
const Dictaphone = () => {
    const [now,setnow]= useState(false);
    const {
      transcript,
      listening,
      finalTranscript,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
    const start=()=>{
      setnow(now => !now);
      SpeechRecognition.startListening({ continuous: {now},language: 'ko' });
      console.log("시작");
      
    }
    
    const stop=()=>{
      setnow(now => !now);
      SpeechRecognition.abortListening();
      resetTranscript();
    }
     
    if (transcript.length>100) {
      resetTranscript();
    }
    return(
        <div>
          <img
          className="sttb"
          onClick={start} 
          src={now ? null:offbut}>
          </img>
          <img
          className="sttb"
          onClick={stop} 
          src={!now ? null:onbut}>
          </img>
          <p className="sttc">{transcript}</p>
        </div>
     );
    
  };
  
 export default Dictaphone;