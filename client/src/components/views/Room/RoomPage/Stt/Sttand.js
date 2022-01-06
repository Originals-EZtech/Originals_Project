import { useSelector } from "react-redux";
import { connect } from 'react-redux';

const Stt =({word})=>{
   return(
    <div className="st">
        <p className="otherstt">{word}</p>
    </div>
    
   )
  
}

const mapStoreStateToProps = (state) =>{
    return {
        ...state
    }
}

export default connect(mapStoreStateToProps)(Stt);