import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {

    //null    =>  아무나 출입이 가능한 페이지
    //true    =>  로그인한 유저만 출입이 가능한 페이지
    //false   =>  로그인한 유저는 출입 불가능한 페이지        
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)
                // 로그인 안했을 경우
                if (!response.payload.isAuth) {
                    console.log("isAuth: ", response.payload.isAuth)
                    if (option) {
                        props.history.push('/login')
                    }
                } else {
                    // 로그인 상태일때 못가는경우 
                    if (option === false) {
                        props.history.push('/')
                    }
                }
                // 나머진 null

            })
        }, [dispatch, props.history])

        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}