import React, { useState} from 'react';
import JoinRoomInputs from './JoinRoomInputs';
import { connect} from 'react-redux';
import OnlyWithAudioCheckbox from './OnlyWithAudioCheckbox';
import ErrorMessage from './ErrorMessage';
import { setConnectOnlyWithAudio } from '../store/actions';
import { setRoomId } from '../store/actions';
import { setIdentity} from '../store/actions';
import JoinRoomButtons from './JoinRoomButtons';
import { getRoomExists } from '../utils/api';
import { withRouter } from 'react-router-dom';


const JoinRoomContent = (props) =>{
    const { isRoomHost, setConnectOnlyWithAudio, connectOnlyWithAudio, setIdentityAction, setRoomIdAction } = props;
   
    const [roomIdValue, setRoomIdValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    //console.log(props); 

    const handleJoinRoom = async () =>{ 
        //console.log("check");
        setIdentityAction(nameValue);
        if (isRoomHost){
            createRoom();
        }else{
            await joinRoom();
        }
    };
    const joinRoom = async () =>{
        const responseMessage = await getRoomExists(roomIdValue);

        const { roomExists, full } = responseMessage;

        if(roomExists){
            if(full){
                setErrorMessage('Meeting is full. Please try again later.');
            }else{
                // join a room !
                // save in our redux store meeting id which was provided by user which would like to join
                setRoomIdAction(roomIdValue);
                props.history.push('/room');
            }
        }else{
            setErrorMessage('Meeting not found. Check your meeting ID');
        }
    };



    const createRoom = () =>{
        props.history.push('/room');
    };


    return (
    <>
    <JoinRoomInputs 
        roomIdValue ={roomIdValue}
        setRoomIdValue = {setRoomIdValue}
        nameValue = {nameValue}
        setNameValue = {setNameValue}
        isRoomHost = {isRoomHost}
    /> 
    <OnlyWithAudioCheckbox 
      setConnectOnlyWithAudio = {setConnectOnlyWithAudio}
      connectOnlyWithAudio = {connectOnlyWithAudio}
    />
    <ErrorMessage 
    errorMessage= {errorMessage} 
    />
    <JoinRoomButtons 
     handleJoinRoom={handleJoinRoom}
     isRoomHost={isRoomHost}
    />

    </>
    );
};

const mapStoreStateToProps = (state) =>{
    return {
        ...state,
    };
};

const mapActionsToProps = (dispatch) => {
    return {
        setConnectOnlyWithAudio: (onlyWithAudio)=> 
         dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
        setIdentityAction: (identity) => dispatch(setIdentity(identity)),
        setRoomIdAction: (roomId) => dispatch(setRoomId(roomId))
     };
    };


export default withRouter(connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomContent));