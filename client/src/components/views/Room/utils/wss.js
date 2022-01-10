import io from 'socket.io-client';
import * as webRTCHandler from './webRTCHandler';
import { appendNewMessageToChatHistory } from './directMessages';
import { setParticipants, setRoomId, setSocketId, sttword } from '../../../../redux/actions/actions.js';
import store from '../../../../redux/store/store';


const serverip = require('./config/ipconfig');
console.log("serverip"+serverip);
console.log("serverip.server"+serverip.server);
// 로컬 아이피, 공유기 아이피 ipconfig를 자기 공유기 ip로 바꿔준다
// const SERVER = 'http://localhost:5000';
const SERVER = serverip.server;

let socket = null;

export const connectWithSocketIOServer = () =>{
    socket = io(SERVER);
    socket.on('connect', ()=>{
        store.dispatch(setSocketId(socket.id));    
    });
    socket.on('room-id', (data)=>{
        const { roomId } = data;
        // our store should change if will host a new room
        console.log("connectwithsocketioserver roomId:::"+roomId);
        store.dispatch(setRoomId(roomId));
    });

    socket.on('room-update', (data) => {
        const { connectedUsers} = data;

        console.log("connectwithsocketioserver connectedUsers:::" + connectedUsers)
        store.dispatch(setParticipants(connectedUsers));
    })

    socket.on('conn-prepare', (data)=>{
        const { connUserSocketId } = data;

        webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
        // inform the user which just join the room that we have prepared for incoming connection
        socket.emit('conn-init', { connUserSocketId: connUserSocketId});
    });
    socket.on('conn-signal', (data)=>{
        webRTCHandler.handleSignalingData(data);
    });
    socket.on('conn-init', (data)=>{
        const { connUserSocketId} = data;
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
    });
    socket.on('user-disconnected', (data)=>{
        webRTCHandler.removePeerConnection(data);
    });

    socket.on('direct-message', (data) =>{

        appendNewMessageToChatHistory(data);
    });
    socket.on('conn-stt', (data)=>{
        store.dispatch(sttword(data.transcript));
    });
};



//identity : our user name
export const createNewRoom = (identity, onlyAudio, user_seq, roomNameValue, roomId, myRoomId) =>{
    //emit an event to server that we would like to create new room
    const data = {
        identity,
        onlyAudio,
        user_seq,
        roomNameValue,
        roomId,
        myRoomId
    };

    socket.emit('create-new-room', data);
}

export const joinRoom = (identity, roomId, onlyAudio, user_seq, myRoomId) =>{
    //emit an event to server that we would like to join a room
    const data = {
        roomId,
        identity,
        onlyAudio,
        user_seq,
        myRoomId
    };
    socket.emit('join-room' ,data);
}

export const signalPeerData = (data) =>{
    socket.emit('conn-signal', data);
};

// sdp data, icecandidates datas

export const sendDirectMessage = (data) =>{
    socket.emit('direct-message', data);
};

export const sendSTT =(data) =>{
    socket.emit('send-stt', data);
};