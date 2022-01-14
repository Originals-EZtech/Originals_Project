/* eslint-disable no-const-assign */
import React from 'react';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';


const ConnectingButton = (props) => {
    const { onClickHandler, buttonText } = props;
    const [cookies] = useCookies();

    if(cookies.ur === 'prof'){
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