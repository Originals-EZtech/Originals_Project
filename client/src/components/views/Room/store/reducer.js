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
    payload: {loginSuccess:"", msg: ""},
    dataTosubmit:{},
    userTotal:1
};

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
            // console.log("payload", action.response)
            return {
                ...state, 
                loginSuccess: action.response.loginSuccess
            };
        case Actions.SET_REGISTER_USER:
            return {
                ...state,
                success:action.response.success
            }
        case Actions.SET_AUTH_EMAIL:
            return {
                ...state,
            }
        case Actions.SET_AUTH_USER:
            return {
                ...state,
            }
        case Actions.SET_LOGOUT_USER:
            return {
                ...state,
            }
        case Actions.SET_TOTAL_USER:
            return {
                ...state,
                userTotal:action.userTotal
            }
        default:
            return state;
    }
}

export default reducer;