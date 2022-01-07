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
    const {
      transcript,
      listening,
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
      //console.log(transcript);
      setnow(now => !now);
      SpeechRecognition.abortListening();
      resetTranscript();
    }
    
    if (transcript.length>100 ) {
      resetTranscript();
    }

    const sendToAll = (transcript)=>{
      //const users = participants.filter(participant => participant.socketId !== socketId);
      //console.log(socketId);
      //console.log(participants);
      if(now === true){
        wss.sendSTT({
          socketId,
          transcript
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
          alt="">
          </img>
          <img
          className="sttb"
          onClick={stop} 
          src={!now ? null:onbut}
          alt="">
          </img>
          <div className="te">
            <p className="sttc">{transcript}</p>
            {sendToAll(transcript)}
          </div>
          <h3>{cookies.user_role}</h3>
        </div>
     );
    }

  };
  
  const mapStoreStateToProps = (state) =>{
    //console.log(state);
    return {
        ...state
    }
}

 export default connect(mapStoreStateToProps)(Dictaphone);