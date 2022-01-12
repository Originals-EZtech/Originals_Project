import axios from 'axios';
const Actions ={
    SET_IS_ROOM_HOST: 'SET_IS_ROOM_HOST',
    SET_CONNECT_ONLY_WITH_AUDIO: "SET_CONENCT_ONLY_WITH_AUDIO",
    SET_IDENTITY: 'SET_IDENTITY',
    SET_ROOM_ID: 'SET_ROOM_ID',
    SET_SHOW_OVERLAY: 'SET_SHOW_OVERLAY',
    SET_PARTICIPANTS: 'SET_PARTICIPANTS',
    SET_MESSAGES: "SET_MESSAGES",
    SET_FILEDATAS: "SET_FILEDATAS",
    SET_ACTIVE_CONVERSATION: "SET_ACTIVE_CONVERSATION",
    SET_DIRECT_CHAT_HISTORY: "SET_DIRECT_CHAT_HISTORY",
    SET_SOCKET_ID: "SET_SOCKET_ID",
    SET_LOGIN_USER: "SET_LOGIN_USER",
    SET_REGISTER_USER: "SET_REGISTER_USER",
    SET_AUTH_EMAIL: "SET_AUTH_EMAIL",
    SET_AUTH_USER: "SET_AUTH_USER",
    SET_LOGOUT_USER: "SET_LOGOUT_USER",
    SET_FILE_UPLOAD: "SET_FILE_UPLOAD",
    SET_TOTAL_USER:"SET_TOTAL_USER",
    SET_WORD:"SET_WORD",
    SET_SIDE_OPEN:"SET_SIDE_OPEN",
    SET_DISABLED: "SET_DISABLED",
    SET_FILENAME: "SET_FILENAME",
    SET_GOTFILE: "SET_GOTFILE",
    SET_ROOMNAMEVALUE:"SET_ROOMNAMEVALUE",
    SET_MYROOMID:"SET_MYROOMID",
    SET_ACTIVE_CHAT: "SET_ACTIVE_CHAT",
    SET_CHECK_MESSAGE:"SET_CHECK_MESSAGE",
    SET_CHECK_MESSAGE_SIGN: "SET_CHECK_MESSAGE_SIGN"
};

export const setIsRoomHost = (isRoomHost) => {
    return {
        type: Actions.SET_IS_ROOM_HOST,
        isRoomHost
    };
};

export const setActiveChat = (activeChat) =>{
    return {
        type: Actions.SET_ACTIVE_CHAT,
        activeChat
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
    }
}

export const setParticipants = (participants) => {
    return {
        type: Actions.SET_PARTICIPANTS,
        participants,
    }
}

export const setMessages = (messages) => {
    return {
      type: Actions.SET_MESSAGES,
      messages,
    }
}

export const setFileDatas = (fileDatas) =>{
    return {
        type: Actions.SET_FILEDATAS,
        fileDatas
    }
}

export const setActiveConversation = (activeConversation)=>{
    return{
      type: Actions.SET_ACTIVE_CONVERSATION,
      activeConversation,
    }
}
  
export const setDirectChatHistory = (directChatHistory)=>{
    return{
      type: Actions.SET_DIRECT_CHAT_HISTORY,
      directChatHistory,
    }
}
  
export const setSocketId = (socketId) =>{
    return{
      type: Actions.SET_SOCKET_ID,
      socketId,
    }
}


export const sttword = (word) =>{
    return{
        type: Actions.SET_WORD,
        word,
    }   
}

// 로그인
export const loginUser = async (loginData) => {
    const request = await axios.post('/api/users/login', loginData)
    const response = request.data;
    return {
        type: Actions.SET_LOGIN_USER,
        response
    }
}

  // 회원가입
export const registerUser = async (registerData) => {
    const request = await axios.post('/api/users/register', registerData)
    const response = request.data;

    return {
        type: Actions.SET_REGISTER_USER,
        response
    }
}

// auth email (이메일 인증)
export const authEmail = async (dataTosubmit) => {
    const request = await axios.post('/api/users/emailauth', dataTosubmit)
    const response = request.data;

    return {
        type: Actions.SET_AUTH_EMAIL,
        response
    }
}

// auth token (토큰 인증)
export const auth = async () => {
    const request = await axios.get('/api/auth/auth') 
    const response = request.data;

    return { 
        type: Actions.SET_AUTH_USER,
        response
    }
}

// 로그아웃
export const logout = async () => {
    const request = await axios.get('/api/auth/logout')
    const response = request.data;

    return {
        type: Actions.SET_LOGOUT_USER,
        response
    }
}

// 파일첨부
export const fileUpload = async (fileData) => {
    const url = "/api/users/imgUpload";
    const formData = new FormData();
    formData.append('email', fileData.email);
    formData.append('image', fileData.image);

    const config = {
        headers: {
            'content-type' : 'multipart/form-data'
        }
    }
    const request = await axios.post(url, formData, config);
    const response = request.data;


    return {
        type: Actions.SET_FILE_UPLOAD,
        response
    }
}

export const sideOpen = (open) => {
    return{
        type: Actions.SET_SIDE_OPEN,
        open,
      }
}

export const setDisabled = (disabled) =>{
    return {
        type: Actions.SET_DISABLED,
        disabled,
    }
}

export const setFileName = (fileName)=>{
    return {
        type: Actions.SET_FILENAME,
        fileName
    }
}

export const setGotFile = (gotFile)=>{
    return{
        type: Actions.SET_GOTFILE,
        gotFile
    }
}

export const setRoomNameValue = (roomNameValue) => {
    return {
        type: Actions.SET_ROOMNAMEVALUE,
        roomNameValue,
    }
}

export const setMyRoomId = (myRoomId) => {
    return {
        type: Actions.SET_MYROOMID,
        myRoomId,
    }
}

export const setCheckMessage = (checkMessage) =>{
    return {
        type: Actions.SET_CHECK_MESSAGE,
        checkMessage,
    }
}

export const setCheckMessageSign = (checkMessageSign) =>{
    return{
        type: Actions.SET_CHECK_MESSAGE_SIGN,
        checkMessageSign
    }
}


  
export default Actions;