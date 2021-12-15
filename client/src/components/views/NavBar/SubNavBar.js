import React from 'react';
import styles from '../NavBar/navbar.module.css';

function SubNavBar() {

    const upsideMenu={
        paddingBottom: 33
    }

    const upsideLogo={
        fontSize: 45
    }

    return (
        <div>
            {/* <section class="preloader">
                <div class="spinner">
                    <span class="spinner-rotate"></span>
                    
                </div>
            </section> */}
          
            <section class="navbar custom-navbar navbar-fixed-top" role="navigation">
                <div class="container" style={upsideMenu}>
                    <div class="navbar-header">
                          <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                              <span class="icon icon-bar"></span>
                              <span class="icon icon-bar"></span>
                              <span class="icon icon-bar"></span>
                          </button>
                        
                          <a href="/" class="navbar-brand" style={upsideLogo}>ORIGINALS</a>
                    </div>
                </div>
            </section>
    </div>
    );
}

export default SubNavBar;