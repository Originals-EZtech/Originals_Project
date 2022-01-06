import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../components/views/Room/store/actions';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {
    /**
     *  option
     *  null    =>  아무나 출입이 가능한 페이지
     *  true    =>  로그인한 유저만 출입이 가능한 페이지
     *  false   =>  로그인한 유저는 출입 불가능한 페이지 
     * 
     *  adminRoute
     *  true    =>  어드민만 접근가능
     */
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
                    // 로그인유저 못들어옴
                    if (option === false) {
                        props.history.push("/intro");
                    } else {
                        // isAuth == true
                        // option == true
                        // 로그인한사람만 들어올수 있음

                        // adminRoute == true
                        if (adminRoute) {
                            // isAdmin == false
                            if (!response.response.isAdmin) {
                                props.history.push("/intro");
                            }
                            // adminRoute == true
                            // isAdmin == false
                        }
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