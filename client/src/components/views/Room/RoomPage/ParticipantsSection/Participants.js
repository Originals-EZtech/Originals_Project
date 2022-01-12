import React from 'react';
import { connect} from 'react-redux';
import {
    setActiveConversation,
    setCheckMessageSign,
    setCheckMessage
} from '../../../../../redux/actions/actions';
import store from '../../../../../redux/store/store';
import {toast} from 'react-toastify';

const SingleParticipant = (props) => {
    const { checkMessage, checkMessageSign} = store.getState();
    const { 
        identity
        ,lastItem
        ,participant
        ,setActiveConversationAction
        ,socketId
         } = props;
    console.log(checkMessage);
    const handleOpenActiveChatbox = () =>{
        store.dispatch(setCheckMessageSign(false));
        console.log(participant.socketId); //선택한 user 
        console.log(socketId); // 본인
        if(participant.socketId !== socketId){
            console.log("check");
            setActiveConversationAction(participant)
        }
        
    };
  
    if(checkMessage !== null){
        if(checkMessage.authorSocketId === participant.socketId){
            console.log('찾았다');
            toast.success(`'${identity}' sent you a message`);
            store.dispatch(setCheckMessageSign(true));
            store.dispatch(setCheckMessage(null));
            //alert(`${identity} sent you a message`);
        }
    }
    //store.dispatch(setCheckMessageSign(false))
    console.log(checkMessageSign);
    let showParti;
    let showHost;
    let showCheck;
    if(participant.socketId !== socketId){
        showParti=(
            <>
                <p className = 'participants_paragraph' onClick={handleOpenActiveChatbox}>{identity}</p>
                {!lastItem && <span className = 'participants_separator_line'></span>}
            </>
        )

    }else{
        showHost=(
            <>
                <p className = 'host_paragraph' onClick={handleOpenActiveChatbox}>{identity}</p>
                {!lastItem && <span className = 'participants_separator_line'></span>}
            </>
        )  
    }
  

    

    // if(!roomHost){
    //     show_participants = (
    //         <>
    //         <p className = 'participants_paragraph' onClick={handleOpenActiveChatbox}>{identity}</p>
    //         {!lastItem && <span className = 'participants_separator_line'></span>}
    //         </>
    //     )
    // }else{
    //     show_participants = (
    //         <>
    //         <p className = 'participants_host_paragraph' onClick={handleOpenActiveChatbox}>{identity}</p>
    //         {!lastItem && <span className = 'participants_separator_line'></span>}
    //         </>
    //     )

    // }
    // 여기 onClick이 안먹네..? (25) 왜.. ? identity값은 다 들어오는데! 
    return( 
        <> 
            {showParti}
            {showHost}
            {showCheck}
        </>
  );

};

const Participants = ({
    participants
    ,setActiveConversationAction
    ,socketId}) => {
    //console.log(setActiveConversationAction);
    //console.log(props);
    return (
        <div className = 'participants_container'>
            {participants.map((participant, index)=> {
                return(
                    <SingleParticipant
                        key = {participant.identity}
                        lastItem = {participants.length === index +1}
                        participant ={participant}
                        identity = {participant.identity}
                        setActiveConversationAction = {setActiveConversationAction}
                        socketId = {socketId}
                    />
                )
            })}
        </div>
    );
};
const mapStoreStateToProps = (state) =>{
    return {
        ...state,
    };
};

const mapActionsToProps= (dispatch) =>{
    return{
        setActiveConversationAction: (activeConversation)=>{
            dispatch(setActiveConversation(activeConversation))
        },
    }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(Participants);