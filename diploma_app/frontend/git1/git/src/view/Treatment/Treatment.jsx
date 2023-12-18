import "./treatment.scss";
import React, { useEffect, useState, useRef, useContext }from 'react'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import {useQuery } from 'react-query'
import { makeRequest } from '../../axios';
import RecordCard from "../../components/recordCard/recordCard.jsx";
import { useMutation, queryClient } from "react-query";
const Treatment = ({treatmentId}) => {
const nameInput = useRef(null);
const dateInStart = useRef(null);
const dateInEnd = useRef(null);
const ArrUpdate =[];
const treatment = JSON.parse(localStorage.getItem("treatment"));
const {isLoading:recordsLoading, error: recordsError, data: recordsData} =useQuery(['records'], ()=>
makeRequest.get("records/view/trt?idtreatment="+JSON.parse(localStorage.getItem("treatment")).idtreatment).then(res=>{
  res.data.forEach((el)=>{
        if(el.record_date!==null && el.record_date!==""){
          let recDate = new Date(el.record_date);
          el.record_date = `${recDate.getFullYear()}-${recDate.getMonth()+1}-${recDate.getDate()}`
        }
      })
      if(treatment.idtreatment>=0){
        return res.data;
      }      
}));
  const navigate=useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [treatmentInputs, setTreatmentInputs]= useState({
      treatment_name: "",
      start_date: "",
      end_date: "",
      iduser: currentUser.iduser
  });
  const [treatmentResult, setTreatmentResult] = useState(
    JSON.parse(localStorage.getItem("treatment")) || null
  );
  const [error, setError]=useState(false);
  const handleChange = (e) =>{
    setTreatmentInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleChangeStDate = (e)=>{
    setTreatmentInputs((prev) => ({ ...prev, [e.target.name]: e.target.value.slice(0,10) }));
  }
  const handleChangeEnDate = (e)=>{
    setTreatmentInputs((prev) => ({ ...prev, [e.target.name]: e.target.value.slice(0,10) }));
  }
  const updateMutation = useMutation(
    (upd) => {
      return makeRequest.put("/treatments/api/"+treatment.idtreatment, upd);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["treatments"]);
      },
    }
    );
  const createTreatment = async(e)=>{
    if(treatment.idtreatment>=0){
      updateMutation.mutate(ArrUpdate[0])
    }else{
      e.preventDefault();
      try{
        const res = await axios.post("http://localhost:8800/treatments",treatmentInputs );
        setTreatmentResult(res.data[0]);
      }catch(err){
          console.log(err)
          setError(true)
      }
    }
  }
  const newRecord =(e)=>{
    e.preventDefault();
   if(treatmentResult.idtreatment!==undefined){
     localStorage.setItem("treatment", JSON.stringify(treatmentResult));
    navigate("/record");
   }else{
    alert("Спочатку створіть Лікування!")
   }
  }
  if(treatment.idtreatment>=0){
    if(nameInput.current!==null && dateInEnd.current!==null && dateInStart.current!==null){
        nameInput.current.defaultValue=treatment.treatment_name;
        if(dateInStart.current.value==""){
          dateInStart.current.valueAsDate= new Date(treatment.start_date_trtment);
          dateInEnd.current.valueAsDate= new Date(treatment.end_date_trtment);
        }
        ArrUpdate.push({
          treatment_name: nameInput.current.value,
          start_date: dateInStart.current.value.slice(0,10),
          end_date: dateInEnd.current.value.slice(0,10),
          idtreatment: treatment.idtreatment
        });
        localStorage.setItem("treatment", JSON.stringify(
          {"idtreatment":ArrUpdate[0].idtreatment,
          "treatment_name":ArrUpdate[0].treatment_name,
          "start_date_trtment": ArrUpdate[0].start_date,
          "end_date_trtment": ArrUpdate[0].end_date,        
          }));
    }
    }
  return (
    <>
      <form className='treatment'>
        <div className='treatment-wrap'>
          <p className='treatment__text_header'>Лікування</p>
          <div className='treatment__input-wrap'>
            <p className="treatment__text_name treatment__text_title">Назва:</p>
            <input type="text" className='treatment__input_name treatment__input' ref={nameInput} name="treatment_name" onChange={handleChange}/>
          </div>
          <div className='treatment__input-wrap'>
            <p className="treatment__text_period treatment__text_title">Період:</p>
            <div className="treatment__period-wrap">
              <div className='treatment__date-start_wrap treatment__date_wrap'>
                <p className="treatment__text_start treatment__text_title">з</p>
                <input type="date" className='treatment__input_start-date treatment__input' ref={dateInStart} name="start_date" onChange={handleChangeStDate} />
              </div>
              <div className='treatment__date-end_wrap treatment__date_wrap'>
                <p className="treatment__text_end treatment__text_title">до</p>
                <input type="date" className='treatment__input_end-date treatment__input' ref={dateInEnd} name="end_date" onChange={handleChangeEnDate}/>
              </div>  
            </div>
          </div>
          <div className='treatment__record_wrap'>
            <p className="treatment__text_record treatment__text_title">Записи:</p>
            <button className='buttn__record' onClick={newRecord}><p className="buttn__text_record">Додати запис</p></button>
          </div>
          <div className='record__area'>
            {recordsError
            ? ""
            : recordsLoading
            ? ""
            :recordsData==undefined
            ? ""
            : recordsData.map((records) => <RecordCard teeth_record={records} key={records.idrecord}/>)  
            }
          </div>
          <div className='treatment__buttn-wrap'>
            <button className='treatment__buttn'><p className='treatment__buttn-text_save' onClick={createTreatment}>Зберегти</p></button>
          </div>
        </div>
      </form>
    </>
  )
}
export default Treatment