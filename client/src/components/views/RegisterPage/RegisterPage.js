import React, { useState } from 'react';
import { connect } from 'react-redux';
import styles from '../RegisterPage/register.module.css';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import SubNavBar from '../NavBar/SubNavBar';
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Timer from '../../../hoc/authTimer';
import { authEmail, fileUpload, registerUser } from '../../../redux/actions/actions';

function Register(props) {
    const { registerUserAction, authEmailAction, fileUploadAction } = props;

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [AuthCode, setAuthCode] = useState("");
    const [SecurityCode, setSecurityCode] = useState("");

    const [AuthEmailSuccess, setAuthEmailSuccess] = useState(false);
    const [Time, setTime] = useState(false);
    const [isTeacher, setTeacher] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    // 정규식 메세지 상태
    const [EmailMessage, setEmailMessage] = useState("")
    const [PasswordMessage, setPasswordMessage] = useState("")
    const [ConfirmPasswordMessage, setConfirmPasswordMessage] = useState("")
    const [AuthCodeMessage, setAuthCodeMessage] = useState("")
    const [NameMessage, setNameMessage] = useState("")

    const onEmailHandler = (event) => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        setEmail(event.target.value)

        if (event.target.value.length < 1) {
            setEmailMessage('')
        } else if (!emailRegex.test(event.target.value)) {
            setEmailMessage('이메일 형식을 확인해주세요')
        } else if(event.target.value.length>25){
            setEmailMessage('이메일 길이는 최대 25글자 이내로 사용하세요.')
        } else {
            setEmailMessage('올바른 이메일 형식 - 인증을 진행해주세요 ')
        }
    }

    const onNameHandler = (event) => {
        setName(event.target.value)

        if (event.target.value.length > 15) {
            setNameMessage('이름의 길이는 최대 15글자 이내로 사용하세요.')
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
        } else {
            setPasswordMessage('올바른 비밀번호 형식이에요')
        }
    }

    const onConfrimPasswordHandler = (event) => {
        setConfirmPassword(event.target.value)

        if (event.target.value.length < 1) {
            setConfirmPasswordMessage("")
        }else if(PasswordMessage ==='8~16자 영문, 숫자를 사용하세요.'){
            setConfirmPasswordMessage("8~16자 영문, 숫자를 사용하세요.")
        }else if (Password === event.target.value) {
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

        if (Email !== ""){}
        
        let body = {
            email: Email
        }
        
        authEmailAction(body)
        .then(response => {
            if (response.response.sendCodeSuccess) {
                setSecurityCode(response.response.authNum)
                toast.success(response.response.msg)
                // 인증 타이머 시작
                setTime(false);
                setTime(true);
            } else if (!response.response.sendCodeSuccess) {
                toast.error(response.response.msg)
            }
        })
        setAuthEmailSuccess(true);
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

        if (Email.length >25) {
            return toast.error('이메일 길이는 최대 25글자 이내로 사용하세요.')
        }

        if (Name.length >15) {
            return toast.error('이름은 최대 15글자 이내로 사용하세요.')
        }

        // 입력한 비밀번호와 비밀번호 확인이 같지 않을 경우
        if (Password !== ConfirmPassword) {
            return toast.error('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        

        // 회원가입시 보내줄 body 데이터를 학생 / 선생님 구분해서 서버로 전송
        let body = {}

        if (isTeacher) {
            // 선생님일 경우
            body = {
                email: Email,
                password: Password,
                name : Name,
                role : "general",
                flag : "true"
            }
        } else {
            // 학생일 경우
            body = {
                email: Email,
                password: Password,
                name : Name,
                role : "general",
                flag : "false"
            }
        }
        
        // 학생일 경우 바로 registerUserAction 실행 후 종료
        // 선생님일 경우 아래 모두 실행

        // Teacher 체크박스에 체크만 하고 첨부파일 올리지 않을 경우
        if (isTeacher && (selectedFile === null)) {
            return toast.error('첨부파일을 확인해주세요.')
        }
        
        // user 테이블에 data 먼저 insert
        registerUserAction(body)
        .then(response => {
            if (response.response.success) {
                toast.success(response.response.msg);
                // Teacher일 경우, 회원가입시 함께 첨부한 파일도 서버에 전송
                if (isTeacher) {
                    handleFileUpload();
                }
                setTimeout(() => {
                    props.history.push('/login');
                }, 1200)
            } else {
                toast.error("Failed to sign up")
            }
        })
    }

    // 체크박스 체크여부 확인
    const checkboxHandler = (event) => {
        //이메일(아이디) 입력X 또는 이메일(아이디) 인증X 인 경우
        if (Email === "" || !AuthEmailSuccess || AuthCodeMessage !== "보안코드 일치해요") {
            event.target.checked = false;
            return toast.error("이메일 인증을 먼저 진행해주세요.");
        }

        if (event.target.checked) {
            setTeacher(true);
        } else {
            setTeacher(false);
        }
    }

    // 파일업로드 관련 함수
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const handleFileUpload = (event) => {

        const body = {
            email: Email,
            image: selectedFile
        }

        fileUploadAction(body)
        .then(response => {
            if (response.response.uploadSuccess) {
                // toast.success(response.response.msg);
                alert('선생님은 관리자 승인 후 정상 이용 가능합니다. (최대 1일 소요)')
            } else {
                toast.error(response.response.msg);
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
                        <h2 className={styles.title} style={{paddingBottom: 0}}>SIGN UP</h2>
                        <div className={classnames(styles.input_div, styles.one)}>
                            <div className={styles.i}>
                                <i className="fas fa-at" />
                            </div>
                            <div className={styles.div}>
                                <input maxLength={26} style={{fontSize: "large", fontWeight: "bold"}} type="email" value={Email} onChange={onEmailHandler} name="email" placeholder="EMAIL" />
                            </div>
                        </div>
                        <span >{EmailMessage}</span>

                        <div className={classnames(styles.input_div, styles.pass)}>
                            <div className={styles.i}>
                                <i class="fas fa-check" />
                            </div>
                            <div className={styles.div}>
                                <input style={{fontSize: "large", fontWeight: "bold"}} type="text" name="AuthCode" placeholder="CODE" value={AuthCode} onChange={getAuthCode} />
                            </div>
                        </div>
                        <span >{AuthCodeMessage}</span>

                        <div className={classnames(styles.input_div, styles.one)}>
                            <div className={styles.i}>
                                <i className="fas fa-user" />
                            </div>
                            <div className={styles.div}>
                                <input maxLength={15} style={{fontSize: "large", fontWeight: "bold"}} type="name" value={Name} onChange={onNameHandler} name="name" placeholder="NAME" />
                            </div>
                        </div>
                        <span >{NameMessage}</span>


                        <div className={classnames(styles.input_div, styles.pass)}>
                            <div className={styles.i}>
                                <i className="fas fa-lock" />
                            </div>
                            <div className={styles.div}>
                                <input style={{fontSize: "large", fontWeight: "bold"}} type="password" value={Password} onChange={onPasswordHandler} name="password" placeholder="PASSWORD" />
                            </div>
                        </div>
                        <span >{PasswordMessage}</span>

                        <div className={classnames(styles.input_div, styles.pass)}>
                            <div className={styles.i}>
                                <i className="fas fa-check" />
                            </div>
                            <div className={styles.div}>
                                <input style={{fontSize: "large", fontWeight: "bold"}} type="password" value={ConfirmPassword} onChange={onConfrimPasswordHandler} name="password" placeholder="VERIFY PASSWORD" />
                            </div>
                        </div>
                        <span >{ConfirmPasswordMessage}</span>
                        {/* <br /> */}
                        <input type="submit" className={styles.btn} value="SIGN UP" />

                        <br />
                        <Link to="/login" className={styles.btn_signup} ><span>One of Us?</span></Link>
                    </form>

                    <div className={styles.authDiv}>
                        <div className={styles.authentication}>
                            <button onClick={authEmailHandler} className={styles.authBtn}>Authentication</button>
                            {Time ? <Timer mm={1} ss={0} /> : null}
                        </div>
                        <div className={styles.checkRole}>
                            <label className={styles.checkbox_container}>
                                <input type="checkbox" value={isTeacher} onChange={checkboxHandler} />
                                <span>Teacher?</span><br/>
                                <span className={styles.checkmark}></span>
                            </label>
                        </div>
                        {
                            isTeacher
                            ?
                            <div style={{display:"block"}}>
                                <form onSubmit={handleFileUpload}>
                                    <input type="file" name="image" accept="image/*" onChange={handleFileChange}/>
                                </form>
                            </div>
                            : null
                        }

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
        authEmailAction: (body) => dispatch(authEmail(body)),
        fileUploadAction: (body) => dispatch(fileUpload(body))
    }
}

export default withRouter(connect(null, mapActionsToProps)(Register));