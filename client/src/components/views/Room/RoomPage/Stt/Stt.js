import React, { useState } from 'react';
import { connect } from 'react-redux';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';//stt라이브러리
import * as wss from './../../utils/wss';
import {useCookies} from "react-cookie";
import onbut from '../../resources/images/stt_on_icon.svg';
import offbut from '../../resources/images/stt_off_icon.svg';
import Stt from './Sttand';


const Dictaphone = ({socketId}) => {
    const [now,setnow]= useState(false);
    const [cookies]=useCookies();
    const reset="";
    const {
      transcript,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
    const start=()=>{
      setnow(true);
      SpeechRecognition.startListening({ continuous: {now},language: 'ko' });
      console.log("시작");
    }
    
    const stop=()=>{
      setnow(false);
      
      SpeechRecognition.abortListening();
      resetTranscript();
      console.log('정지');
      
    }
    console.log(now);
    if (transcript.length>100 ) {
      resetTranscript();
    }

    const sendToAll = (transcript)=>{
      //const users = participants.filter(participant => participant.socketId !== socketId);
      if(now === true){
        wss.sendSTT({
          socketId,
          transcript
        })
      }
      if(now === false){
        wss.sendSTT({
          socketId,
          reset
        })
      }
     
    }   
    if(cookies.user_role ==='general'){
      return(
        <Stt />
      );
    }
    else{
      return(
        <div>
          <img
          className="sttb"
          onClick={start} 
          src={now ? null:offbut}
          >
          </img>
          <img
          className="sttb"
          onClick={stop} 
          src={!now ? null:onbut}
          >
          </img>
          <div className="te">
            <p className="sttc">{transcript}</p>
            {sendToAll(transcript)}
          </div>
          
        </div>
     );
    }

  };
  
  const mapStoreStateToProps = (state) =>{
    return {
        ...state
    }
}

 export default connect(mapStoreStateToProps)(Dictaphone);