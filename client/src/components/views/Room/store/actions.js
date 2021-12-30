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
    SET_LOGIN_USER: "SET_LOGIN_USER",
    SET_REGISTER_USER: "SET_REGISTER_USER",
    SET_AUTH_EMAIL: "SET_AUTH_EMAIL",
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

  export const loginUser = async (loginData) => {
    const request = await axios.post('/api/users/login', loginData)
    const response = request.data;
    // console.log("axios로 서버에 보내는 값: ", loginData)
    // console.log('request', request);
    // console.log('response', response);
    return {
        type: Actions.SET_LOGIN_USER,
        response
    };
  };

  export const registerUser = async (registerData) => {
    const request = await axios.post('/api/users/register', registerData)
    const response = request.data;
    console.log(response);

    return {
        type: Actions.SET_REGISTER_USER,
        response
    };
  };

  // auth email 
  export const authEmail = async (dataTosubmit) => {
    const request = await axios.post('/api/users/emailauth', dataTosubmit)
    const response = request.data;
    console.log('dataTosubmit', dataTosubmit);
    console.log(request);
    console.log(response);

    return {
        type: Actions.SET_AUTH_EMAIL,
        response
    };
  };

// // auth token 
// export function auth() {
//   const request = axios.get('/api/users/auth') //endpoint로 get request, get이니까 login과 다르게 param x
//       .then(response => response.data)

//   return { //Action 끝내고 이제 Reducer로 보냄
//       type: AUTH_USER,
//       payload: request
//   };
// };

// export function logout() {
//   const request = axios.get('/api/users/logout')
//       .then(response => response.data)

//   return {
//       type: LOGOUT_USER,
//       payload: request
//   };
// };

  
export default Actions;