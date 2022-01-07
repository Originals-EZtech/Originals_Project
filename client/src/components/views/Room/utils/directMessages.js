import { setDirectChatHistory } from "../../../../redux/actions/actions";
import store from "../../../../redux/store/store";

export const appendNewMessageToChatHistory = (data) =>{
    const {isAuthor, receiverSocketId, authorSocketId} = data;
    //console.log(data);
    if (isAuthor){
        appendMessageToChatHistory(receiverSocketId, data);
    }else{
        appendMessageToChatHistory(authorSocketId, data);
    }
};

const appendMessageToChatHistory = (userSocketId, data) =>{
    const chatHistory = [...store.getState().directChatHistory];
    //console.log(chatHistory);
    const userChatHistory = chatHistory.find(h => h.socketId === userSocketId);
    //console.log(userChatHistory);
    if(userChatHistory) {
        const newDirectMessage = {
            isAuthor: data.isAuthor,
            messageContent: data.messageContent,
            identity: data.identity
        };

        const newUserChatHistory = {
            ...userChatHistory,
            ChatHistory: [...userChatHistory.ChatHistory, newDirectMessage]
        }

        const newChatHistory = [
            ...chatHistory.filter(h=> h.socketId !== userSocketId ),
            newUserChatHistory
        ];

        store.dispatch(setDirectChatHistory(newChatHistory));
        //console.log(newChatHistory);
    }else{
        const newUserChatHistory = {
            socketId: userSocketId,
            ChatHistory: [
            {
                isAuthor: data.isAuthor,
                messageContent: data.messageContent,
                identity: data.identity
            },
        ],
        };
        const newChatHistory = [...chatHistory, newUserChatHistory];

        store.dispatch(setDirectChatHistory(newChatHistory));
    }
};