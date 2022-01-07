import React from 'react';

const Input = ({placeholder, value, changeHandler})=> {
    return (
        <input 
        value = {value}
        onChange={changeHandler}
        //style={{fontWeight:"bold"}}
        className = 'join_room_input'
        placeholder= {placeholder} 
        />

    )
}

const Name =({}) =>{
    return(
        <input className="roomname" 
        type="text" 
        placeholder="Room Name" 
         maxlength='10'>
        </input>
    );
}

const JoinRoomInputs = (props) =>{
    const { roomIdValue, setRoomIdValue, nameValue, setNameValue, isRoomHost } =
    props;
    console.log(props);

    const handleRoomIdValueChange = (event) =>{
        setRoomIdValue(event.target.value);
    }
    const handleNameValueChange = (event) => {
        setNameValue(event.target.value);
    }
    return <div className = 'join_room_inputs_container'>
        {!isRoomHost && (<Input 
        placeholder= 'Enter class ID'
        value = {roomIdValue}
        changeHandler={handleRoomIdValueChange}
        /> , <Input 
         placeholder = 'Enter your Name'
         value = {nameValue}
         changeHandler={handleNameValueChange}
        />
        
        )}
        <Input 
         placeholder = 'Enter class Name'
         value = {nameValue}
         changeHandler={handleNameValueChange}
        />
        <Input 
         placeholder = 'Enter your Name'
         value = {nameValue}
         changeHandler={handleNameValueChange}
        />
        
    </div>
};

export default JoinRoomInputs;
