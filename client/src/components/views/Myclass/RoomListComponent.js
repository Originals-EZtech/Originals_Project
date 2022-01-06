import React, { useState, } from 'react';

function RoomListComponent() {
  const [state, setState] = useState({
      room_list: "",
    });

  const { room_list, } = state;
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
          setState({
            ...state,
            room_list: json.rows
          });
        });  
    };
    const element = document.getElementsByClassName('team-info');
    const rendering = () => {
      const result = [];
      for (let i = 0; i < room_list.length; i++) {
        element.innerHTML= result.push(<div key={i}>{(i+1)+"번째 방이름 : "+room_list[i].ROOM_NAME + " /  참여시간, 만든시간 : "+room_list[i].ROOM_DATE + "  "}</div>);
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