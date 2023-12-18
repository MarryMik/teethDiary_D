import React, {useState, useRef} from 'react';
import "./symptom_diary.scss";
import SymptomRecord from '../../components/SymptomRecord/symptomRecord';
import { useQuery, useMutation, queryClient } from 'react-query';
import axios from 'axios';
import { makeRequest } from '../../axios';
const SymptomDiary = () => {
  const pain1 = useRef(null);
  const pain2 = useRef(null);
  const pain3 = useRef(null);
  const pain4 = useRef(null);
  const pain5 = useRef(null);
  const pain6 = useRef(null);
  const pain7 = useRef(null);
  const pain8 = useRef(null);
  const pain9 = useRef(null);
  const pain10 = useRef(null);
  const [pain, setPain]=useState(0);
  const {isLoading: symptomsLoading, error: symptomsError, data: symptomsData} =useQuery(['symptoms'], ()=>
  makeRequest.get("/symptoms?userId="+JSON.parse(localStorage.getItem('user')).iduser).then(res=>{
    res.data.forEach((el)=>{
      if(el.symptom_datestart!==null && el.symptom_datestart!==""){
        let stDate = new Date(el.symptom_datestart);
        el.symptom_datestart= `${stDate.getFullYear()}-${stDate.getMonth()+1}-${stDate.getDate()}`
      }
      if(el.symptom_date!==null && el.symptom_date!==""){
        let enDate = new Date(el.symptom_date);
        el.symptom_date= `${enDate.getFullYear()}-${enDate.getMonth()+1}-${enDate.getDate()}`
      }
    })
  return res.data;
}));
  const [show, setShow] = useState(false);
  const showAddBox = (e)=>{
    e.preventDefault();
    setShow(current => !current);
   }
const [newSymptom, setNewSymptom]= useState({
  iduser: JSON.parse(localStorage.getItem("user")).iduser,
  symptom_name: "",
  level_pain: "",
  symptom_date: new Date(),
  symptom_datestart: ""
});
const painUpdate =(e)=>{
console.log(pain1.current)
console.log(e.target.name)
console.log(e.target.className.includes("pain_1"))
if(pain1.current!==null){
  if( e.target.className.includes("pain_1")){
    pain1.current.style.backgroundColor="#475ead";
    pain2.current.style.backgroundColor="#FFFFFF";
    pain3.current.style.backgroundColor="#FFFFFF";
    pain4.current.style.backgroundColor="#FFFFFF";
    pain5.current.style.backgroundColor="#FFFFFF";
    pain6.current.style.backgroundColor="#FFFFFF";
    pain7.current.style.backgroundColor="#FFFFFF";
    pain8.current.style.backgroundColor="#FFFFFF";
    pain9.current.style.backgroundColor="#FFFFFF";
    pain10.current.style.backgroundColor="#FFFFFF";
    setPain(1);
    setNewSymptom((prev)=>({...prev, ["level_pain"]:1}));
  }else if( e.target.className.includes("pain_2")){
    pain1.current.style.backgroundColor="#475ead";
    pain2.current.style.backgroundColor="#475ead";
    pain3.current.style.backgroundColor="#FFFFFF";
    pain4.current.style.backgroundColor="#FFFFFF";
    pain5.current.style.backgroundColor="#FFFFFF";
    pain6.current.style.backgroundColor="#FFFFFF";
    pain7.current.style.backgroundColor="#FFFFFF";
    pain8.current.style.backgroundColor="#FFFFFF";
    pain9.current.style.backgroundColor="#FFFFFF";
    pain10.current.style.backgroundColor="#FFFFFF";
    setPain(2);
    setNewSymptom((prev)=>({...prev, ["level_pain"]:2}));
  }else if(e.target.className.includes("pain_3")){
    pain1.current.style.backgroundColor="#475ead";
    pain2.current.style.backgroundColor="#475ead";
    pain3.current.style.backgroundColor="#475ead";
    pain4.current.style.backgroundColor="#FFFFFF";
    pain5.current.style.backgroundColor="#FFFFFF";
    pain6.current.style.backgroundColor="#FFFFFF";
    pain7.current.style.backgroundColor="#FFFFFF";
    pain8.current.style.backgroundColor="#FFFFFF";
    pain9.current.style.backgroundColor="#FFFFFF";
    pain10.current.style.backgroundColor="#FFFFFF";
    setPain(3);
    setNewSymptom((prev)=>({...prev, ["level_pain"]:3}));
  }else if(e.target.className.includes("pain_4")){
    pain1.current.style.backgroundColor="#475ead";
    pain2.current.style.backgroundColor="#475ead";
    pain3.current.style.backgroundColor="#475ead";
    pain4.current.style.backgroundColor="#475ead";
    pain5.current.style.backgroundColor="#FFFFFF";
    pain6.current.style.backgroundColor="#FFFFFF";
    pain7.current.style.backgroundColor="#FFFFFF";
    pain8.current.style.backgroundColor="#FFFFFF";
    pain9.current.style.backgroundColor="#FFFFFF";
    pain10.current.style.backgroundColor="#FFFFFF";
    setPain(4);
    setNewSymptom((prev)=>({...prev, ["level_pain"]:4}));
  }else if(e.target.className.includes("pain_5")){
    pain1.current.style.backgroundColor="#475ead";
    pain2.current.style.backgroundColor="#475ead";
    pain3.current.style.backgroundColor="#475ead";
    pain4.current.style.backgroundColor="#475ead";
    pain5.current.style.backgroundColor="#475ead";
    pain6.current.style.backgroundColor="#FFFFFF";
    pain7.current.style.backgroundColor="#FFFFFF";
    pain8.current.style.backgroundColor="#FFFFFF";
    pain9.current.style.backgroundColor="#FFFFFF";
    pain10.current.style.backgroundColor="#FFFFFF";
    setPain(5);
    setNewSymptom((prev)=>({...prev, ["level_pain"]:5}));
  }else if( e.target.className.includes("pain_6")){
    pain1.current.style.backgroundColor="#475ead";
    pain2.current.style.backgroundColor="#475ead";
    pain3.current.style.backgroundColor="#475ead";
    pain4.current.style.backgroundColor="#475ead";
    pain5.current.style.backgroundColor="#475ead";
    pain6.current.style.backgroundColor="#475ead";
    pain7.current.style.backgroundColor="#FFFFFF";
    pain8.current.style.backgroundColor="#FFFFFF";
    pain9.current.style.backgroundColor="#FFFFFF";
    pain10.current.style.backgroundColor="#FFFFFF";
    setPain(6);
    setNewSymptom((prev)=>({...prev, ["level_pain"]:6}));
  }else if(e.target.className.includes("pain_7")){
    pain1.current.style.backgroundColor="#475ead";
    pain2.current.style.backgroundColor="#475ead";
    pain3.current.style.backgroundColor="#475ead";
    pain4.current.style.backgroundColor="#475ead";
    pain5.current.style.backgroundColor="#475ead";
    pain6.current.style.backgroundColor="#475ead";
    pain7.current.style.backgroundColor="#475ead";
    pain8.current.style.backgroundColor="#FFFFFF";
    pain9.current.style.backgroundColor="#FFFFFF";
    pain10.current.style.backgroundColor="#FFFFFF";
    setPain(7);
    setNewSymptom((prev)=>({...prev, ["level_pain"]:7}));
  }else if(e.target.className.includes("pain_8")){
    pain1.current.style.backgroundColor="#475ead";
    pain2.current.style.backgroundColor="#475ead";
    pain3.current.style.backgroundColor="#475ead";
    pain4.current.style.backgroundColor="#475ead";
    pain5.current.style.backgroundColor="#475ead";
    pain6.current.style.backgroundColor="#475ead";
    pain7.current.style.backgroundColor="#475ead";
    pain8.current.style.backgroundColor="#475ead";
    pain9.current.style.backgroundColor="#FFFFFF";
    pain10.current.style.backgroundColor="#FFFFFF";
    setPain(8);
    setNewSymptom((prev)=>({...prev, ["level_pain"]:8}));
  }else if(e.target.className.includes("pain_9")){
    pain1.current.style.backgroundColor="#475ead";
    pain2.current.style.backgroundColor="#475ead";
    pain3.current.style.backgroundColor="#475ead";
    pain4.current.style.backgroundColor="#475ead";
    pain5.current.style.backgroundColor="#475ead";
    pain6.current.style.backgroundColor="#475ead";
    pain7.current.style.backgroundColor="#475ead";
    pain8.current.style.backgroundColor="#475ead";
    pain9.current.style.backgroundColor="#475ead";
    pain10.current.style.backgroundColor="#FFFFFF";
    setPain(9);
    setNewSymptom((prev)=>({...prev, ["level_pain"]:9}));
  }else if( e.target.className.includes("pain10")){
    pain1.current.style.backgroundColor="#475ead";
    pain2.current.style.backgroundColor="#475ead";
    pain3.current.style.backgroundColor="#475ead";
    pain4.current.style.backgroundColor="#475ead";
    pain5.current.style.backgroundColor="#475ead";
    pain6.current.style.backgroundColor="#475ead";
    pain7.current.style.backgroundColor="#475ead";
    pain8.current.style.backgroundColor="#475ead";
    pain9.current.style.backgroundColor="#475ead";
    pain10.current.style.backgroundColor="#475ead";
    setPain(10);
    setNewSymptom((prev)=>({...prev, ["level_pain"]:10}));
  }
}
}
const handleChange =(e)=>{
  setNewSymptom((prev)=>({...prev,[e.target.name]:e.target.value}));
}
const addSymptom =async()=>{
  try{
    const res = await axios.post("http://localhost:8800/symptoms",newSymptom );
  }catch (err){
    console.log(err)
  }
  setShow(current => !current);
}
  return (
   <>
   <div className="new-symptom" style={{display: show ? 'block' : 'none'}}>
    <div className="new-symptom__header-wrap">
      <p className='new-symptom__text_header'>Симптоми</p>
    </div>
    <div className="new-symptom__input-wrap">
      <p className='new-symptom__text_title'>Назва:</p>
      <input className='new-symptom__input new-symptom__input_name'type="text" name="symptom_name" onChange={handleChange}/> 
    </div>
    <div className="new-symptom__input-wrap">
      <p className='new-symptom__text_title'>Дата і час:</p>
      <input className='new-symptom__input new-symptom__input_date'type="date" name="symptom_datestart" onChange={handleChange}/> 
      <input className='new-symptom__input new-symptom__input_time'type="time" />
    </div>
    <div className="new-symptom__input-wrap">
      <p className='new-symptom__text_title'>Рівень болю:</p>
      <div className='new-symptom__pain-wrap'>
        <div className='new-symptom__pain-circle pain_1' ref={pain1} onClick={painUpdate}></div>
        <div className='new-symptom__pain-circle pain_2' ref={pain2}  onClick={painUpdate}></div>
        <div className='new-symptom__pain-circle pain_3' ref={pain3}  onClick={painUpdate}></div>
        <div className='new-symptom__pain-circle pain_4' ref={pain4}  onClick={painUpdate}></div>
        <div className='new-symptom__pain-circle pain_5' ref={pain5}  onClick={painUpdate}></div>
        <div className='new-symptom__pain-circle pain_6' ref={pain6}  onClick={painUpdate}></div>
        <div className='new-symptom__pain-circle pain_7' ref={pain7}  onClick={painUpdate}></div>
        <div className='new-symptom__pain-circle pain_8' ref={pain8}  onClick={painUpdate}></div>
        <div className='new-symptom__pain-circle pain_9' ref={pain9}  onClick={painUpdate}></div>
        <div className='new-symptom__pain-circle pain10' ref={pain10} onClick={painUpdate}></div>
        <div className='new-symptom__data-circle' >
          <p className='new-symptom__text-pain'>{pain}</p>
        </div>        
      </div>
    </div>
    <div className='new-symptom__button-wrap'>
      <button className='new-symptom__button'>
        <p className='new-symptom__buttn-text' onClick={addSymptom}>Додати</p>
      </button>
    </div>
   </div>
   <div className='symptom-history'>
    <div className='symptom-history__wrap'>
      <div className='symptom-history__header-wrap'>
        <p className='symptom-history__text_header'>Щоденник спостерігача</p>
        <button className='symptom-history__buttn_add' onClick={showAddBox}>{show ? 'Закрити' : 'Додати'}</button>
      </div>
      <div className='symptom-history__cards'>
        {
          symptomsError
          ?"Щось пішло не так!"
          : symptomsLoading
          ? "завантаження..."
          : symptomsData.map((el)=><SymptomRecord symptom={el} key={el.idymptom}/>)
        }
      </div>
    </div>
   </div>
   </>
  )
}
export default SymptomDiary