import React from 'react';
import MainNavBar from '../NavBar/MainNavBar';
import MainHome from './MainHome';
import MainService from './MainService';
import MainContact from './MainContact';

function MainPage() {
    return (
        <div>
            <MainNavBar />
            
            <div style={{paddingTop: 70}}></div>
    
            <MainHome />

            <MainService />
            
            <MainContact />
        </div>
    )
}

export default MainPage;