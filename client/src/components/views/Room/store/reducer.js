import Actions from './actions';

const initState = {
    identity: '',
    isRoomHost: false,
    connectOnlyWithAudio: false,
    roomId: null,
    showOverlay: true,
    participants: [],
    messages: [],
    fileDatas: [],
    activeConversation: null,
    directChatHistory: [],
    socketId: null,
    word: "",
    open: false, // dashboard 페이지 화면 축소 상태일 때 side bar 작동하기 위해 필요
<<<<<<< HEAD
    roomNameValue: ""
=======
    disabled: false,
    fileName : '',
    gotFile: false,
>>>>>>> 7cedea10f97db192bd337bcf190e38b248c3d077
};

// reducer는 state의 상태를 변화시켜주는 함수
const reducer = (state = initState, action) => {
    switch (action.type) {
        
        case Actions.SET_IS_ROOM_HOST:
            return {
                ...state,
                isRoomHost: action.isRoomHost,
            };
        case Actions.SET_CONNECT_ONLY_WITH_AUDIO:
            return {
                ...state,
                connectOnlyWithAudio: action.onlyWithAudio,
            };
        case Actions.SET_ROOM_ID:
            return {
                ...state,
                roomId: action.roomId
            };
        case Actions.SET_IDENTITY:
            return {
                ...state,
                identity: action.identity
            };
        case Actions.SET_SHOW_OVERLAY:
            return {
                ...state,
                showOverlay: action.showOverlay,
            };
        case Actions.SET_PARTICIPANTS:
            return {
                ...state,
                participants: action.participants
            };
        case Actions.SET_MESSAGES:
            return {
                ...state,
                messages: action.messages,
            };
        case Actions.SET_FILEDATAS:
            return{
                ...state,
                fileDatas: action.fileDatas
            }
        case Actions.SET_ACTIVE_CONVERSATION:
            return {
                ...state,
                activeConversation: action.activeConversation
            };
        case Actions.SET_DIRECT_CHAT_HISTORY:
            return {
                ...state,
                directChatHistory: action.directChatHistory
            };
        case Actions.SET_SOCKET_ID:
            return {
                ...state,
                socketId: action.socketId
            };
        case Actions.SET_LOGIN_USER:
            return {
                ...state, 
                loginSuccess: action.response.loginSuccess
            };
        case Actions.SET_REGISTER_USER:
            return {
                ...state,
                success:action.response.success
            };
        case Actions.SET_AUTH_EMAIL:
            return {
                ...state,
            };
        case Actions.SET_AUTH_USER:
            return {
                ...state,
            };
        case Actions.SET_LOGOUT_USER:
            return {
                ...state,
            }
        case Actions.SET_FILE_UPLOAD:
            return{
                ...state,
                uploadSuccess: action.response.uploadSuccess
            }
        case Actions.SET_WORD:
            return{
                ...state,
                word: action.word
            };
        case Actions.SET_SIDE_OPEN:
            return{
                ...state,
                open: action.open
            };
        case Actions.SET_DISABLED:
            return{
                ...state,
                disabled: action.disabled
            };
        case Actions.SET_FILENAME:
            return{
                ...state,
                fileName: action.fileName
            };
        case Actions.SET_GOTFILED:
            return{
                ...state,
                gotFile: action.gotFile
            };
        case Actions.SET_ROOMNAMEVALUE:
            return{
                ...state,
                roomNameValue: action.roomNameValue
            };
        default:
            return state;
    }
}

export default reducer;