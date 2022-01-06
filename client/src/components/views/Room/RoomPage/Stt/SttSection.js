import React, { useState } from 'react';
import Stt from './Sttand';
import Dictaphone from './Stt';
const Sttsection=()=>{
    return(
        <div className="Sttcontanor">
            <Dictaphone />
            <Stt />
            
        </div>
    );
}

export default Sttsection;