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

                // 서버에 데이터내기
                // const textbox = {
                //     room_id: roomIdValue,
                //     room_name: nameValue,
                //   };

                // fetch("/api/data2/roomjoindata_test", { //text 주소에서 받을 예정
                //     method: "post", //통신방법
                //     headers: {
                //       "content-type": "application/json",
                //     },
                //     body: JSON.stringify(textbox), //textbox라는 객체를 보냄
                //   })
                //   // 추가된 부분
                //   // .then()은 메서드는 fetch가 서버에서 응답을 한후에 코드를 동작하게 만듬 
                //   // res는 서버에서 받은 객체 형태는 log로 출력해보길
                //   .then((res) => res.json())
                //   .then((json) => {
                //   });
                // alert('방고유번호     '+textbox.room_id+'                                                       방에 입장합니다');

                props.history.push('/room');
            }
        }else{
            setErrorMessage('Meeting not found. Check your meeting ID');
        }
    };



    const createRoom = () =>{
        // const createtextbox = {
        //     room_id: roomIdValue,
        //     room_name: nameValue,
        //   };

        // fetch("/api/data2/roomcreatedata_test", { //text 주소에서 받을 예정
        //     method: "post", //통신방법
        //     headers: {
        //       "content-type": "application/json",
        //     },
        //     body: JSON.stringify(createtextbox), //textbox라는 객체를 보냄
        //   })
        //   // 추가된 부분
        //   // .then()은 메서드는 fetch가 서버에서 응답을 한후에 코드를 동작하게 만듬 
        //   // res는 서버에서 받은 객체 형태는 log로 출력해보길
        //   .then((res) => res.json())
        //   .then((json) => {
        //   });
        // alert('방고유번호     '+createtextbox.room_name+'                                                       방이 생성되었습니다');

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