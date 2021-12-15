import React from 'react';
import styles from '../LoginPage/login.module.css';
import classnames from 'classnames';
import { Route,Link } from 'react-router-dom';

function Login() {

    return (
        <div>
            {/* <section class="preloader">
                <div class="spinner">
                    <span class="spinner-rotate"></span>
                </div>
            </section> */}

            <img className={styles.wave} src="assets/images/wave.png" />
            <div className={styles.container}>
                <div className={styles.img}>
                <img src="assets/images/login_pic.svg" />
                </div>
                <div className={styles.login_content}>
                <form className={styles.userForm}>
                    <h2 className={styles.title}>LOGIN</h2>
                    <div className={classnames(styles.input_div, styles.one)}>
                    <div className={styles.i}>
                        <i class="fas fa-user" />
                    </div>
                    <div className={styles.div}>
                        <input type="text" name="id" placeholder="USERNAME" />
                    </div>
                    </div>
                    <div className={classnames(styles.input_div, styles.pass)}>
                    <div className={styles.i}> 
                        <i class="fas fa-lock" />
                    </div>
                    <div className={styles.div}>
                        <input type="password" name="password" placeholder="PASSWORD" />
                    </div>
                    </div>
                    <Link to="" className={styles.userA}>Forgot Password?</Link>
                    <br />
                    <br />
                    <input type="submit" className={styles.btn} value="Login" />
                    
                    <br />
                    <Link to="/register" className={styles.btn_signup}><span>New Here?</span></Link>
                </form>
                </div>
            </div>
        </div>
    );
}

export default Login;