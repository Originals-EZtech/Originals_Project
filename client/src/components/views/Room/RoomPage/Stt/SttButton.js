import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Stt_li from './Stt_middle';
import onbut from '../../resources/images/stt_on_icon.svg';
import offbut from '../../resources/images/stt_off_icon.svg';
import St from './Stt_st';
import St_stop from './Stt_stop';

const Stt_Con=()=>{
    const [but,setbut]=useState(false);
    const state =()=>{
        setbut(!but);
    }
    // console.log(but);
    return(
        <div>
            <img
            className="sttbutton" 
            src={but ? onbut:offbut}
            onClick={state}></img>
            
            
            
        </div>
    );
    
}
 export default Stt_Con;