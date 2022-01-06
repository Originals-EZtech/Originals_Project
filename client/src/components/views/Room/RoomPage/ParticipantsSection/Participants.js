import React from 'react';
import { connect} from 'react-redux';
import { setActiveConversation } from '../../store/actions';

const SingleParticipant = (props) => {
    //console.log(props); // ok
    const { 
        identity
        ,lastItem
        ,participant
        ,setActiveConversationAction
        ,socketId
         } = props;
    console.log(lastItem);
    const handleOpenActiveChatbox = () =>{
        console.log(participant.socketId); //선택한 user 
        console.log(socketId); // 본인
        if(participant.socketId !== socketId){
            console.log("check");
            setActiveConversationAction(participant)
        }
        
    };
    // 여기 onClick이 안먹네..? (25) 왜.. ? identity값은 다 들어오는데! 
    return( 
    <> 
        <p className = 'participants_paragraph' onClick={handleOpenActiveChatbox}>{identity}</p>
        {!lastItem && <span className = 'participants_separator_line'></span>}
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
        }
    }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(Participants);