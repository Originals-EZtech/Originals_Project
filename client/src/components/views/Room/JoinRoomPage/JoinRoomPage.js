/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import { connect } from 'react-redux';
import JoinRoomTitle from './JoinRoomTitle';
import JoinRoomContent from './JoinRoomContent';
import RoomNavBar from '../../NavBar/RoomNavBar';
import './JoinRoomPage.css';
import { setIsRoomHost } from '../../../../redux/actions/actions';


const JoinRoomPage = (props) =>{
    const { setIsRoomHostAction, isRoomHost} = props;
    const search = useLocation().search;

    useEffect(() =>{
        const isRoomHost = new URLSearchParams(search).get('host');
        if (isRoomHost){
            setIsRoomHostAction(true);
        }

    }, []);
    return(
        <div className ='join_room_page_container'>
            <RoomNavBar />
            <div className = 'join_room_page_panel'>
                <JoinRoomTitle isRoomHost={isRoomHost} />
                <JoinRoomContent />
            </div>
        </div>
    );
};

const mapStoreStateToProps = (state) => {
    return {
        ...state
    }   
}

const mapActionsToProps = (dispatch) => {
    return {
       setIsRoomHostAction: (isRoomHost)=>dispatch(setIsRoomHost(isRoomHost)), 
    };
};
export default connect(mapStoreStateToProps, mapActionsToProps)(JoinRoomPage);
//export 는 내보내기 