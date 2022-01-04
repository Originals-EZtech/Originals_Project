import io from 'socket.io-client';
import { setRoomId, setParticipants, setSocketId} from '../store/actions';
import store from '../store/store.js';
import * as webRTCHandler from './webRTCHandler';
import { appendNewMessageToChatHistory } from './directMessages';


const serverip = require('../../../../config/ipConfig');
console.log("serverip"+serverip);
console.log("serverip.server"+serverip.server);
// 로컬 아이피, 공유기 아이피 ipconfig를 자기 공유기 ip로 바꿔준다
// const SERVER = 'http://localhost:5000';
const SERVER = serverip.server;


let socket = null;

export const connectWithSocketIOServer = () =>{
    socket = io(SERVER);
    socket.on('connect', ()=>{
        console.log('successfully connected with socket.io server');
        console.log(socket.id);   
        store.dispatch(setSocketId(socket.id));    
    });
    socket.on('room-id', (data)=>{
        const { roomId } = data;
        // our store should change if will host a new room
        store.dispatch(setRoomId(roomId));
    });

    socket.on('room-update', (data) => {
        const { connectedUsers} = data;
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
        console.log("direct message came");
        console.log(data);
        appendNewMessageToChatHistory(data);
    });
    socket.on('conn-stt', (data)=>{
        console.log("stt message came"); 
        console.log(data.transcript);
    });
};

//identity : our user name
export const createNewRoom = (identity, onlyAudio) =>{
    //emit an event to server that we would like to create new room
    const data = {
        identity,
        onlyAudio
    };

    socket.emit('create-new-room', data);
}

export const joinRoom = (identity, roomId, onlyAudio) =>{
    //emit an event to server that we would like to join a room
    const data = {
        roomId,
        identity,
        onlyAudio
    };
    socket.emit('join-room' ,data);
}

export const signalPeerData = (data) =>{
    socket.emit('conn-signal', data);
};

// sdp data, icecandidates datas

export const sendDirectMessage = (data) =>{
    socket.emit('direct-message', data);
    console.log(data); 
};

export const sendSTT =(data) =>{
    socket.emit('send-stt', data);
    console.log(data);
};


