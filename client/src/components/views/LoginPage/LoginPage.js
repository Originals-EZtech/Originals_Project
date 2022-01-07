/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import styles from '../LoginPage/login.module.css';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import SubNavBar from '../NavBar/SubNavBar';
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { loginUser } from '../Room/store/actions'

function Login(props) {
    // const dispatch = useDispatch();
    const { loginUserAction } = props;

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log('Email', Email)
        console.log('Password', Password)

        let body = {
            email: Email,
            password: Password
        }
        console.log("body: ",body)

        loginUserAction(body)
        .then(response => {
            // console.log(response.response);
            if (response.response.loginSuccess) {
                // alert(response.payload.msg);
                toast.success(response.response.msg);
                // 뒤로가기 방지 페이지 이동
                // window.location.href="/";
                setTimeout(() => {
                    props.history.push('/intro');
                }, 1200)
            } else {
                toast.error(response.response.msg);
            }
        })
    }

    return (
        <div>

            <SubNavBar />

            <img className={styles.wave} src="assets/images/wave.png" />
            <div className={styles.container}>
                <div className={styles.img}>
                    <img src="assets/images/login_pic.svg" />
                </div>
                <div className={styles.login_content}>
                    <form className={styles.userForm} onSubmit={onSubmitHandler}>
                        <h2 className={styles.title}>LOGIN</h2>
                        <div className={classnames(styles.input_div, styles.one)}>
                            <div className={styles.i}>
                                <i class="fas fa-user" />
                            </div>
                            <div className={styles.div}>
                                <input style={{fontSize: "large", fontWeight: "bold"}} type="email" value={Email} onChange={onEmailHandler} name="id" placeholder="USERNAME" />
                            </div>
                        </div>
                        <div className={classnames(styles.input_div, styles.pass)}>
                            <div className={styles.i}>
                                <i class="fas fa-lock" />
                            </div>
                            <div className={styles.div}>
                                <input style={{fontSize: "large", fontWeight: "bold"}} type="password" value={Password} onChange={onPasswordHandler} name="password" placeholder="PASSWORD" />
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
            <ToastContainer hideProgressBar={true}/>
        </div>
    );
}

const mapActionsToProps = (dispatch) => {
    return {
        loginUserAction: (body) => dispatch(loginUser(body))
    }
}

export default withRouter(connect(null, mapActionsToProps)(Login));