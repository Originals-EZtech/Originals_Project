import React from 'react';

const Input = ({placeholder, value, changeHandler})=> {
    return (
        <input 
        value = {value}
        onChange={changeHandler}
        className = 'join_room_input'
        placeholder= {placeholder} 
        />

    )
}

const JoinRoomInputs = (props) =>{
    const { roomIdValue, setRoomIdValue, nameValue, setNameValue, isRoomHost, roomNameValue, setRoomNameValue } =
    props;

    const handleRoomIdValueChange = (event) =>{
        setRoomIdValue(event.target.value);
    }
    const handleNameValueChange = (event) => {
        setNameValue(event.target.value);
    }
    const handleRoomNameValueChange = (event) => {
        setRoomNameValue(event.target.value);
    }

    //!는 논리부정연산자 && 는 앞에 조건이 참이면 뒤에 실행 거짓이면 무시
    return <div className = 'join_room_inputs_container'>
        {!isRoomHost && (<Input 
        placeholder= 'Class ID'
        value = {roomIdValue}
        changeHandler={handleRoomIdValueChange}
        />
        )}
        {!!isRoomHost && (<Input 
         placeholder = 'Class Name'
         value = {roomNameValue}
         changeHandler={handleRoomNameValueChange}
        />
        )}
        <Input 
         placeholder = 'Your Name'
         value = {nameValue}
         changeHandler={handleNameValueChange}
        />
    </div>
};

export default JoinRoomInputs;
