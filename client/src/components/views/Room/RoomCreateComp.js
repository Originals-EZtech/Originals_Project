import React from "react";

export default class RoomCreateComp extends React.Component {
    state = {
        room_name: "",
        room_password: "",
      };
    
      handlChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };
    
    
      onclick = () => {
        const textbox = {
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
      };

  render() {
    return (
      <div>
        <input name="room_name" onChange={this.handlChange}/>
        <input name="room_password" onChange={this.handlChange}/>
        <button onClick={this.onclick}>전송</button>
        <h3>{this.state.room_name}과 {this.state.room_password} 텍스트 데이터를 </h3>
      </div>
    );
  }
};
