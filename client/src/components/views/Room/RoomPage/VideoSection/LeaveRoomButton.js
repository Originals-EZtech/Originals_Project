import React from 'react';
import { useCookies } from "react-cookie";
import { connect } from 'react-redux';


const LeaveRoomButton = ({roomId}) =>{
    const [cookies] = useCookies();
    // this logic will allow us to redirect to that first page, introduction page
    const handleRoomDisconnection = () =>{
        // const siteUrl = window.location.origin; // get current url
        window.location.href = '/intro'; // 현재 페이지에서 siteUrl 페이지로 이동 
    }
    const handleRoomDisconnectionProf = () =>{
        const user_seq = cookies.user_seq
        const leavetextbox = {
            user_seq: user_seq,
            roomId: roomId
          };
        console.log("roomId:::"+roomId)
        fetch("/api/data2/roomleave_2", { //text 주소에서 받을 예정
            method: "post", //통신방법
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(leavetextbox), //textbox라는 객체를 보냄
          })
          // 추가된 부분
          // .then()은 메서드는 fetch가 서버에서 응답을 한후에 코드를 동작하게 만듬 
          // res는 서버에서 받은 객체 형태는 log로 출력해보길
          .then((res) => res.json())

        window.location.href = '/intro'; // 현재 페이지에서 siteUrl 페이지로 이동 
    }
    
    return <div className='video_button_container'>
        {cookies.user_role === 'prof' &&
        <button className='video_button_end' onClick={handleRoomDisconnectionProf}>
            Leave Room
        </button>
        }
        {cookies.user_role === 'general' &&
        <button className='video_button_end' onClick={handleRoomDisconnection}>
            Leave Room
        </button>
        }

    </div>
};

const mapStoreStateToProps = (state) =>{
    return {
        ...state,
    };
};

export default connect(mapStoreStateToProps)(LeaveRoomButton);