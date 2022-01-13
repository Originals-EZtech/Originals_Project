import * as wss from './wss.js'
import Peer from 'simple-peer'
import { fetchTURNCredentials, getTurnIceServers } from './turn.js';
import streamSaver from 'streamsaver';
import { setFileName, setGotFile, setMessages, setShowOverlay } from '../../../../redux/actions/actions.js';
import store from '../../../../redux/store/store.js';


const worker = new Worker('./../../../worker.js')
const defaultConstraints = {
    audio: true,
    video: {
        width: '480',
        height: '360',
    }, 
};

const onlyAudioConstraints ={
    audio: true,
    video: false,
};

let localStream;

export const getLocalPreviewAndInitRoomConnection = async (
    isRoomHost,
    identity,
    roomId = null,
    onlyAudio,
    user_seq,
    roomNameValue,
    myRoomId
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
        ? wss.createNewRoom(identity, onlyAudio, user_seq, roomNameValue, roomId, myRoomId ) 
        : wss.joinRoom(identity, roomId, onlyAudio, user_seq, myRoomId);
    }).catch((err) => {
        console.log('error occured when trying to get an access to local stream'); 
        console.log(err);
        if(constraints.audio === null){
            alert('check your audio');
            if(isRoomHost === true){
                window.location.replace('/join-room?host=true')
            }else{
                window.location.replace('/join-room')
            }
        }else{
            alert('check your camera!');
            if(isRoomHost === true){
                window.location.replace('/join-room?host=true')
            }else{
                window.location.replace('/join-room')
            }
        }
    });
    
}

let peers = {};
let streams = [];


const getConfiguration = ()=>{
    const turnIceServers = getTurnIceServers();
    if(turnIceServers){

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
        try{
            if(data.toString().includes("done")){
                console.log('done')
                const parsed = await JSON.parse(data);
                store.dispatch(setFileName(parsed.fileName));
                store.dispatch(setGotFile(true));
                console.log(parsed.fileName);
                console.log(parsed.fileSize);
                
             }
             if(data.toString().includes("message")){
                 console.log('message');
                 const messageData = await JSON.parse(data);            
                 appendNewMessage(messageData); 
             }
             if(!(data.toString().includes("done")) && !(data.toString().includes("message"))){
                 console.log('file');
                 worker.postMessage(data);
             }
        }catch(e){
            console.log('data channel failed');
        }
       
   
  });   

};

export const download = ()=>{
    const {fileName, gotFile} = store.getState();
    store.dispatch(setGotFile(false))
    console.log(gotFile);
    console.log('......downloading');
    worker.postMessage('download');
    worker.addEventListener('message', event =>{
        console.log(fileName);
        const stream = event.data.stream();
        const fileStream =  streamSaver.createWriteStream(fileName);
        stream.pipeTo(fileStream);
        console.log(fileStream);
    })

    console.log(gotFile);
}

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
    const participant = store.getState().identity;
    
    const videosContainer = document.getElementById('videos_portal');
    videosContainer.classList.add('videos_portal_styles');
    const videoContainer = document.createElement('div');
    videoContainer.classList.add('video_track_container');
    const videoElement = document.createElement('video');
    videoElement.classList.add('video_track');
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.srcObject = stream;
    
    videoElement.onloadedmetadata =()=>{
        videoElement.play();
    };

    videoContainer.append(videoElement,getnameLabel(participant));

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
    videoElement.classList.add('video_track');
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


    

//check if other user connected only with audio
    const participants = store.getState().participants;
    const participant = participants.find(p => p.socketId === connUserSocketId);
    videoContainer.append(videoElement,getnameLabel(participant.identity));
    if(participant?.onlyAudio){
        videoContainer.appendChild(getAudioOnlyLabel(participant.identity));
    }else{
        videoContainer.style.position = 'static';
    }

    videosContainer.appendChild(videoContainer);
};

const getAudioOnlyLabel =(identity )=>{
    const labelContainer = document.createElement('div');
    labelContainer.classList.add('label_only_audio_container');

    const label = document.createElement('p');
    label.classList.add('label_only_audio_text');
    label.innerHTML = `only audio ${identity}`;

    labelContainer.appendChild(label);
    return labelContainer;
};

const getnameLabel =(identity)=>{
    const NameContainer = document.createElement('div');
    NameContainer.classList.add('label_name_con');

    const Name = document.createElement('p');
    Name.classList.add('label_name_text');
    Name.innerHTML = `${identity}`;

    NameContainer.appendChild(Name);
    return NameContainer;
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
    const messages = store.getState().messages;
    console.log(messageData);
    store.dispatch(setMessages([...messages, messageData]));
  };

  export const sendMessageUsingDataChannel = (messageContent) => {
    // append this message locally
    const identity = store.getState().identity;
    const localMessageData = {
      "message": true,
      "content": messageContent,
      identity,
      "messageCreatedByMe": true,
    };
    
    appendNewMessage(localMessageData);
  
    const messageData = {
      "message": true,
      "content": messageContent,
      identity,
    };
    const stringifiedMessageData = JSON.stringify(messageData); 

    for (let socketId in peers) {
      peers[socketId].send(stringifiedMessageData);
    }
  };

  export const sendFileUsingDataChannel= (file)=>{
      file.arrayBuffer().then(buffer =>{
          const chunkSize = 16*1024;
          // keep chunking and sending the chunks to the other peers
          while (buffer.byteLength){
            const chunk = buffer.slice(0, chunkSize);
            buffer = buffer.slice(chunkSize, buffer.byteLength);
            try{
                for(let socketId in peers){
                    peers[socketId].send(chunk);
                }
            }catch(e){
                alert('sending failed');
                console.log('sending failed');
            }

          }
          try{
            for(let socketId in peers){
                peers[socketId].write(JSON.stringify({ "done": true, "fileName": file.name, "fileSize":file.size }));
            }
          }catch(e){
              alert('sending done failed');
              console.log('sending done failed');
          }

      });
  }

