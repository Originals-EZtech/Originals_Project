import axios from 'axios';
const Actions ={
    SET_IS_ROOM_HOST: 'SET_IS_ROOM_HOST',
    SET_CONNECT_ONLY_WITH_AUDIO: "SET_CONENCT_ONLY_WITH_AUDIO",
    SET_IDENTITY: 'SET_IDENTITY',
    SET_ROOM_ID: 'SET_ROOM_ID',
    SET_SHOW_OVERLAY: 'SET_SHOW_OVERLAY',
    SET_PARTICIPANTS: 'SET_PARTICIPANTS',
    SET_MESSAGES: "SET_MESSAGES",
    SET_ACTIVE_CONVERSATION: "SET_ACTIVE_CONVERSATION",
    SET_DIRECT_CHAT_HISTORY: "SET_DIRECT_CHAT_HISTORY",
    SET_SOCKET_ID: "SET_SOCKET_ID",
    SET_LOGIN_USER: "SET_LOGIN_USER"
};

export const setIsRoomHost = (isRoomHost) => {
    return {
        type: Actions.SET_IS_ROOM_HOST,
        isRoomHost
    };
};

export const setConnectOnlyWithAudio = (onlyWithAudio)=>{
    return {
        type: Actions.SET_CONNECT_ONLY_WITH_AUDIO,
        onlyWithAudio,
    };
};

export const setIdentity = (identity) =>{
    return {
        type: Actions.SET_IDENTITY,
        identity
    }
}

export const setRoomId = (roomId) => {
    return {
        type: Actions.SET_ROOM_ID,
        roomId,
    }
}

export const setShowOverlay = (showOverlay) =>{
    return {
        type: Actions.SET_SHOW_OVERLAY,
        showOverlay,
    };
};
export const setParticipants = (participants) => {
    return {
        type: Actions.SET_PARTICIPANTS,
        participants,
    };
};

export const setMessages = (messages) => {
    return {
      type: Actions.SET_MESSAGES,
      messages,
    };
  };
  
  export const setActiveConversation = (activeConversation)=>{
    return{
      type: Actions.SET_ACTIVE_CONVERSATION,
      activeConversation,
    };
  };
  
  export const setDirectChatHistory = (directChatHistory)=>{
    return{
      type: Actions.SET_DIRECT_CHAT_HISTORY,
      directChatHistory,
    };
  };
  
  export const setSocketId = (socketId) =>{
    return{
      type: Actions.SET_SOCKET_ID,
      socketId,
    };
  };

  export function loginUser(dataTosubmit) {
    const request = axios.post('/api/users/login', dataTosubmit)
        .then((response) => 
        { 
          console.log("console.log(response)",response)
          // response.data
        })
        .catch((error)=>{
          console.log("console.log(error);",error);
        })
        
        console.log("axios로 서버에 보내는 값: ",dataTosubmit)
        console.log("request 값 ??? ",request)

    return {
        type: Actions.SET_LOGIN_USER,
        dataTosubmit
    }
}
  
export default Actions;