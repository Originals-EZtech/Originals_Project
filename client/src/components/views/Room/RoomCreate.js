import { process_params } from 'express/lib/router';
import React from 'react';
import RoomContext from "./RoomContext";
import RoomCreateComp from './RoomCreateComp';

function RoomCreate() {

    // min ~ max 사이 랜덤값 추출 
    const getRandomInt = (min, max) =>{
        min = Math.ceil(min); //올림
        max = Math.floor(max); //내림
    return Math.floor(Math.random() * (max - min)) + min; // 최대값은 제외, 최소값은 포함
    };
    //랜덤문자 아스키코드
    const getGUID = (randomlength) =>{
        let result = '';
        let random_roomid='';
        for(let i =0; i < randomlength; i++){
        random_roomid += String.fromCharCode(getRandomInt(33, 125))
        }
        result=random_roomid;
    return result;
    }
    return (
        <RoomContext.Provider value = {{name : getGUID(10)}}>
        <div>
            <h3>방 만들기</h3><br></br>
            <RoomCreateComp />
        </div>
        </RoomContext.Provider>
    );
};

export default RoomCreate;