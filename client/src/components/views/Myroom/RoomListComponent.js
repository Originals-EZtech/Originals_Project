import React, { useState, } from 'react';

function RoomListComponent() {
  const [state, setState] = useState({
      room_id: "",
      room_name: "",
    });

  const { room_id, room_name } = state;
  const user_id=9;

  const onclick = () => {
      const textbox = {
          user_id: user_id,
        };
        fetch("/api/data2//roomlist_2", { //text 주소에서 받을 예정
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
          console.log(json.rows);
          console.log("json.rows"+json.rows);
          console.log("json.rows.room_seq"+json.rows.room_seq);
          console.log("json.rows[0]"+json.rows[0]);
          setState({
            ...state,
            room_id: json.rows,
            room_name: json.rows
          });
        });  
    };
    const element = document.getElementsByClassName('team-info');
    const rendering = () => {
      const result = [];
      console.log("1this.roomnamestate : "+state);
      console.log("1this.roomnamestate : "+state.room_id);
      console.log("2this.roomnamestate.data :"+room_id);
      for (let i = 0; i < room_id.length; i++) {
        element.innerHTML= result.push(<div key={i}>{i+"번째 방:"+room_id[i] + "  "}</div>);
      }
      return result;
    };
    return (
        <div>
            <button onClick= { onclick }> 방 목록 불러오기</button>
            <h3>방 목록</h3><br></br>
            <h3><div>{rendering()}</div></h3>
        </div>
    );
};

export default RoomListComponent;