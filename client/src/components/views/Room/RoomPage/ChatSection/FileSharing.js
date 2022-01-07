import react, {useState} from "react";
import fileSendingButton from "../../resources/images/fileSendingButton.svg";
import * as webRTCHandler from "../../utils/webRTCHandler"; 
import {setDisabled} from '../../store/actions'; 
import store from '../../store/store.js'
import {connect} from 'react-redux';

const FileSharing = ({gotFile, fileName})=>{
    const [file, setFileData] = useState(null);



    const setFile = () =>{
        const file = document.getElementById('fileItem');
        setFileData(file.files[0]);
        console.log(file.files[0]);
        store.dispatch(setDisabled(true)) 
      }

      const sendFile=()=>{
        if(file){
            webRTCHandler.sendFileUsingDataChannel(file);
            setFileData(null);
        }
        store.dispatch(setDisabled(false));
      }

      let downloadPrompt;
      if(gotFile){
          downloadPrompt =(
              <div>
                  <p>{fileName}</p>
                  <button onClick ={webRTCHandler.download}>yes</button>
              </div>
          )
      }

    return(
        <div className="new_file_container">
            <label className = 'file_container'>
            <input 
            id ='fileItem' 
            type='file' 
            style={{display: 'none'}}
            onChange={setFile}/> 
            <img 
            className="file_sending_button"
            src={fileSendingButton}
            />
            </label>
            <div>
                {downloadPrompt}
            </div>

            <label>
                <button onClick={sendFile}>send File</button>
            </label>
        </div>

    )

}
const mapStoreStateToProps = (state) =>{
    return {
        ...state,
    };
  };

export default connect(mapStoreStateToProps)(FileSharing);