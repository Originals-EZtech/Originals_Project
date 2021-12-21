import React, { useState, useEffect } from 'react';
import MainNavBar from '../NavBar/MainNavBar';
import Footer from '../Footer/Footer';
import MainHome from './MainHome';
import MainService from './MainService';
import MainContact from './MainContact';
import Spinner from '../Loading/Spinner';

function MainPage() {

    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        renderPage();
        setLoading(false)
    }, []);

    const renderPage = () => {
        return (
            <>
            <MainNavBar />
            <div style={{paddingTop: 70}}></div>
            <MainHome />
            <MainService />
            <MainContact />
            <Footer />
            </>
        );
    }

    return Loading ? <Spinner /> : (
        <>
            {renderPage()}
        </>
    )
}

export default MainPage;