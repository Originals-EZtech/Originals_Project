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
                console.log("auth에서 response.response는??",response.response)
                // 로그인 안했을 경우
                if (!response.response.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                } else {
                    if (option === false) {
                        window.location.replace("/");
                    }
                }
                // null은 pass
            })
        }, [dispatch, props.history])

        return (<SpecificComponent />)
    }
    return AuthenticationCheck
}