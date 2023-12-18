import React, {useState, useContext} from 'react'
import "./resultBox.scss"
import axios from "axios";
import { AuthContext } from '../../context/authContext';
const ResultBox = ({result}) =>{
const { currentUser } = useContext(AuthContext);
const [data, setData] = useState({
    doctorId: result.iduser,
    iduser: currentUser.iduser
})
const [error, setError]=useState(false);
const addAccess = async(e) =>{
    e.preventDefault();
    try{
        await axios.post("http://localhost:8800/accesses/share",data ).then(
            window.location.reload(false)
        )
    }catch(err){
        console.log(err)
        setError(true)
    }
}
    return(
        <div className='result-box__result'>
            <p className='result-box__text_name result-box__text'>{result.username}</p>
            <p className='result-box__text_phone result-box__text'>{result.phone}</p>
            <p className='result-box__text_speciality result-box__text'>{result.specialization}</p>
            <p className='result-box__text_adress result-box__text'>{result.workadress}</p>
            <button className=' form__buttn result-box__butn_choose result-box__text'>
                <p className='buttn__text' onClick={addAccess}>Обрати</p>
            </button>
        </div>
        )
}
export default ResultBox 