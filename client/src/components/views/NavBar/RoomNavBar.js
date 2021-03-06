import React from 'react';
import { connect } from 'react-redux';
import styles from '../NavBar/navbar.module.css';
import { Link, withRouter } from 'react-router-dom';
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { logout } from '../../../redux/actions/actions';
import { useCookies } from 'react-cookie';


function RoomNavBar(props) {
    const { logoutAction } = props;
    const [cookies] = useCookies();

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

    const logoutHandler = (e) => {
        e.preventDefault();

        logoutAction()
        .then(response => {
            if (response.response.logoutSuccess) {
                toast.success(response.response.msg)
                setTimeout(() => {
                    window.location.replace('/')
                }, 1500)
            } else if (!response.response.logoutSuccess) {
                toast.error(response.response.msg) 
            }
        })
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
                        
                          <a href="/intro" class="navbar-brand" style={upsideLogo}>ORIGINALS</a>
                    </div>

                    <div class="collapse navbar-collapse" style={navbarStyle}>
                        <ul class="nav navbar-nav ml-auto" style={firstNav}>
                            <li style={{marginTop: 15}}><h4>??????????????? &nbsp; {cookies.un}???</h4></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right" style={secondNav}>
                            <li><Link to="" class="smoothScroll" className={styles.loginStyle} onClick={logoutHandler}>LogOut</Link></li>
                        </ul>
                    </div>
                </div>
            </section>
            <ToastContainer hideProgressBar={true}/>
    </div>
    );
}

const mapStoreStateToProps = (state) =>{
    return {
        ...state,
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        logoutAction: () => dispatch(logout())
    }
}

export default withRouter(connect(mapStoreStateToProps, mapActionsToProps)(RoomNavBar));