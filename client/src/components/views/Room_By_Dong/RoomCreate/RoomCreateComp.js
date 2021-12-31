import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import RoomContext from "./RoomContext";
import styles from '../room.module.css';

function RoomCreateComp() {

  const id = useRef()

  const [state, setState] = useState({
    room_id: "",
    room_name: "",
    room_password: "",
    isActive:false,
  });

  const { room_id, room_name, room_password, isActive, } = state;
      
      // 웹에 바로출력해서 보여주는 부분
  const handlChange = (e) => {
    state.room_id = (id.current.value);
    const {value, name} = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const onclick = () => {
    if(isActive){
    const textbox = {
      ...state,
      room_id: room_id,
      room_name: room_name,
      room_password: room_password,
    };
      fetch("/api/data2/roomcreate", { //text 주소에서 받을 예정
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
      });
    alert('방고유번호     '+room_id+'                                                       방이 생성되었습니다');
    }
  };
// 값이 없을 때 버튼 색깔 변하기 버튼 활성화는 button disable 참고

const checkvalid2 = ()=>{
  room_name==="" || room_password===""
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
    //랜덤문자 고정값을 정해주고 onchange 가 먹히지않아서 useref 사용
    <RoomContext.Consumer >
      {(value2) => (
        <div>
          <br/>
          <h4>방 고유번호</h4>
          <input name="room_id" onChange={handlChange} disabled value={value2.name} ref={id}/>
          <h4>    </h4>
          <input name="room_name" onChange={handlChange} placeholder="방 제목" onKeyUp={checkvalid2} maxlength='12'/>
          <h4>    </h4>
          <input name="room_password" type='number' onChange={handlChange}placeholder="방 비밀번호" onKeyUp={checkvalid2} maxlength='10'/>
          
          <button disabled={!room_id || !room_password} className={isActive ? styles.activebtn : styles.unactivebtn} onClick= { onclick }>
            {
              isActive === true ? 
              <Link to={{
                pathname: "/roomadmin",
                  state: {
                      title: "title",
                      name: value2.name,
                      body: "body"
                  }
              }}>
              <h3>만들기</h3></Link>
              : null
            } 
          </button>
          <h3>방: {room_name} <br></br>비번: {room_password} </h3>
          <br></br>
          <h3><Link to='../room'>나가기</Link></h3>
        </div>
    )}
    </RoomContext.Consumer>
  );
};
export default RoomCreateComp;
