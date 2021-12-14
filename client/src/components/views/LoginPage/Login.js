import React, { useEffect, useRef } from 'react';
import styles from '../LoginPage/login.module.css';
import classnames from 'classnames';

function Login() {

    const input1 = useRef();
    const input2 = useRef();
    
    const addcl = (e) => {
        let parent = e.target.parentNode;
        parent.classList.add("focus");
        console.log('1.addcl');
    }

    const remcl = (e) => {
        let parent = e.target.parentNode;
        if(e.target.value == ""){
            parent.classList.remove("focus");
            console.log('2.remcl');
        }
    }

    useEffect(() => {
        input1.current.addEventListener("focus", addcl);
        input1.current.addEventListener("blur", remcl);

        input2.current.addEventListener("focus", addcl);
        input2.current.addEventListener("blur", remcl);

        console.log('yeah')

    }, [])

    const EmailHandler = (e) => {
        input1.current.addEventListener("focus", addcl);
        input1.current.addEventListener("blur", remcl);
    }

    const PasswordHandler = (e) => {
        input2.current.addEventListener("focus", addcl);
        input2.current.addEventListener("blur", remcl);
    }

    return (
        <div>
            <section class="preloader">
                <div class="spinner">
                    <span class="spinner-rotate"></span>
                </div>
            </section>

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
                    <div className="div">
                        <h5>Username</h5>
                        <input type="text" className="input" ref={input1} onChange={EmailHandler} />
                    </div>
                    </div>
                    <div className={classnames(styles.input_div, styles.pass)}>
                    <div className={styles.i}> 
                        <i class="fas fa-lock" />
                    </div>
                    <div className="div">
                        <h5>Password</h5>
                        <input type="password" className="input" ref={input2} onChange={PasswordHandler} />
                    </div>
                    </div>
                    <a href="#" className={styles.userA}>Forgot Password?</a>
                    <input type="submit" className={styles.btn} value="Login" />
                    <input type="submit" className={styles.btn} value="Sign Up" />
                </form>
                </div>
            </div>
        </div>
    );
}

export default Login;