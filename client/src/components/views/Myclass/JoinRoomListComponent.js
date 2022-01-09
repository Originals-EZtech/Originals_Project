import React, { useState, } from 'react';
import search from './resourse/search.svg'
import { useCookies } from "react-cookie";
import { withRouter } from 'react-router-dom';
import { connect} from 'react-redux';
import { setMyRoomId } from '../../../redux/actions/actions';

function RoomListComponent(props) {
  const { setMyRoomIdAction } = props;
  const [cookies] = useCookies();
  const user_seq = cookies.user_seq;
  let [myRoomId, setMyRoomId] = useState('');
  const [state, setState] = useState({
      room_list: "",
    });

  const { room_list } = state;

  const myroomclick = (room) => {
    myRoomId=room.ROOM_ID;
    setMyRoomIdAction(myRoomId);
    props.history.push('/room');
  };

  const onclick = () => {
      const textbox = {
          user_seq: user_seq,
        };
        fetch("/api/data2/roomjoinlist_2", { //text 주소에서 받을 예정
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
        element.innerHTML= result.push(<div key={i}> <button onClick={() => { myroomclick(room_list[i]) }}> {(i+1)+"번째 방이름 : "+room_list[i].ROOM_NAME + " /  참여시간, 만든시간 : "+room_list[i].ROOMJOIN_DATE + "  "} </button> </div>);
      }
      return result;
    };
    
    return (
        <div className="my_button">
            <img
            className="my_ser"
            onClick={onclick}
            src={search}
            alt=''
            ></img>
            <h3 className="my_list">Room List</h3><br></br>
            <div className="list_con">
              <h3><div className="roompage">{rendering()}</div></h3>
            </div>
        </div>
    );
};


const mapStoreStateToProps = (state) =>{
  return {
      ...state,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setMyRoomIdAction: (myRoomId) => dispatch(setMyRoomId(myRoomId))
   };
  };

export default withRouter(connect(mapStoreStateToProps, mapActionsToProps)(RoomListComponent));