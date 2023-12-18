import React, { useEffect, useState, useRef } from 'react'
import star_icon from "../../images/icons/svges/checked_favorite_star_favourite_rating_icon (1).svg"
import star_icon2 from "../../images/icons/svges/checked_favorite_star_favourite_rating_icon.svg"
import "./teethrecord.scss";
import ResultBoxRecord from '../../components/resultBoxRecord/resultBoxRecord';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { makeRequest } from '../../axios';
import { useMutation, queryClient } from "react-query";
import {useQuery } from 'react-query';
import ProcedureCard from '../../components/procedureCard/procedureCard.jsx';
const TeethRecord = ({recordId}) => {
  const navigate=useNavigate();
  const [error, setError]=useState(false);
  const treatment = localStorage.getItem("treatment");
  const star_1 = useRef(null);
  const star_2 = useRef(null);
  const star_3 = useRef(null);
  const star_4 = useRef(null);
  const star_5 = useRef(null);
  const star_6 = useRef(null);
  const star_7 = useRef(null);
  const star_8 = useRef(null);
  const star_9 = useRef(null);
  const star_10 = useRef(null);
  const doctor_box = useRef(null);
  const doctorSearchResult = useRef(null);
  const dateRef= useRef(null);
  const adressRef= useRef(null);
  const prescrRef= useRef(null);
  const ratingRef= useRef(null);
  const ArrUpdate=[];
  const recordFromStorage = JSON.parse(localStorage.getItem("record"));
  const {isLoading: proceduresLoading, error: proceduresError, data: proceduresData} =useQuery(['procedures'], ()=>
  makeRequest.get("/procedures/view/rec?idrecord="+recordFromStorage.idrecord).then(res=>{
    return res.data;
  }));
  const [record, setRecordData]= useState({
    doctor_id: "",
    record_date: "",
    treatment_id: JSON.parse(treatment).idtreatment,
    rating: 0,
    record_adress: "",
    prescription: ""
  })
  const handleChange = (e) =>{
    setRecordData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }; 
  const [stars, setStar]=useState({
    star1: 0,
    star2: 0,
    star3: 0,
    star4: 0,
    star5: 0,
    star6: 0,
    star7: 0,
    star8: 0,
    star9: 0,
    star10: 0
  })
  const [ratingValue, setRating]=useState("");
  if(ratingRef.current!==null){
    if(ratingRef.current.innerText==10){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon2;
      star_4.current.src = star_icon2;
      star_5.current.src = star_icon2;
      star_6.current.src = star_icon2;
      star_7.current.src = star_icon2;
      star_8.current.src = star_icon2;
      star_9.current.src = star_icon2;
      star_10.current.src = star_icon2;
    }
    else if(ratingRef.current.innerText==9){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon2;
      star_4.current.src = star_icon2;
      star_5.current.src = star_icon2;
      star_6.current.src = star_icon2;
      star_7.current.src = star_icon2;
      star_8.current.src = star_icon2;
      star_9.current.src = star_icon2;
      star_10.current.src = star_icon;
    }
    else if(ratingRef.current.innerText==8){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon2;
      star_4.current.src = star_icon2;
      star_5.current.src = star_icon2;
      star_6.current.src = star_icon2;
      star_7.current.src = star_icon2;
      star_8.current.src = star_icon2;
      star_9.current.src = star_icon;
      star_10.current.src = star_icon;
    }
    else if(ratingRef.current.innerText==7){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon2;
      star_4.current.src = star_icon2;
      star_5.current.src = star_icon2;
      star_6.current.src = star_icon2;
      star_7.current.src = star_icon2;
      star_8.current.src = star_icon;
      star_9.current.src = star_icon;
      star_10.current.src = star_icon;
    }
    else if(ratingRef.current.innerText==6){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon2;
      star_4.current.src = star_icon2;
      star_5.current.src = star_icon2;
      star_6.current.src = star_icon2;
      star_7.current.src = star_icon;
      star_8.current.src = star_icon;
      star_9.current.src = star_icon;
      star_10.current.src = star_icon;
    }
    else if(ratingRef.current.innerText==5){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon2;
      star_4.current.src = star_icon2;
      star_5.current.src = star_icon2;
      star_6.current.src = star_icon;
      star_7.current.src = star_icon;
      star_8.current.src = star_icon;
      star_9.current.src = star_icon;
      star_10.current.src = star_icon;
    }
    else if(ratingRef.current.innerText==4){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon2;
      star_4.current.src = star_icon2;
      star_5.current.src = star_icon;
      star_6.current.src = star_icon;
      star_7.current.src = star_icon;
      star_8.current.src = star_icon;
      star_9.current.src = star_icon;
      star_10.current.src = star_icon;
    }
    else if(ratingRef.current.innerText==3){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon2;
      star_4.current.src = star_icon;
      star_5.current.src = star_icon;
      star_6.current.src = star_icon;
      star_7.current.src = star_icon;
      star_8.current.src = star_icon;
      star_9.current.src = star_icon;
      star_10.current.src = star_icon;
    }
    else if(ratingRef.current.innerText==2){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon;
      star_4.current.src = star_icon;
      star_5.current.src = star_icon;
      star_6.current.src = star_icon;
      star_7.current.src = star_icon;
      star_8.current.src = star_icon;
      star_9.current.src = star_icon;
      star_10.current.src = star_icon;
    }
    else if(ratingRef.current.innerText==1){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon;
      star_3.current.src = star_icon;
      star_4.current.src = star_icon;
      star_5.current.src = star_icon;
      star_6.current.src = star_icon;
      star_7.current.src = star_icon;
      star_8.current.src = star_icon;
      star_9.current.src = star_icon;
      star_10.current.src = star_icon;
    }
  }
  const ratingUpdate =(e)=>{
    setStar(()=>({[e.target.name]: 1}));
    if( e.target.name =="star10"){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon2;
      star_4.current.src = star_icon2;
      star_5.current.src = star_icon2;
      star_6.current.src = star_icon2;
      star_7.current.src = star_icon2;
      star_8.current.src = star_icon2;
      star_9.current.src = star_icon2;
      star_10.current.src = star_icon2;
      setRating(10);
      setRecordData((prev)=>({...prev,["rating"]: 10}));
    }else if( e.target.name =="star9"){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon2;
      star_4.current.src = star_icon2;
      star_5.current.src = star_icon2;
      star_6.current.src = star_icon2;
      star_7.current.src = star_icon2;
      star_8.current.src = star_icon2;
      star_9.current.src = star_icon2;
      star_10.current.src = star_icon;
      setRating(9);
      setRecordData((prev)=>({...prev,["rating"]: 9}));
    }else if( e.target.name =="star8"){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon2;
      star_4.current.src = star_icon2;
      star_5.current.src = star_icon2;
      star_6.current.src = star_icon2;
      star_7.current.src = star_icon2;
      star_8.current.src = star_icon2;
      star_9.current.src = star_icon;
      star_10.current.src = star_icon;
      setRating(8);
      setRecordData((prev)=>({...prev,["rating"]: 8}));
    }else if( e.target.name =="star7"){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon2;
      star_4.current.src = star_icon2;
      star_5.current.src = star_icon2;
      star_6.current.src = star_icon2;
      star_7.current.src = star_icon2;
      star_8.current.src = star_icon;
      star_9.current.src = star_icon;
      star_10.current.src = star_icon;
      setRating(7);
      setRecordData((prev)=>({...prev,["rating"]: 7}));
    }else if( e.target.name =="star6"){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon2;
      star_4.current.src = star_icon2;
      star_5.current.src = star_icon2;
      star_6.current.src = star_icon2;
      star_7.current.src = star_icon;
      star_8.current.src = star_icon;
      star_9.current.src = star_icon;
      star_10.current.src = star_icon;
      setRating(6);
      setRecordData((prev)=>({...prev,["rating"]: 6}));
    }else if( e.target.name =="star5"){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon2;
      star_4.current.src = star_icon2;
      star_5.current.src = star_icon2;
      star_6.current.src = star_icon;
      star_7.current.src = star_icon;
      star_8.current.src = star_icon;
      star_9.current.src = star_icon;
      star_10.current.src = star_icon;
      setRating(5);
      setRecordData((prev)=>({...prev,["rating"]: 5}));
    }else if( e.target.name =="star4"){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon2;
      star_4.current.src = star_icon2;
      star_5.current.src = star_icon;
      star_6.current.src = star_icon;
      star_7.current.src = star_icon;
      star_8.current.src = star_icon;
      star_9.current.src = star_icon;
      star_10.current.src = star_icon;
      setRating(4);
      setRecordData((prev)=>({...prev,["rating"]: 4}));
    }else if( e.target.name =="star3"){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon2;
      star_4.current.src = star_icon;
      star_5.current.src = star_icon;
      star_6.current.src = star_icon;
      star_7.current.src = star_icon;
      star_8.current.src = star_icon;
      star_9.current.src = star_icon;
      star_10.current.src = star_icon;
      setRating(3);
      setRecordData((prev)=>({...prev,["rating"]: 3}));
    }else if( e.target.name =="star2"){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon2;
      star_3.current.src = star_icon;
      star_4.current.src = star_icon;
      star_5.current.src = star_icon;
      star_6.current.src = star_icon;
      star_7.current.src = star_icon;
      star_8.current.src = star_icon;
      star_9.current.src = star_icon;
      star_10.current.src = star_icon;
      setRating(2);
      setRecordData((prev)=>({...prev,["rating"]: 2}));
    }else if( e.target.name =="star1"){
      star_1.current.src = star_icon2;
      star_2.current.src = star_icon;
      star_3.current.src = star_icon;
      star_4.current.src = star_icon;
      star_5.current.src = star_icon;
      star_6.current.src = star_icon;
      star_7.current.src = star_icon;
      star_8.current.src = star_icon;
      star_9.current.src = star_icon;
      star_10.current.src = star_icon;
      setRating(1);
      setRecordData((prev)=>({...prev,["rating"]: 1}));
    }else{
      star_1.current.src = star_icon;
      star_2.current.src = star_icon;
      star_3.current.src = star_icon;
      star_4.current.src = star_icon;
      star_5.current.src = star_icon;
      star_6.current.src = star_icon;
      star_7.current.src = star_icon;
      star_8.current.src = star_icon;
      star_9.current.src = star_icon;
      star_10.current.src = star_icon;
      setRecordData((prev)=>({...prev,["rating"]: 0}));
    }
  }
  const [show, setShow] = useState(false);
  const showSearching = (e) =>{
    e.preventDefault();
    setShow(current => !current);

    if(localStorage.getItem("doctor")!==null){
      const localDoctor =JSON.parse(localStorage.getItem("doctor"));
      if(localDoctor.doctorId>0){
        setRecordData((prev)=>({...prev,["doctor_id"]:localDoctor.doctorId}));
        doctorSearchResult.current.value=localDoctor.username;
      } 
    }
  }  
const [doctorInputs, setDoctorInputs]= useState({
  username: "",
  usertype: "лікар",
  workadress: "",
  specialization :"",
  phone:"",
})
const handleChangeSearch= (e)=>{
  setDoctorInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
}
const [doctorsData, setDoctors]= useState([]);
const [doctorsLoading, setdoctorsLoading]= useState(false);
const [doctorsErr, setDoctorsErr] = useState("");
const inputSearchName =useRef(null);
const inputSearchPhone = useRef(null);
const searchDoctor = async()=>{
  setdoctorsLoading(true);
    if(doctorInputs.username=="" || doctorInputs.phone=="" || (doctorInputs.username=="" && doctorInputs.phone=="")){
    if(doctorInputs.username=="" ){
      inputSearchName.current.style.borderWidth="3px";
      inputSearchName.current.style.borderStyle="solid";
      inputSearchName.current.style.borderColor="red";
    }
    if(doctorInputs.phone==""){
      inputSearchPhone.current.style.borderWidth="3px";
      inputSearchPhone.current.style.borderStyle="solid";
      inputSearchPhone.current.style.borderColor="red";
    }
}else{
  inputSearchName.current.style.borderWidth="0px";
  inputSearchPhone.current.style.borderWidth="0px";
  try {
    const response = await fetch("http://localhost:8800/users/doctors?username="+doctorInputs.username+"&phone="+doctorInputs.phone+"&workadress="+doctorInputs.workadress+"&specialization="+doctorInputs.specialization , {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const resultDoc = await response.json();
    setDoctors(resultDoc);
  } catch (err) {
    setDoctorsErr(err.message);
  } finally {
    setdoctorsLoading(false);
  }
}
}
const [newDoctorId, setNewDoctorId]= useState({
  doctorId: "",
  username:"",
});
const createOwnDoctor = async(e)=>{
  e.preventDefault();
  try{
      const res = await axios.post("http://localhost:8800/doctors",doctorInputs );
      localStorage.setItem("doctor",JSON.stringify({doctorId:res.data[0].id_doctor,username:res.data[0].doctor_name}));      
  }catch(err){
      console.log(err)
      setError(true)
  }
}
const [createrRecord, setCreatedRecord]= useState(
  JSON.parse(localStorage.getItem("record")) || null
);
const updateMutation = useMutation(
  async(upd) => {
    return await makeRequest.put("/records/api/"+recordFromStorage.idrecord, upd);
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries(["records"]);      
    },
  }
  );
const createRecord = async(e)=>{
  e.preventDefault();
  if(recordFromStorage.idrecord>=0){
    
       updateMutation.mutate(ArrUpdate[0]);
        localStorage.setItem("record", JSON.stringify(
          {"idrecord":ArrUpdate[0].idrecord,
          "record_date": ArrUpdate[0].record_date,
          "record_adress":ArrUpdate[0].record_adress,
          "doctor_name": doctorSearchResult.current.value,
          "prescription":ArrUpdate[0].prescription,
          "rating": ArrUpdate[0].rating,
          }))     
  }else{
    e.preventDefault(); 
    localStorage.setItem("doctor",JSON.stringify({doctorId:"",username:""}));
    doctorSearchResult.current.value=JSON.parse(localStorage.getItem("doctor")).username;
    try{
      const res = await axios.post("http://localhost:8800/records", record );
      setCreatedRecord(res.data[0]);
    }catch(err){
        console.log(err)
        setError(true)
    }
  }
}
const newProcedure = (e) =>{
  e.preventDefault();
  if(createrRecord.idrecord!==undefined){
  localStorage.setItem("record", JSON.stringify(createrRecord));
    navigate("/procedure");
  }else{
    alert("Спочатку створіть запис!");
  }
} 
const userStor = JSON.parse(localStorage.getItem("user"));
if(recordFromStorage.idrecord>=0){
  if(dateRef.current!==null&& adressRef.current!==null && prescrRef.current!==null && ratingRef.current!==null && doctorSearchResult.current!==null){
    if(dateRef.current.value==""){
      dateRef.current.valueAsDate= new Date(recordFromStorage.record_date);
    }
    adressRef.current.defaultValue=recordFromStorage.record_adress;
    prescrRef.current.defaultValue=recordFromStorage.prescription;
    if(ratingRef.current.innerText==""){
     ratingRef.current.innerText=recordFromStorage.rating;
    }
    if(userStor.usertype==='лікар'){
      doctorSearchResult.current.defaultValue=userStor.username;
      ArrUpdate.push({
        idrecord: recordFromStorage.idrecord,
        doctor_id: userStor.iduser,
        record_date: dateRef.current.value.slice(0,10),
        rating: ratingRef.current.innerText,
        record_adress: adressRef.current.value,
        prescription: prescrRef.current.value
      })
    }else{
    doctorSearchResult.current.defaultValue=recordFromStorage.doctor_name;
    ArrUpdate.push({
      idrecord: recordFromStorage.idrecord,
      doctor_id: JSON.parse(localStorage.getItem("doctor")).doctorId,
      record_date: dateRef.current.value.slice(0,10),
      rating: ratingRef.current.innerText,
      record_adress: adressRef.current.value,
      prescription: prescrRef.current.value
    })
    }
  }
}
  return (
    <>
    <div className='record'>
      <div className='record-wrap'>
        <p className='record__text_header'>Запис</p>
        <div className='record__input-wrap'>
          <p className='record__text_title record__text_date'>Дата:</p>
          <input type="date" className=' record__input record__input_date' ref={dateRef} name="record_date" onChange={handleChange}/> 
        </div>
        <div className='record__input-wrap'>
          <p className=' record__text_title record__text_adress'>Адреса:</p>
          <input type="text" className=' record__input record__input_adress' ref={adressRef} name="record_adress" onChange={handleChange}/> 
        </div>
        <div className='record__input-wrap'>
          <p className=' record__text_title record__text_doctor'>Лікар:</p>
          <div className='record__input-wrap_doctor'>
            <input type="text" className='record__input record__input_doctor' readOnly="readonly"  name="doctor" ref={doctorSearchResult}/> 
            <button className='record__buttn_doctor-search'>
              <p className='  buttn__text_doctor-search' onClick={showSearching}>Пошук</p>
            </button>
          </div> 
        </div>
        <div className='record__input-wrap'>
          <p className=' record__text_title record__text_recept'>Рецепт:</p>
          <input type="text" className='record__input record__input_recept' name="prescription" ref={prescrRef} onChange={handleChange}/> 
        </div>
        <div className='record__input-wrap'>
          <p className=' record__text_title record__text_rating'>Оцінка:</p>
          <div className='rating__wrap'>
            <img className='rating__star' src={star_icon} ref={star_1} name="star1" onClick={ratingUpdate}/>
            <img className='rating__star' src={star_icon} ref={star_2} name="star2" onClick={ratingUpdate}/>
            <img className='rating__star' src={star_icon} ref={star_3} name="star3" onClick={ratingUpdate}/>
            <img className='rating__star' src={star_icon} ref={star_4} name="star4" onClick={ratingUpdate}/>
            <img className='rating__star' src={star_icon} ref={star_5} name="star5" onClick={ratingUpdate}/>
            <img className='rating__star' src={star_icon} ref={star_6} name="star6" onClick={ratingUpdate}/>
            <img className='rating__star' src={star_icon} ref={star_7} name="star7" onClick={ratingUpdate}/>
            <img className='rating__star' src={star_icon} ref={star_8} name="star8" onClick={ratingUpdate}/>
            <img className='rating__star' src={star_icon} ref={star_9} name="star9" onClick={ratingUpdate}/>
            <img className='rating__star' src={star_icon} ref={star_10} name="star10" onClick={ratingUpdate}/>
            <p className='rating__text-result' ref={ratingRef} >{ratingValue}</p>
          </div>
        </div>
        <div className='record__input-wrap_procedures'>
          <div className='procedures__left'>
            <p className=' record__text_title record__text_procedures'>Процедури:</p>
          </div>
          <div className='procedures__right'>
            <div className='procedures-area'>
              {
                proceduresError
                ? ""
                :proceduresLoading
                ?""
                :proceduresData==undefined
                ? ""
                : proceduresData.map((procedures) => <ProcedureCard procedure={procedures} key={procedures.idprocedure}/>)
              }
            </div>
            <button className='procedures__button-add' onClick={newProcedure}><p className='button__text_add'>Додати процедуру</p></button>
          </div>
        </div>
        <div className='form-buttn__wrap'>
          <button className='form_button_save' onClick={createRecord} ><p className='button__text_save'>Зберегти</p></button>
        </div>
      </div>
      </div>
      <div className='doctor-search' style={{display: show ? 'block' : 'none'}}>
        <div className='doctor-search__wrap'>  
          <p className='doctor-search__text_header'>Введіть двні для пошуку</p>
          <div className='doctor-search__input-wrap'>
            <p className='doctor-search__text_title'>Прізвище Ім'я Побатькові:</p>
            <input type="text" className=' doctor-search__input doctor-search__input_name' name="username" onChange={handleChangeSearch} ref={inputSearchName}/>
          </div>
          <div className='doctor-search__input-wrap'>
            <p className='doctor-search__text_title' >Номер телефону:</p>
            <input type="tel" className='doctor-search__input doctor-search__input_phone' name="phone" onChange={handleChangeSearch} ref={inputSearchPhone}/>
          </div>
          <div className='doctor-search__input-wrap'>
            <p className='doctor-search__text_title'>Робоча адреса:</p>
            <input type="text" className='doctor-search__input doctor-search__input_adress' name="workadress" onChange={handleChangeSearch}/>
          </div>
          <div className='doctor-search__input-wrap'>
            <p className='doctor-search__text_title'>Спеціалізація:</p>
            <input type="text" className='doctor-search__input doctor-search__input_speciality' name="specialization" onChange={handleChangeSearch}/>
          </div>
          <div className='doctor-search__input-wrap_buttons'>
            <button className='doctor-search__buttn_add' onClick={createOwnDoctor}>Додати</button>
            <button className='doctor-search__buttn_search' onClick={searchDoctor}>Пошук</button>
          </div>
          <div className='doctor-search__result-box'>
            <p className='result-box__text_header'>Результат пошуку:</p>
                  {doctorsData.length>0
                  ? doctorsData.map((results)=> <ResultBoxRecord result={results} key={results.iduser}/>)
                  : "Не знайдено відповідностей"
                  }    
          </div>
        </div>
      </div>
    </>
  )
}
export default TeethRecord