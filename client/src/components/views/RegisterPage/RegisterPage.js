import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { registerUser, authEmail } from '../Room/store/actions';
import styles from '../RegisterPage/register.module.css';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import SubNavBar from '../NavBar/SubNavBar';
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Timer from '../../../hoc/authTimer';

function Register(props) {
    const { registerUserAction, authEmailAction } = props;

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [AuthCode, setAuthCode] = useState("");
    const [SecurityCode, setSecurityCode] = useState("");

    const [Time, setTime] = useState(false);

    // 유효성 통과 상태
    // const [IsEmail, setIsEmail] = useState(false)
    // const [IsPassword, setIsPassword] = useState(false)


    // 정규식 메세지 상태
    const [EmailMessage, setEmailMessage] = useState("")
    const [PasswordMessage, setPasswordMessage] = useState("")
    const [ConfirmPasswordMessage, setConfirmPasswordMessage] = useState("")
    const [AuthCodeMessage, setAuthCodeMessage] = useState("")

    const onEmailHandler = (event) => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        setEmail(event.target.value)

        if (event.target.value.length < 1) {
            setEmailMessage('')
        } else if (!emailRegex.test(event.target.value)) {
            setEmailMessage('이메일 형식이 틀렸습니다.')
            // setIsEmail(false)
        } else {
            setEmailMessage('올바른 이메일 형식이에요 ')
            // setIsEmail(true)
        }
    }

    const onNameHandler = (event) => {
        setName(event.target.value)
    }

    const onPasswordHandler = (event) => {
        const passwordRegex =
            /^.*((?=.*[0-9])(?=.*[a-zA-Z]){8,16}).*$/
        setPassword(event.target.value)

        if (event.target.value.length < 1) {
            setPasswordMessage('')
        } else if (event.target.value.length > 16 || !passwordRegex.test(event.target.value) || event.target.value.length < 8) {
            setPasswordMessage('8~16자 영문, 숫자를 사용하세요.')
            // setIsPassword(false)
        } else {
            setPasswordMessage('올바른 비밀번호 형식이에요 ')
            // setIsPassword(true)
        }
    }

    const onConfrimPasswordHandler = (event) => {
        setConfirmPassword(event.target.value)

        if (event.target.value.length < 1) {
            setConfirmPasswordMessage("")
        } else if (Password === event.target.value) {
            setConfirmPasswordMessage("비밀번호가 일치합니다.")
        } else {
            setConfirmPasswordMessage("비밀번호가 틀립니다. 다시 확인해주세요")
        }
    }

    const getAuthCode = (event) => {
        setAuthCode(event.target.value)

        if (event.target.value.length < 1) {
            setAuthCodeMessage("")
        } else if (SecurityCode === event.target.value) {
            setAuthCodeMessage("보안코드 일치해요")
            setTime(false);
        } else {
            setAuthCodeMessage("보안코드가 일치하지않습니다.")
        }
    }

    const authEmailHandler = (e) => {
        e.preventDefault();

        if (Email !== "")
        toast.info('인증 메일을 발송했습니다');
        
        let body = {
            email: Email
        }
        
        authEmailAction(body)
        .then(response => {
            if (response.response.sendCodeSuccess) {
                setSecurityCode(response.response.authNum)
                console.log(response.response.authNum)
                toast.success(response.response.msg)
                // 인증 타이머 시작
                setTime(false);
                setTime(true);
            } else if (!response.response.sendCodeSuccess) {
                toast.error(response.response.msg)
            }
        })
        // dispatch(authEmail(body))
        // .then(response => {
        //     if (response.payload.sendCodeSuccess) {
        //         setSecurityCode(response.payload.authNum)
        //         console.log(response.payload.authNum)
        //         toast.success(response.payload.msg)
        //         // 인증 타이머 시작
        //         setTime(false);
        //         setTime(true);
        //     } else if (!response.payload.sendCodeSuccess) {
        //         toast.error(response.payload.msg)
        //     }
        // })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        // 예외처리

        // 입력하지 않은 값이 존재할 경우
        if (Email === "" || Password === "" || ConfirmPassword === "" || AuthCode === "" || Name === "") {
            return toast.error("모든 값을 입력하세요");
        }

        // 보안코드가 일치하지 않을 경우
        if (AuthCode !== SecurityCode) {
            return toast.error('보안코드가 일치하지 않습니다.');
        }

        // 올바른 비밀번호 형식 아닐 경우
        const passwordRegex =
            /^.*((?=.*[0-9])(?=.*[a-zA-Z]){8,16}).*$/
        if (!passwordRegex.test(Password)) {
            return toast.error('올바른 비밀번호 형식이 아닙니다.');
        }

        // 입력한 비밀번호와 비밀번호 확인이 같지 않을 경우
        if (Password !== ConfirmPassword) {
            return toast.error('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            email: Email,
            password: Password,
            name : Name
        }

        registerUserAction(body)
        .then(response => {
            if (response.response.success) {
                toast.success(response.response.msg);
                setTimeout(() => {
                    props.history.push('/login');
                }, 1200)
            } else {
                toast.error("Failed to sign up")
            }
        })
        // dispatch(registerUser(body))
        //     .then(response => {
        //         if (response.payload.success) {
        //             toast.success(response.payload.msg);
        //             setTimeout(() => {
        //                 props.history.push('/login');
        //             }, 1200)
        //         } else {
        //             toast.error("Failed to sign up")
        //         }
        //     })
    }

    return (
        <div>

            <SubNavBar />

            <img className={styles.wave} src="assets/images/wave2.png" alt="" />
            <div className={styles.container}>
                <div className={styles.login_content}>
                    <form className={styles.userForm} onSubmit={onSubmitHandler}>
                        <h2 className={styles.title} style={{paddingBottom: 0}}>SIGN UP</h2>
                        <div className={classnames(styles.input_div, styles.one)}>
                            <div className={styles.i}>
                                <i className="fas fa-at" />
                            </div>
                            <div className={styles.div}>
                                <input style={{fontSize: 15}} type="email" value={Email} onChange={onEmailHandler} name="email" placeholder="USEREMAIL" />
                            </div>
                        </div>
                        <span >{EmailMessage}</span>

                        <div className={classnames(styles.input_div, styles.pass)}>
                            <div className={styles.i}>
                                <i class="fas fa-check" />
                            </div>
                            <div className={styles.div}>
                                <input style={{fontSize: 15}} type="text" name="AuthCode" placeholder="CODE" value={AuthCode} onChange={getAuthCode} />
                            </div>
                        </div>
                        <span >{AuthCodeMessage}</span>

                        <div className={classnames(styles.input_div, styles.one)}>
                            <div className={styles.i}>
                                <i className="fas fa-user" />
                            </div>
                            <div className={styles.div}>
                                <input style={{fontSize: 15}} type="name" value={Name} onChange={onNameHandler} name="name" placeholder="NAME" />
                            </div>
                        </div>

                        <div className={classnames(styles.input_div, styles.pass)}>
                            <div className={styles.i}>
                                <i className="fas fa-lock" />
                            </div>
                            <div className={styles.div}>
                                <input style={{fontSize: 15}} type="password" value={Password} onChange={onPasswordHandler} name="password" placeholder="PASSWORD" />
                            </div>
                        </div>
                        <span >{PasswordMessage}</span>

                        <div className={classnames(styles.input_div, styles.pass)}>
                            <div className={styles.i}>
                                <i className="fas fa-check" />
                            </div>
                            <div className={styles.div}>
                                <input style={{fontSize: 15}} type="password" value={ConfirmPassword} onChange={onConfrimPasswordHandler} name="password" placeholder="VERIFY PASSWORD" />
                            </div>
                        </div>
                        <span >{ConfirmPasswordMessage}</span>
                        {/* <br /> */}
                        <input type="submit" className={styles.btn} value="SIGN UP" />

                        <br />
                        <Link to="/login" className={styles.btn_signup} ><span>One of Us?</span></Link>
                    </form>

                    <div className={styles.authDiv}>
                        <div>
                            <button onClick={authEmailHandler} className={styles.authBtn}>Authentication</button>
                        </div>
                        {Time ? <Timer mm={1} ss={0} /> : null}
                    </div>
                    
                </div>
                <div className={styles.img}>
                    <img src="assets/images/register_pic.svg" alt="" />
                </div>
            </div>
            <ToastContainer hideProgressBar={true}/>
        </div>
    );
}

const mapActionsToProps = (dispatch) => {
    return {
        registerUserAction: (body) => dispatch(registerUser(body)),
        authEmailAction: (body) => dispatch(authEmail(body))
    }
}

export default withRouter(connect(null, mapActionsToProps)(Register));