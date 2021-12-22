import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../room.module.css';

function RoomJoinComp(){

const [state, setState] = useState({
    room_id: "",
    room_password: "",
    room_id_check: "",
    isActive:false,
});

const {room_id, room_password, room_id_check, isActive} = state;

const handlChange = (e) => {
  const {value, name} = e.target;
  setState({
    ...state,
    [name]: value,
  });
};
  
const searchclick=()=>{
  if(isActive){
    const textbox = {
      room_id: room_id,
      room_password: room_password,
    };
    fetch("/api/data2/roomjoinsearch", { //text 주소에서 받을 예정
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(textbox), //textbox라는 객체를 보냄
    })
    // 추가된 부분
    // .then()은 메서드는 fetch가 서버에서 응답을 한후에 코드를 동작하게 만듬 
    // res는 서버에서 받은 객체 형태는 log로 출력해보길
    .then((res) => res.json())
    .then((json) => {
        setState({
          ...state,
          room_id_check: json.rows,
        });
        console.log(json.rows[0]);
        if ( json.rows[0]==="" || json.rows[0]===undefined ) {
          return alert('방이 없습니다');
        } else {
          return alert(json.rows+' 을 찾았습니다');
        }
      });
    }
  }

// 값이 없을 때 버튼 색깔 변하기 버튼 활성화는 button disable 참고
const checkvalid = ()=>{
  room_id==="" || room_password===""
  ? setState({
    ...state,
    isActive:false,
  })
  : setState({
    ...state,
    isActive:true,
  });
};

    return (
      <div>
        <input name="room_id" onChange={handlChange} placeholder="방 고유번호" value={room_id} onKeyUp={checkvalid} maxlength='12'/>
        <input type='number' name="room_password" onChange={handlChange}placeholder="방 비밀번호" value={room_password} onKeyUp={checkvalid} maxlength='10'/><br></br>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <button disabled={!room_id || !room_password} className={isActive ? styles.activebtn : styles.unactivebtn} onClick= { searchclick }><h3>방찾기</h3></button>
        <h3><Link to="/roomparticipant">{room_id_check}</Link></h3>
        <h3>방 고유번호: {room_id} <br></br>방 비밀번호: {room_password} </h3>
      </div>
    );
};

export default RoomJoinComp;
