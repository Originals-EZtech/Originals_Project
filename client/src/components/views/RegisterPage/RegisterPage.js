import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import styles from '../RegisterPage/register.module.css';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import SubNavBar from '../NavBar/SubNavBar';

function Register(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfrimPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const test = () => {
        alert("yes");
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log('Email', Email)
        console.log('Password', Password)

        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확은 같아야 합니다.')
        }
        let body = {
            email: Email,
            password: Password
        }


        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    // props.navigate('/login');
                } else {
                    alert("Failed to sign up")
                }
            })
    }

    return (
        <div>
            {/* <section class="preloader">
                <div class="spinner">
                    <span class="spinner-rotate"></span>
                </div>
            </section> */}

            <SubNavBar />

            <img className={styles.wave} src="assets/images/wave2.png" alt="" />
            <div className={styles.container}>
                <div className={styles.login_content}>
                    <form className={styles.userForm} onSubmit={onSubmitHandler}>
                        <h2 className={styles.title}>SIGN UP</h2>
                        <div className={classnames(styles.input_div, styles.one)}>
                            <div className={styles.i}>
                                <i class="fas fa-user" />
                            </div>
                            <div className={styles.div}>
                                <input type="email" value={Email} onChange={onEmailHandler} name="email" placeholder="USERNAME" />
                            </div>
                        </div>
                        <div className={classnames(styles.input_div, styles.pass)}>
                            <div className={styles.i}>
                                <i class="fas fa-lock" />
                            </div>
                            <div className={styles.div}>
                                <input type="password" value={Password} onChange={onPasswordHandler} name="password" placeholder="PASSWORD" />
                            </div>
                        </div>
                        <div className={classnames(styles.input_div, styles.pass)}>
                            <div className={styles.i}>
                                <i class="fas fa-check" />
                            </div>
                            <div className={styles.div}>
                                <input type="password" value={ConfirmPassword} onChange={onConfrimPasswordHandler} name="password" placeholder="VERIFY PASSWORD" />
                            </div>
                        </div>
                        <br />
                        <input type="submit" className={styles.btn} value="SIGN UP" />

                        <br />
                        <Link to="/login" className={styles.btn_signup}><span>One of Us?</span></Link>
                    </form>
                </div>

                <div className={styles.img}>
                    <img src="assets/images/register_pic.svg" alt=""/>
                </div>
            </div>
        </div>
    );
}

export default Register;