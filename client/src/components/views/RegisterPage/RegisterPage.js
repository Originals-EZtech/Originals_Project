import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { registerUser, authEmail } from '../../../_actions/user_action';
import styles from '../RegisterPage/register.module.css';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import SubNavBar from '../NavBar/SubNavBar';

function Register(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [AuthCode, setAuthCode] = useState("");
    const [SecurityCode, setSecurityCode] = useState("");

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
        } else {
            setAuthCodeMessage("보안코드가 일치하지않습니다.")
        }
    }

    const authEmailHandler = (e) => {
        e.preventDefault();

        let body = {
            email: Email
        }
        
        dispatch(authEmail(body))
        .then(response => {
            if (response.payload.sendCodeSuccess) {
                setSecurityCode(response.payload.authNum)
                console.log(response.payload.authNum)
                alert('인증 메일 발송 완료');
            } else if (!response.payload.sendCodeSuccess) {
                alert(response.payload.msg)
            }
            })
            console.log(22222222222)

    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        // 예외처리

        // 입력하지 않은 값이 존재할 경우
        if (Email === "" || Password === "" || ConfirmPassword === "" || AuthCode === "") {
            return alert('모든 값을 입력하세요');
        }

        // 이메일 인증 안했을 경우

        // 보안코드가 일치하지 않을 경우
        if (AuthCode !== SecurityCode) {
            return alert('보안코드가 일치하지 않습니다.');
        }

        // 올바른 비밀번호 형식 아닐 경우
        const passwordRegex =
            /^.*((?=.*[0-9])(?=.*[a-zA-Z]){8,16}).*$/
        if (!passwordRegex.test(Password)) {
            return alert('올바른 비밀번호 형식이 아닙니다.');
        }

        // 입력한 비밀번호와 비밀번호 확인이 같지 않을 경우
        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }


        let body = {
            email: Email,
            password: Password
        }

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    alert("success to sign up")
                    props.history.push('/login');
                } else {
                    alert("Failed to sign up")
                }
            })
    }

    return (
        <div>

            <SubNavBar />

            <img className={styles.wave} src="assets/images/wave2.png" alt="" />
            <div className={styles.container}>
                <div className={styles.login_content}>
                    <form className={styles.userForm} onSubmit={onSubmitHandler}>
                        <h2 className={styles.title}>SIGN UP</h2>
                        <div className={classnames(styles.input_div, styles.one)}>
                            <div className={styles.i}>
                                <i className="fas fa-user" />
                            </div>
                            <div className={styles.div}>
                                <input type="email" value={Email} onChange={onEmailHandler} name="email" placeholder="USERNAME" />
                            </div>
                        </div>
                        <span >{EmailMessage}</span>

                        <div className={classnames(styles.input_div, styles.pass)}>
                            <div className={styles.i}>
                                <i class="fas fa-at" />
                            </div>
                            <div className={styles.div}>
                                <input type="text" name="AuthCode" placeholder="CODE" value={AuthCode} onChange={getAuthCode} />
                            </div>
                        </div>
                        <span >{AuthCodeMessage}</span>

                        <div className={classnames(styles.input_div, styles.pass)}>
                            <div className={styles.i}>
                                <i className="fas fa-lock" />
                            </div>
                            <div className={styles.div}>
                                <input type="password" value={Password} onChange={onPasswordHandler} name="password" placeholder="PASSWORD" />
                            </div>
                        </div>
                        <span >{PasswordMessage}</span>

                        <div className={classnames(styles.input_div, styles.pass)}>
                            <div className={styles.i}>
                                <i className="fas fa-check" />
                            </div>
                            <div className={styles.div}>
                                <input type="password" value={ConfirmPassword} onChange={onConfrimPasswordHandler} name="password" placeholder="VERIFY PASSWORD" />
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
                    </div>
                </div>
                <div className={styles.img}>
                    <img src="assets/images/register_pic.svg" alt="" />
                </div>
            </div>
        </div>
    );
}

export default withRouter(Register);