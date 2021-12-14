import React from 'react';
import styles from '../LoginPage/login.module.css';
import classnames from 'classnames';
import { createGlobalStyle } from 'styled-components';

function Login() {

    const GlobalStyle = createGlobalStyle`
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
            overflow: hidden;
        }`;

    return (
        <>
            <img className={styles.wave} src="assets/images/wave.png" />
            <div className={styles.container}>
                <div className={styles.img}>
                <img src="assets/images/login_pic.svg" />
                </div>
                <div className={styles.login_content}>
                <form className={styles.userForm}>
                    <img src="assets/images/avatar.svg" />
                    <h2 className={styles.title}>Welcome</h2>
                    <div className={classnames(styles.input_div, styles.one)}>
                    <div className={styles.i}>
                        <i class="fas fa-user" />
                    </div>
                    <div className={styles.div}>
                        <h5>Username</h5>
                        <input type="text" className={styles.input} />
                    </div>
                    </div>
                    <div className={classnames(styles.input_div, styles.pass)}>
                    <div className={styles.i}> 
                        <i class="fas fa-lock" />
                    </div>
                    <div className={styles.div}>
                        <h5>Password</h5>
                        <input type="password" className={styles.input} />
                    </div>
                    </div>
                    <a href="#">Forgot Password?</a>
                    <input type="submit" className={styles.btn} defaultValue="Login" />
                </form>
                </div>
            </div>
        </>
    );
}

export default Login;