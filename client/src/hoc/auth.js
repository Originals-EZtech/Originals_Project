import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../components/views/Room/store/actions';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {
    //null    =>  아무나 출입이 가능한 페이지
    //true    =>  로그인한 유저만 출입이 가능한 페이지
    //false   =>  로그인한 유저는 출입 불가능한 페이지        
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth()).then(response => {
                // 로그인 안했을 경우
                if (!response.response.isAuth) {
                    if (option) {
                        window.location.replace('/login')
                    }
                } else {    
                    // isAuth == true
                    // option == false
                    // 로그인은 했지만 못들어옴
                    if (option === false) {
                        props.history.push("/intro");
                    } else {
                        // isAuth == true
                        // option == true
                        // 로그인한사람만 들어올수 있음
                        if (adminRoute) {
                            if (!response.response.isAdmin) {
                                props.history.push("/intro");
                                console.log("isAuth,option,adminRoute true지만 isAdmin은 false")
                            }
                            // option == true
                            // adminRoute == true
                            // isAdmin == true
                            console.log("isAuth,option,adminRoute,isAdmin 전부 true")
                        }
                        console.log("isAuth,option 전부 true")
                    }
                }
                return
                // null은 pass
            })
        }, [dispatch, props.history])

        return (<SpecificComponent />)
    }
    return AuthenticationCheck
}