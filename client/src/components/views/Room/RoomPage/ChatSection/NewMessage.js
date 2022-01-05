import React, { useState } from "react";
import SendMessageButton from "../../resources/images/sendMessageButton.svg";
import fileSendingButton from "../../resources/images/fileSendingButton.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";

//export default class NewMessages extends Component{
//  constructor(){
//    super(props);
//    this.state = {
//     message: '',
//      file: null
//    }
//  }
//}

const NewMessage = () => {
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

  const sendFile = () =>{
    const file = document.getElementById('fileItem');
    if(file.files.length > 0){
      console.log(file.files[0]); 
    
      webRTCHandler.sendFileUsingDataChannel(file.files[0]);
    }
  }

  return (
    <div className="new_message_container">
      <input
        className="new_message_input"
        value={message}
        onChange={handleTextChange}
        placeholder="Type your message ..."
        type="text"
        onKeyDown={handleKeyPressed}
      />
      <img
        className="new_message_button"
        src={SendMessageButton}
        onClick={sendMessage}
      />
      <label className = 'file_container'>
      <input 
      id ='fileItem' 
      type='file' 
      onClick={sendFile}
      style={{display: 'none'}}/> 
      <img 
      className="file_sending_button"
      src={fileSendingButton}
      />
      </label>  
    </div>
  );
};

export default NewMessage;
