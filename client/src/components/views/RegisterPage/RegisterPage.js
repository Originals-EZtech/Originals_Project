import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser, authEmail } from '../../../_actions/user_action';
import styles from '../RegisterPage/register.module.css';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import SubNavBar from '../NavBar/SubNavBar';

function Register(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [authCode, setAuthCode] = useState("");
    const [securityCode, setSecurityCode] = useState("");

    // 유효성 통과 상태
    const [isEmail, setIsEmail] = useState(false)

    // 정규식 메세지 상태
    const [EmailMessage, setEmailMessage] = useState("")
    const [PasswordMessage, setPasswordMessage] = useState("")
    const [ConfirmPasswordMessage, setConfirmPasswordMessage] = useState("")


    const onEmailHandler = (event) => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        setEmail(event.currentTarget.value)
        if (!emailRegex.test(Email)) {
            setEmailMessage('이메일 형식이 틀렸습니다.')
            setIsEmail(false)
        } else {
            setEmailMessage('올바른 이메일 형식이에요 ')
            setIsEmail(true)
        }
    }

    const onPasswordHandler = (event) => {
        const passwordRegex = 
        /^.*((?=.*[0-9])(?=.*[a-zA-Z]){8,16}).*$/
        setPassword(event.currentTarget.value)
        if(!passwordRegex.test(Password)){
            setPasswordMessage('8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.')
        } else {
            setPasswordMessage('올바른 비밀번호 형식이에요 ')
        }

    }

    const onConfrimPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
        if (Password.length < 1) {
            setConfirmPasswordMessage("패스워드 입력")
        }
        if (Password === event.target.value) {
            setConfirmPasswordMessage("비밀번호가 일치합니다.")
        } else {
            setConfirmPasswordMessage("비밀번호가 틀립니다. 다시 확인해주세요")
        }
    }

    const getAuthCode = (event) => {
        setAuthCode(event.currentTarget.value)
    }



    const authEmailHandler = (e) => {
        e.preventDefault();
        console.log('client에서 받아온  Email', Email)

        let body = {
            email: Email
        }
        console.log('client에서 받아온  body1', body)


        // action으로 변경중
        // axios.post('/api/users/emailauth', body)
        //     .then((res) => console.log(res))


        dispatch(authEmail(body))
            // console.log('client에서 받아온  body2', body)
            .then(response => {
                if (response.payload.sendCodeSuccess) {
                    setSecurityCode(response.payload.authNum)
                    console.log("securityCode : ", securityCode)
                } else if (!response.payload.sendCodeSuccess) {
                    console.log(1, response.payload.msg);
                    alert(response.payload.msg)
                }
                console.log(2, "authEmaili")
            })

        console.log("인증 코드 끝   ")
        // // alert("인증 완료오")
    }



    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        console.log('Email', Email)
        console.log('Password', Password)

        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }
        let body = {
            email: Email,
            password: Password
        }

        //         // action으로 변경중
        // axios.post('/api/users/login', body)
        // .then(response =>{
        // })
        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    // props.navigate('/login');
                    alert("success to sign up")
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
                        <span >{EmailMessage}</span>
                        <div className={classnames(styles.input_div, styles.one)}>
                            <div className={styles.div}>
                                <button onClick={authEmailHandler}>이메일 인증</button>
                            </div>
                        </div>





                        <div className={classnames(styles.input_div, styles.pass)}>
                            <div className={styles.i}>
                                <i class="fas fa-check" />
                            </div>
                            <div className={styles.div}>
                                <input type="text" name="authCode" placeholder="CODE" value={authCode} onChange={getAuthCode} />
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
                        <span >{PasswordMessage}</span>

                        <div className={classnames(styles.input_div, styles.pass)}>
                            <div className={styles.i}>
                                <i class="fas fa-check" />
                            </div>
                            <div className={styles.div}>
                                <input type="password" value={ConfirmPassword} onChange={onConfrimPasswordHandler} name="password" placeholder="VERIFY PASSWORD" />
                            </div>
                        </div>
                        <span >{ConfirmPasswordMessage}</span>
                        <br />
                        <input type="submit" className={styles.btn} value="SIGN UP" />

                        <br />
                        <Link to="/login" className={styles.btn_signup} ><span>One of Us?</span></Link>
                    </form>
                </div>


                <div className={styles.img}>
                    <img src="assets/images/register_pic.svg" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Register;