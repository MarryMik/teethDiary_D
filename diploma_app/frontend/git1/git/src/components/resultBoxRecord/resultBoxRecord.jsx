import React, {useState, useContext} from 'react'
import "./resultBoxRecord.scss"
import axios from "axios";
const ResultBoxRecord = ({result}) =>{
const [data, setData] = useState({
    user_id: result.iduser,
    username: result.username,
    phone: result.phone,
    workadress: result.workadress,
    specialization: result.specialization
})
const addDoctor=async(e)=>{
    e.preventDefault();
    try{
        const res = await axios.post("http://localhost:8800/doctors",data );
        localStorage.setItem("doctor",JSON.stringify({doctorId:res.data[0].id_doctor,username:res.data[0].doctor_name}));      
        }catch(err){
            console.log(err)
        }
}
    return(
        <div className='result-box__result'>
            <p className='result-box__text_name result-box__text'>{result.username}</p>
            <p className='result-box__text_phone result-box__text'>{result.phone}</p>
            <p className='result-box__text_speciality result-box__text'>{result.specialization}</p>
            <p className='result-box__text_adress result-box__text'>{result.workadress}</p>
            <button className=' form__buttn result-box__butn_choose result-box__text'>
                <p className='buttn__text' onClick={addDoctor}>Обрати</p>
            </button>
        </div>
        )
}
export default ResultBoxRecord 