import React from "react";
import { Link } from 'react-router-dom';
export default class RoomJoinComp extends React.Component {
  state = {
    room_id: "",
    room_password: "",
  };

  handlChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
    searchclick=()=>{
      const textbox = {
        room_id: this.state.room_id,
        room_password: this.state.room_password,
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
        console.log(json);
        console.log("json: "+json);
        console.log("json.rows[0]: "+json.rows[0]);
        this.setState({
          room_id_check: json.rows[0],
        });
        alert(json.rows[0]+'에 입장했습니다');
      });
      
    }
  // setInnerHTML() {
  //   const element = document.getElementsByClassName('team-info');
  //   element.innerHTML 
  //     = '<div style="color:blue">InnerHTML<div>';
  // } 
  
  render() {   

    return (
      <div>
        <input type='number' name="room_id" onChange={this.handlChange} placeholder="방 고유번호"/>
        <input type='number' name="room_password" onChange={this.handlChange}placeholder="방 비밀번호"/><br></br>
        <button onClick= { this.searchclick }>
          {/* <Link to="/roomparticipant"> */}
            <h3>입장하기</h3>
          {/* </Link> */}
        </button>
        <h3>방: {this.state.room_id} <br></br>비번: {this.state.room_password} </h3>
        <h3>{this.state.room_id_check}</h3>
        {/* <h3>{rendering()}</h3> */}
      </div>
    );
  }
};
