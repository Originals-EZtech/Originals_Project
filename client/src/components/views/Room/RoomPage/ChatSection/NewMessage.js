import React, { useState } from "react";
import SendMessageButton from "../../resources/images/sendMessageButton.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";
import {connect} from 'react-redux';

const NewMessage = ({disabled}) => {
  const [message, setMessage] = useState("");

  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      // send message to other users
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (message.length > 0) {
      webRTCHandler.sendMessageUsingDataChannel(message);
      setMessage("");
    }
  };




  /*
  const readTextFile = (file, callback)=>{
    const reader = new FileReader(); // FileReader 객체 생성
    reader.onload = ()=>{ // onload 이벤트 처리기 정의
      callback(reader.result) // 읽어 들인 텍스트를 callback에 전달
    };
    reader.onerror = (e) =>{
      console.log("error", e) //로그로 남기기
    }
    reader.readAsText(file); // 파일의 데이터를 읽어들인다. 
  }
*/
  return (
    <div className="new_message_container">
      <input
        className="new_message_input"
        value={message}
        onChange={handleTextChange}
        placeholder="Type your message ..."
        type="text"
        onKeyDown={handleKeyPressed}
        disabled ={disabled}
      />
      <img
        className="new_message_button"
        src={SendMessageButton}
        onClick={sendMessage}
      />

      
    </div>
  );

};

const mapStoreStateToProps = (state) =>{
  return {
      ...state,
  };
};

export default connect(mapStoreStateToProps)(NewMessage);
