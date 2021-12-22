import React, { useState, useEffect } from "react";

const Timer = ({ mm, ss }) => {
    const styleText1 = {
        width: 200,
        fontSize: 12,
    }
    const styleText2 = {
        width: 210,
        fontSize: 11,
    }
    const styleTime = {
        fontSize: 15,
        marginLeft: 30
    }

    const [minutes, setMinutes] = useState(parseInt(mm));
    const [seconds, setSeconds] = useState(parseInt(ss));

    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
            }
            if (parseInt(seconds) === 0) {
                if (parseInt(minutes) === 0) {
                    clearInterval(countdown);
                } else {
                    setMinutes(parseInt(minutes) - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => clearInterval(countdown);
    }, [minutes, seconds]);

    return (
        (minutes === 0) && (seconds == 0) ?        
        <div>
            <h5 style={styleText1}>인증코드 만료</h5>
            <h5 style={styleText2}>인증번호를 다시 발급 받으세요</h5>
        </div>
        :
        <div style={styleTime}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
};

export default Timer;