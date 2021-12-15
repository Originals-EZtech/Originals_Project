import React from 'react';
import styles from '../RegisterPage/register.module.css';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import SubNavBar from '../NavBar/SubNavBar';

function Register() {
   
    return (
        <div>
            {/* <section class="preloader">
                <div class="spinner">
                    <span class="spinner-rotate"></span>
                </div>
            </section> */}

            <SubNavBar />

            <img className={styles.wave} src="assets/images/wave2.png" />
            <div className={styles.container}>
                <div className={styles.login_content}>
                    <form className={styles.userForm}>
                        <h2 className={styles.title}>SIGN UP</h2>
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
                        <div className={classnames(styles.input_div, styles.pass)}>
                        <div className={styles.i}> 
                            <i class="fas fa-check" />
                        </div>
                        <div className={styles.div}>
                            <input type="password" name="password" placeholder="VERIFY PASSWORD" />
                        </div>
                        </div>
                        <br />
                        <input type="submit" className={styles.btn} value="SIGN UP" />
                        
                        <br />
                        <Link to="/login" className={styles.btn_signup}><span>One of Us?</span></Link>
                    </form>
                </div>

                <div className={styles.img}>
                    <img src="assets/images/register_pic.svg" />
                </div>
            </div>
        </div>
    );
}

export default Register;