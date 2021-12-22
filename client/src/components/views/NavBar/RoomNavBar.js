import React from 'react';
import styles from '../NavBar/navbar.module.css';
import { Link } from 'react-router-dom';

function RoomNavBar() {

    const navbarStyle={
        float: "right",
    }
    
    const firstNav={
        marginRight: 50,
        fontSize: 18,
        marginTop: 7,
        marginBottom: 7,
    }

    const secondNav={
        backgroundColor: '#29ca8e',
        borderRadius: 50,
        marginTop: 7,
        marginBottom: 7
    }

    const upsideLogo={
        fontSize: 45
    }


    return (
        <div>
            <section class="navbar custom-navbar navbar-fixed-top" role="navigation">
                <div class="container">
                    <div class="navbar-header">
                          <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                              <span class="icon icon-bar"></span>
                              <span class="icon icon-bar"></span>
                              <span class="icon icon-bar"></span>
                          </button>
                        
                          <a href="/" class="navbar-brand" style={upsideLogo}>ORIGINALS</a>
                    </div>

                    <div class="collapse navbar-collapse" style={navbarStyle}>
                        <ul class="nav navbar-nav ml-auto" style={firstNav}>
                            <li style={{marginTop: 15}}><h5>환영합니다 OOO님</h5></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right" style={secondNav}>
                            <li><Link to="/login" class="smoothScroll" className={styles.loginStyle}>LogOut</Link></li>
                        </ul>
                    </div>
                </div>
            </section>
    </div>
    );
}

export default RoomNavBar;