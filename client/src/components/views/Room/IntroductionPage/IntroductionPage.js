/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import logo from '../resources/images/logo.png';
import ConnectingButtons from './ConnectingButtons';
import { connect} from 'react-redux';
import RoomNavBar from '../../NavBar/RoomNavBar';

import './IntroductionPage.css';
import { setIsRoomHost } from '../../../../redux/actions/actions';
import store from '../../../../redux/store/store';

const IntroductionPage = ({setIsRoomHostAction}) => {

    useEffect(()=> {
        setIsRoomHostAction(false);
    }, []);
    
    return(
        <div className = 'introduction_page_container'>
            <RoomNavBar />
          <div className='introduction_page_panel'>
              <img src={logo} className ='introduction_page_image' alt=''></img>
              <ConnectingButtons />
          </div>
        </div>
    ); 
};

const mapActionsToProps = (dispatch) => {
    return{
        setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
    }
}

export default connect(null, mapActionsToProps)(IntroductionPage);