import React, { useState, } from 'react';
import search from './resourse/search.svg'
import { useCookies } from "react-cookie";
import { withRouter } from 'react-router-dom';
import { connect} from 'react-redux';
import { setMyRoomId, setIsRoomHost, setIdentity } from '../../../redux/actions/actions';

function RoomListComponent(props) {
  const { setMyRoomIdAction, setIsRoomHostAction, setIdentityAction, userName } = props;
  const [cookies] = useCookies();
  
  const [state, setState] = useState({
      room_list: "",
    });

  const { room_list } = state;

  const myroomclick = (room) => {
    const myRoomId=room.ROOM_ID;
    setMyRoomIdAction(myRoomId);
    setIsRoomHostAction(true);
    setIdentityAction(userName);
    props.history.push('/room');
  };

  const onclick = () => {
    const user_seq = cookies.user_seq;

    const textbox = {
      user_seq: user_seq,
    };

    fetch("/api/data2/roomlist_2", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(textbox),
    })
    .then((res) => res.json())
    .then((json) => {
      setState({
        ...state,
        room_list: json.rows
      });
    });  
  };

  const element = document.getElementsByClassName('roompage');
  const rendering = () => {
    const result = [];
    for (let i = 0; i < room_list.length; i++) {
      element.innerHTML = result.push(
                            <div key={i}> 
                              <p className="myclass_list_text" onClick={() => { myroomclick(room_list[i]) }}> 
                                {(i+1)+") 방이름 : "+room_list[i].ROOM_NAME + " || 만든시간 : "+room_list[i].ROOM_DATE + "  "} 
                              </p> 
                            </div>
                          );
    }
    return result;
  }
    
  return (
      <div className="print_roomList">
          <h3 className="my_list">Search</h3><br></br>
          <img
            className="my_ser"
            onClick={onclick}
            src={search}
            alt=''
          ></img>
          <div className="list_con">
            <h3><div className="roompage">{rendering()}</div></h3>
          </div>
      </div>
  );
};


const mapStoreStateToProps = (state) =>{
  return {
      ...state,
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost)=>dispatch(setIsRoomHost(isRoomHost)), 
    setMyRoomIdAction: (myRoomId) => dispatch(setMyRoomId(myRoomId)),
    setIdentityAction: (identity) => dispatch(setIdentity(identity))
   };
  };

export default withRouter(connect(mapStoreStateToProps, mapActionsToProps)(RoomListComponent));