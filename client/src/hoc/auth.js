import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
// import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {

    //null    =>  아무나 출입이 가능한 페이지
    //true    =>  로그인한 유저만 출입이 가능한 페이지
    //false   =>  로그인한 유저는 출입 불가능한 페이지        
    console.log(1111111111111,"여긴가?")

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        console.log("여긴가?")

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                } else {
                    //로그인 한 상태 
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if (option === false)
                            props.history.push('/')
                    }
                }
            })
        }, [dispatch, props.history])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}