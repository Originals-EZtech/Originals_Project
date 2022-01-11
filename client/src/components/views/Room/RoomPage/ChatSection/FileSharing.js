import react, {useState} from "react";
import fileSendingButton from "../../resources/images/fileSendingButton.svg";
import * as webRTCHandler from "../../utils/webRTCHandler"; 
import {connect} from 'react-redux';
import { setDisabled, setGotFile } from "../../../../../redux/actions/actions";
import store from "../../../../../redux/store/store";
import download from "../../resources/images/download.svg"
import file_upload from "../../resources/images/file_upload.svg"
import {toast} from 'react-toastify';

const FileSharing = ({gotFile, fileName})=>{
    const [file, setFileData] = useState(null);

    const setFile = () =>{
        const file = document.getElementById('fileItem');
        //if(file.files[0].length < )
        setFileData(file.files[0]);
        console.log(file.files[0]);
        document.getElementById("fileItem").value = "";
        store.dispatch(setDisabled(true));
      }

      const sendFile=()=>{
        if(file){
            webRTCHandler.sendFileUsingDataChannel(file);
            setFileData(null);
            console.log(file.files)
            toast.success('Your file was sent successfully!');
        }
        store.dispatch(setDisabled(false));
      }

      let downloadPrompt;
      let fileNamePrompt;
      if(gotFile){
          downloadPrompt =(
              <div className="file_sen">
                  <p className="file_na">{fileName}</p>
                  <img
                    className="file_down"
                    onClick={webRTCHandler.download}
                    src={download}
                  ></img>
              </div>
          )
      }
      if(file !== null){
          fileNamePrompt =(
              <div className="file_name">
                  <p className="file_na">{file.name}</p>
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
                {fileNamePrompt}
            </div>

            <label>
                <img
                className="file_up"
                onClick={sendFile}
                src={file_upload}
                ></img>
                
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