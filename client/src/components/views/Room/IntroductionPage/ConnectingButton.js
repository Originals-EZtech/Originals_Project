/* eslint-disable no-const-assign */
import React from 'react';
import { connect } from 'react-redux';

const ConnectingButton = (props) => {
    const { onClickHandler, buttonText , userRole } = props;

    if(userRole === 'prof'){
        return(
            <button className={'create_room_button'} onClick ={onClickHandler}>
                {buttonText}
            </button>
        );
    }else{
        return(
            <button className={'join_room_button'} onClick ={onClickHandler}>
                {buttonText}
            </button>
        );
    }
};

const mapStoreStateToProps = (state) =>{
    return {
        ...state,
    }
}

export default connect(mapStoreStateToProps, null)(ConnectingButton);