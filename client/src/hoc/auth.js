import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../redux/actions/actions';

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
                        /**
                         * 로그인유저 못들어옴
                         * isAuth == true
                         * option == false
                         */
                    if (option === false) {
                        props.history.push("/intro");
                    } else {
                        /**
                         * 로그인한사람만 들어올수 있음
                         * isAuth == true
                         * option == true
                         */
                        if (adminRoute) {
                            if (!response.response.isAdmin) {
                                window.location.replace('/intro')
                            }
                        }
                    }
                }
                // null은 pass
            })
        }, [dispatch, props.history])

        return (<SpecificComponent />)
    }
    return AuthenticationCheck
}