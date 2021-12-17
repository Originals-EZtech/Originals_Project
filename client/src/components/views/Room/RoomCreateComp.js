import React from "react";
import { Link } from 'react-router-dom';

export default class RoomCreateComp extends React.Component {
      state = {
        room_id:"",
        room_name: "",
        room_password: "",
      };

      //랜덤숫자
      random_roomid=Math.random().toString().substring(2, 11);


      // getGUID = (randomlength) =>{
      //   let result = '';
      //   for(let i =0; i < randomlength; i++){
      //     this.random_roomid += String.fromCharCode(this.getRandomInt(33, 125))
      //   }
      //   result=this.random_roomid;
      // return result;
      // };
      // getRandomInt = (min, max) =>{
      //   min = Math.ceil(min); //올림
      //   max = Math.floor(max); //내림
      //   return Math.floor(Math.random() * (max - min)) + min; // 최대값은 제외, 최소값은 포함
      // };
      
      
      // 웹에 바로출력해서 보여주는 부분
      handlChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };
    
      // 클릭해서 데이터 보내주는 부분
      onclick = () => {
        const textbox = {
          room_id: this.random_roomid,
          room_name: this.state.room_name,
          room_password: this.state.room_password,
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
          console.log(json);
          console.log("json: "+json);
        });
        alert('방이 생성되었습니다');
        
      };

  
  render() {
    return (
      <div>
        <input name="room_id" onChange={this.handlChange} placeholder={this.random_roomid} disabled value={this.random_roomid}/>
        <input name="room_name" onChange={this.handlChange} placeholder="방 제목"/>
        <input name="room_password" onChange={this.handlChange}placeholder="방 비밀번호"/>
        <button onClick= { this.onclick }>
          <Link to="/roomadmin"><h3>만들기</h3></Link>
        </button>
        <h3>방: {this.state.room_name} <br></br>비번: {this.state.room_password} </h3>
      </div>
    );
  }
};
