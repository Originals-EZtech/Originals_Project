import React from 'react';
import styles from '../NavBar/navbar.module.css';

function NavBar() {

    const navbarStyle={
        float: "right"
    }
    
    const firstNav={
        marginRight: 50,
        fontSize: 18,
        marginTop: 7,
        marginBottom: 7
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
            <section class="preloader">
                <div class="spinner">
                    <span class="spinner-rotate"></span>
                    
                </div>
            </section>
          
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
                            <li><a href="#home" class="smoothScroll">Home</a></li>
                            {/* <li><a href="#about" class="smoothScroll">About</a></li> */}
                            <li><a href="#team" class="smoothScroll">Components</a></li>
                            <li><a href="#courses" class="smoothScroll">Services</a></li>
                            {/* <li><a href="#testimonial" class="smoothScroll">Reviews</a></li> */}
                            <li><a href="#contact" class="smoothScroll">Contact</a></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right" style={secondNav}>
                            <li><a href="/login" class="smoothScroll" className={styles.loginStyle}>LogIn</a></li>
                            <li><a href="/register" class="smoothScroll" className={styles.loginStyle}>SignUp</a></li>
                        </ul>
                    </div>
                </div>
            </section>
    </div>
    );
}

export default NavBar;