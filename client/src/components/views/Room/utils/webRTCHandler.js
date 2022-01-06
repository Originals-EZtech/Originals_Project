import { setMessages, setShowOverlay, setFileDatas } from '../store/actions.js';
import store from '../store/store.js'
import * as wss from './wss.js'
import Peer from 'simple-peer'
import { fetchTURNCredentials, getTurnIceServers } from './turn.js';
import { fileUpload } from '../store/actions';


// to get our local camera preview and create the room if we are the host on the server
// so we'll initialize the connection if the hos and if the user which way is joining the name of that

const defaultConstraints = {
    audio: true,
    video: {
        width: '480',
        height: '360',
    }, 
};

const onlyAudioConstraints ={
    audio: true,
    video: false
};

let localStream;

export const getLocalPreviewAndInitRoomConnection = async (
    isRoomHost,
    identity,
    roomId = null,
    onlyAudio
) =>{
    await fetchTURNCredentials();

    const constraints = onlyAudio ? onlyAudioConstraints: defaultConstraints;
    // allow us to get user media  that will be our access to the microphone and camera and from that will receive that stream
    
    navigator
    .mediaDevices
    .getUserMedia(constraints) // defaultConstraints ==> Constraints 로 수정 확인!
    .then((stream) => {
        console.log('successfully received local stream');
        localStream = stream; // gotten by 'getusermedia'
        showLocalVideoPreview(localStream);
        
        // after successfully accessing the local stream, change the state of showoverlay to 'false'
        store.dispatch(setShowOverlay(false));
        // dispatch an action to hide overlay
        
        isRoomHost 
        ? wss.createNewRoom(identity, onlyAudio) 
        : wss.joinRoom(identity, roomId, onlyAudio);
    }).catch((err) => {
        console.log('error occured when trying to get an access to local stream'); 
        console.log(err);
    });
    
}

let peers = {};
let streams = [];

// peers {} 
   // socketId: {}

const getConfiguration = ()=>{
    const turnIceServers = getTurnIceServers();
    if(turnIceServers){
        //console.log('TURN server credentials fetched');
        //console.log(turnIceServers);
        return{
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302' // to get an information about our internet connection
                },
                ...turnIceServers
            ]
        }
    }else{
        console.warn('Using only STURN server');
        return {
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302' // to get an information about our internet connection
                },
            ]
        }

    }

};

const messengerChannel = 'messenger';

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) =>{
    
    console.log(connUserSocketId);
    console.log(isInitiator);
    const configuration = getConfiguration();

     peers[connUserSocketId] = new Peer({
         initiator: isInitiator,
         config: configuration,
         stream: localStream,
         channelName: messengerChannel //null why?
     }); // peer connection webrtc object
     console.log(peers);
     console.log(peers[connUserSocketId].channelName);

     peers[connUserSocketId].on('signal', (data)=>{
        console.log("check")
        // webRTC offer, webRTC Answer (sdp informations), ice candidates
        
        const signalData = {
            signal: data,
            connUserSocketId: connUserSocketId
        };
        
        wss.signalPeerData(signalData);
     });

     peers[connUserSocketId].on('stream', (stream)=>{
         console.log('new stream came');

         addStream(stream, connUserSocketId);
         streams = [...streams, stream];
     });
    
     peers[connUserSocketId].on('data', async(data) => {
        const messageData = await JSON.parse(data);
        console.log(messageData);
        // if(typeof(data) === 'string'){
        //     const messageData = await JSON.parse(data);
        //     console.log(messageData);
        // }else{
        //     console.log(data);
        // }
        
        //const messageData = await JSON.parse(stringifiedMessageData);
        //const blob = new Blob([data]);
        //appendNewMessage(messageData);
      });  
};

export const handleSignalingData =(data)=>{
    //add signaling data to peer connection
    peers[data.connUserSocketId].signal(data.signal);
};

export const removePeerConnection = (data) =>{
    const { socketId} = data;
    const videoContainer = document.getElementById(socketId);
    const videoEl = document.getElementById(`${socketId}-video`);

    if(videoContainer&& videoEl){
        const tracks = videoEl.srcObject.getTracks();

        tracks.forEach((t) => t.stop());
        videoEl.srcObject = null;
        videoContainer.removeChild(videoEl);
        
        videoContainer.parentNode.removeChild(videoContainer);

        if (peers[socketId]){
            peers[socketId].destroy();
        }
        delete peers[socketId];
    }

};

///////////////////////////////////////// UI Videos //////////////////////////////

const showLocalVideoPreview = (stream) =>{
    // show local video preview
    const videosContainer = document.getElementById('videos_portal');
    videosContainer.classList.add('videos_portal_styles');
    const videoContainer = document.createElement('div');
    videoContainer.classList.add('video_track_container');
    const videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.srcObject = stream;
    
    videoElement.onloadedmetadata =()=>{
        videoElement.play();
    };

    videoContainer.appendChild(videoElement);

    if (store.getState().connectOnlyWithAudio){
        videoContainer.appendChild(getAudioOnlyLabel());
    }


    videosContainer.appendChild(videoContainer);
};

const addStream = (stream, connUserSocketId)=>{
    // display incoming stream
    const videosContainer = document.getElementById('videos_portal');
    const videoContainer = document.createElement('div');
    videoContainer.id = connUserSocketId;

    videoContainer.classList.add('video_track_container');
    const videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.srcObject = stream;
    videoElement.id = `${connUserSocketId}-video`;
   
    videoElement.onloadedmetadata =()=>{
        videoElement.play();
    };

    videoElement.addEventListener('click', ()=>{
        if(videoElement.classList.contains('full_screen')){
            videoElement.classList.remove('full_screen');
        }else{
            videoElement.classList.add('full_screen');
        }
    });


    videoContainer.appendChild(videoElement);

//check if other user connected only with audio
    const participants = store.getState().participants;
    const participant = participants.find(p => p.socketId === connUserSocketId);

    if(participant?.onlyAudio){
        videoContainer.appendChild(getAudioOnlyLabel(participant.identity));
    }else{
        videoContainer.style.position = 'static';
    }

    videosContainer.appendChild(videoContainer);
};

const getAudioOnlyLabel =(identity ='' )=>{
    const labelContainer = document.createElement('div');
    labelContainer.classList.add('label_only_audio_container');

    const label = document.createElement('p');
    label.classList.add('label_only_audio_text');
    label.innerHTML = `only audio ${identity}`;

    labelContainer.appendChild(label);
    return labelContainer;
};

///////////////////////////////////////// Button Logic //////////////////////////////

export const toggleMic = (isMuted) =>{
    localStream.getAudioTracks()[0].enabled = isMuted ? true:false;
};

export const toggleCamera = (isDisabled)=>{
    localStream.getVideoTracks()[0].enabled = isDisabled ? true : false;
};

export const toggleScreenShare = (
    isScreenSharingActive,
    screenSharingStream = null
  ) => {
    if (isScreenSharingActive) {
      switchVideoTracks(localStream);
    } else {
      switchVideoTracks(screenSharingStream);
    }
  };
  
const switchVideoTracks = (stream) => {
    for (let socket_id in peers) {
      for (let index in peers[socket_id].streams[0].getTracks()) {
        for (let index2 in stream.getTracks()) {
          if (
            peers[socket_id].streams[0].getTracks()[index].kind ===
            stream.getTracks()[index2].kind
          ) {
            peers[socket_id].replaceTrack(
              peers[socket_id].streams[0].getTracks()[index],
              stream.getTracks()[index2],
              peers[socket_id].streams[0]
            );
            break;
          }
        }
      }
    }
  };
  
  
 //////////////////////////////////////Messages/////////////////////////////////////////////
 

 const appendNewMessage = (messageData) => {
    console.log(messageData);
    const messages = store.getState().messages;
    store.dispatch(setMessages([...messages, messageData]));
    console.log(messages);
  };

export const sendMessageUsingDataChannel = (messageContent, fileContent) => {
    
    const identity = store.getState().identity;
    //console.log(identity); message 전달자 ok 
    var reader = new FileReader()
    reader.readAsArrayBuffer(fileContent);
    reader.onload =()=>{
        const fileBuffer = reader.result;
        const localMessageData = {
            content: messageContent,
            file: fileBuffer,
            identity,
            messageCreatedByMe: true,
        };
        appendNewMessage(localMessageData); 
        console.log(localMessageData); 
     
        ///////////////////////////////////////////////send data///////////////////////////////////
        //console.log(fileBuffer) //ArrayBuffer
        //console.log(typeof(reader.result));
        const messageData = {
            content: messageContent,
            identity,
        };

        const stringifiedMessageData = JSON.stringify(messageData); //

        for (let socketId in peers) {
            peers[socketId].send(stringifiedMessageData);
            console.log(typeof(stringifiedMessageData));
            console.log(stringifiedMessageData);
            //peers[socketId].send(fileBuffer);
        }
        console.log("message 데이터 전송");
    }
};

