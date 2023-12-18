//підключення необхідних модулів
import React, { useEffect, useState, useRef }from 'react'
import {MultiSelect} from "react-multi-select-component";
import "./patient_diary.scss";
import "../../components/procedureCard/procedure_card.scss";
import "../../components/treatmentCard/treatment_card.scss";
import "../../components/recordCard/record_card.scss";
import {useQuery } from 'react-query'
import { Link } from "react-router-dom";
import TreatmentCard from "../../components/treatmentCard/treatmentCard.jsx"
import RecordCard from '../../components/recordCard/recordCard';
import ProcedureCard from '../../components/procedureCard/procedureCard';
import ResultBox from '../../components/result_box/resultBox';
import { makeRequest } from '../../axios';
//підключення ілюстрацій частин ротової порожнини
//стандартний набір
import  mouth_img from '../../images/oralCavity/standart/oral_cavity.svg'
import tooth11_img from '../../images/oralCavity/standart/11.svg'
import  tooth12_img from '../../images/oralCavity/standart/12.svg'
import  tooth13_img from '../../images/oralCavity/standart/13.svg'
import  tooth14_img from '../../images/oralCavity/standart/14.svg'
import  tooth15_img from '../../images/oralCavity/standart/15.svg'
import  tooth16_img from '../../images/oralCavity/standart/16.svg'
import  tooth17_img from '../../images/oralCavity/standart/17.svg'
import  tooth18_img from '../../images/oralCavity/standart/18.svg'
import tooth21_img from '../../images/oralCavity/standart/21.svg'
import  tooth22_img from '../../images/oralCavity/standart/22.svg'
import  tooth23_img from '../../images/oralCavity/standart/23.svg'
import  tooth24_img from '../../images/oralCavity/standart/24.svg'
import  tooth25_img from '../../images/oralCavity/standart/25.svg'
import tooth26_img from '../../images/oralCavity/standart/26.svg'
import tooth27_img from '../../images/oralCavity/standart/27.svg'
import tooth28_img from '../../images/oralCavity/standart/28.svg'
import tooth31_img from '../../images/oralCavity/standart/31.svg'
import tooth32_img from '../../images/oralCavity/standart/32.svg'
import tooth33_img from '../../images/oralCavity/standart/33.svg'
import tooth34_img from '../../images/oralCavity/standart/34.svg'
import tooth35_img from '../../images/oralCavity/standart/35.svg'
import tooth36_img from '../../images/oralCavity/standart/36.svg'
import tooth37_img from '../../images/oralCavity/standart/37.svg'
import tooth38_img from '../../images/oralCavity/standart/38.svg'
import tooth41_img from '../../images/oralCavity/standart/41.svg'
import tooth42_img from '../../images/oralCavity/standart/42.svg'
import tooth43_img from '../../images/oralCavity/standart/43.svg'
import tooth44_img from '../../images/oralCavity/standart/44.svg'
import tooth45_img from '../../images/oralCavity/standart/45.svg'
import tooth46_img from '../../images/oralCavity/standart/46.svg'
import tooth47_img from '../../images/oralCavity/standart/47.svg'
import tooth48_img from '../../images/oralCavity/standart/48.svg'
//зуби після адгезивної реставрації
import fill_tooth11_img from '../../images/oralCavity/fillings/п11.svg'
import fill_tooth12_img from '../../images/oralCavity/fillings/п12.svg'
import fill_tooth13_img from '../../images/oralCavity/fillings/п13.svg'
import fill_tooth14_img from '../../images/oralCavity/fillings/п14.svg'
import fill_tooth15_img from '../../images/oralCavity/fillings/п15.svg'
import fill_tooth16_img from '../../images/oralCavity/fillings/п16.svg'
import fill_tooth17_img from '../../images/oralCavity/fillings/п17.svg'
import fill_tooth18_img from '../../images/oralCavity/fillings/п18.svg'
import fill_tooth21_img from '../../images/oralCavity/fillings/п21.svg'
import fill_tooth22_img from '../../images/oralCavity/fillings/п22.svg'
import fill_tooth23_img from '../../images/oralCavity/fillings/п23.svg'
import fill_tooth24_img from '../../images/oralCavity/fillings/п24.svg'
import fill_tooth25_img from '../../images/oralCavity/fillings/п25.svg'
import fill_tooth26_img from '../../images/oralCavity/fillings/п26.svg'
import fill_tooth27_img from '../../images/oralCavity/fillings/п27.svg'
import fill_tooth28_img from '../../images/oralCavity/fillings/п28.svg'
import fill_tooth31_img from '../../images/oralCavity/fillings/п31.svg'
import fill_tooth32_img from '../../images/oralCavity/fillings/п32.svg'
import fill_tooth33_img from '../../images/oralCavity/fillings/п33.svg'
import fill_tooth34_img from '../../images/oralCavity/fillings/п34.svg'
import fill_tooth35_img from '../../images/oralCavity/fillings/п35.svg'
import fill_tooth36_img from '../../images/oralCavity/fillings/п36.svg'
import fill_tooth37_img from '../../images/oralCavity/fillings/п37.svg'
import fill_tooth38_img from '../../images/oralCavity/fillings/п38.svg'
import fill_tooth41_img from '../../images/oralCavity/fillings/п41.svg'
import fill_tooth42_img from '../../images/oralCavity/fillings/п42.svg'
import fill_tooth43_img from '../../images/oralCavity/fillings/п43.svg'
import fill_tooth44_img from '../../images/oralCavity/fillings/п44.svg'
import fill_tooth45_img from '../../images/oralCavity/fillings/п45.svg'
import fill_tooth46_img from '../../images/oralCavity/fillings/п46.svg'
import fill_tooth47_img from '../../images/oralCavity/fillings/п47.svg'
import fill_tooth48_img from '../../images/oralCavity/fillings/п48.svg'
// зуби після екстирпації пульпи або хірургічної обробки кореневого каналу
import nerv_tooth11_img from '../../images/oralCavity/nerves/бн11.svg'
import nerv_tooth12_img from '../../images/oralCavity/nerves/бн12.svg'
import nerv_tooth13_img from '../../images/oralCavity/nerves/бн13.svg'
import nerv_tooth14_img from '../../images/oralCavity/nerves/бн14.svg'
import nerv_tooth15_img from '../../images/oralCavity/nerves/бн15.svg'
import nerv_tooth16_img from '../../images/oralCavity/nerves/бн16.svg'
import nerv_tooth17_img from '../../images/oralCavity/nerves/бн17.svg'
import nerv_tooth18_img from '../../images/oralCavity/nerves/бн18.svg'
import nerv_tooth21_img from '../../images/oralCavity/nerves/бн21.svg'
import nerv_tooth22_img from '../../images/oralCavity/nerves/бн22.svg'
import nerv_tooth23_img from '../../images/oralCavity/nerves/бн23.svg'
import nerv_tooth24_img from '../../images/oralCavity/nerves/бн24.svg'
import nerv_tooth25_img from '../../images/oralCavity/nerves/бн25.svg'
import nerv_tooth26_img from '../../images/oralCavity/nerves/бн26.svg'
import nerv_tooth27_img from '../../images/oralCavity/nerves/бн27.svg'
import nerv_tooth28_img from '../../images/oralCavity/nerves/бн28.svg'
import nerv_tooth31_img from '../../images/oralCavity/nerves/бн31.svg'
import nerv_tooth32_img from '../../images/oralCavity/nerves/бн32.svg'
import nerv_tooth33_img from '../../images/oralCavity/nerves/бн33.svg'
import nerv_tooth34_img from '../../images/oralCavity/nerves/бн34.svg'
import nerv_tooth35_img from '../../images/oralCavity/nerves/бн35.svg'
import nerv_tooth36_img from '../../images/oralCavity/nerves/бн36.svg'
import nerv_tooth37_img from '../../images/oralCavity/nerves/бн37.svg'
import nerv_tooth38_img from '../../images/oralCavity/nerves/бн38.svg'
import nerv_tooth41_img from '../../images/oralCavity/nerves/бн41.svg'
import nerv_tooth42_img from '../../images/oralCavity/nerves/бн42.svg'
import nerv_tooth43_img from '../../images/oralCavity/nerves/бн43.svg'
import nerv_tooth44_img from '../../images/oralCavity/nerves/бн44.svg'
import nerv_tooth45_img from '../../images/oralCavity/nerves/бн45.svg'
import nerv_tooth46_img from '../../images/oralCavity/nerves/бн46.svg'
import nerv_tooth47_img from '../../images/oralCavity/nerves/бн47.svg'
import nerv_tooth48_img from '../../images/oralCavity/nerves/бн48.svg'
//зуби покриті нальотом
import plag_tooth11_img from '../../images/oralCavity/plaque/н11.svg'
import plag_tooth12_img from '../../images/oralCavity/plaque/н12.svg'
import plag_tooth13_img from '../../images/oralCavity/plaque/н13.svg'
import plag_tooth14_img from '../../images/oralCavity/plaque/н14.svg'
import plag_tooth15_img from '../../images/oralCavity/plaque/н15.svg'
import plag_tooth16_img from '../../images/oralCavity/plaque/н16.svg'
import plag_tooth17_img from '../../images/oralCavity/plaque/н17.svg'
import plag_tooth18_img from '../../images/oralCavity/plaque/н18.svg'
import plag_tooth21_img from '../../images/oralCavity/plaque/н21.svg'
import plag_tooth22_img from '../../images/oralCavity/plaque/н22.svg'
import plag_tooth23_img from '../../images/oralCavity/plaque/н23.svg'
import plag_tooth24_img from '../../images/oralCavity/plaque/н24.svg'
import plag_tooth25_img from '../../images/oralCavity/plaque/н25.svg'
import plag_tooth26_img from '../../images/oralCavity/plaque/н26.svg'
import plag_tooth27_img from '../../images/oralCavity/plaque/н27.svg'
import plag_tooth28_img from '../../images/oralCavity/plaque/н28.svg'
import plag_tooth31_img from '../../images/oralCavity/plaque/н31.svg'
import plag_tooth32_img from '../../images/oralCavity/plaque/н32.svg'
import plag_tooth33_img from '../../images/oralCavity/plaque/н33.svg'
import plag_tooth34_img from '../../images/oralCavity/plaque/н34.svg'
import plag_tooth35_img from '../../images/oralCavity/plaque/н35.svg'
import plag_tooth36_img from '../../images/oralCavity/plaque/н36.svg'
import plag_tooth37_img from '../../images/oralCavity/plaque/н37.svg'
import plag_tooth38_img from '../../images/oralCavity/plaque/н38.svg'
import plag_tooth41_img from '../../images/oralCavity/plaque/н41.svg'
import plag_tooth42_img from '../../images/oralCavity/plaque/н42.svg'
import plag_tooth43_img from '../../images/oralCavity/plaque/н43.svg'
import plag_tooth44_img from '../../images/oralCavity/plaque/н44.svg'
import plag_tooth45_img from '../../images/oralCavity/plaque/н45.svg'
import plag_tooth46_img from '../../images/oralCavity/plaque/н46.svg'
import plag_tooth47_img from '../../images/oralCavity/plaque/н47.svg'
import plag_tooth48_img from '../../images/oralCavity/plaque/н48.svg'
//модуль Щоденика пацієнта
const PatientDiary = () => {
let userId;
let patientId;
if(JSON.parse(localStorage.getItem("patient"))){
 patientId=JSON.parse(localStorage.getItem("patient")).idPatient;
 if(patientId>=0){
  userId=patientId;
 }
}else{
  userId= JSON.parse(localStorage.getItem("user")).iduser;
}
const [selected, setSelected] = useState([]);
const [selected2, setSelected2] = useState([]);
const [dateStFilter, setDateStFilter] =useState([]);
const [dateEnFilter, setDateEnFilter] =useState([]);
const [inputs, setInputs] = useState({
  username:"",
  phone:""
});
const handleChange = (e) =>{
  setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};
let teethNumber =32;
localStorage.setItem("treatment", JSON.stringify({"":""}))
localStorage.setItem("record", JSON.stringify({"":""}))
localStorage.setItem("procedure", JSON.stringify({"":""}))
localStorage.setItem("doctor",JSON.stringify({doctorId:"",username:""}));
//отримання даних з серверу
//лікування
const {isLoading:treatmentLoading, error:treatmentError, data:treatmentData} =useQuery(['treatments'], ()=>
makeRequest.get("/treatments/view?userId="+userId).then(res=>{
  res.data.forEach((el)=>{
    if(el.start_date_trtment!==null && el.start_date_trtment!==""){
    let stDate = new Date(el.start_date_trtment);
    el.start_date_trtment= `${stDate.getFullYear()}-${stDate.getMonth()+1}-${stDate.getDate()}`
    }
    if(el.end_date_trtment!==null && el.end_date_trtment!==""){
    let enDate = new Date(el.end_date_trtment);
    el.end_date_trtment = `${enDate.getFullYear()}-${enDate.getMonth()+1}-${enDate.getDate()}`
    }
  })
  return res.data;
}));
//медичні записи
const {isLoading:recordsLoading, error: recordsError, data: recordsData} =useQuery(['records'], ()=>
makeRequest.get("/records/view?userId="+userId).then(res=>{
  res.data.forEach((el)=>{
    if(el.record_date!==null && el.record_date!==""){
      let recDate = new Date(el.record_date);
      el.record_date = `${recDate.getFullYear()}-${recDate.getMonth()+1}-${recDate.getDate()}`
    }
  })
  return res.data;
}));
//процедури
const {isLoading: proceduresLoading, error: proceduresError, data: proceduresData} =useQuery(['procedures'], ()=>
makeRequest.get("/procedures/view?userId="+userId).then(res=>{
  return res.data;
}));
//зубні щітки
const {isLoading: brushesLoading, error: brushesError, data: brushesData} =useQuery(['brushes'], ()=>
makeRequest.get("/brushes?userId="+userId).then(res=>{
  return res.data;
}));
//дані про чистки зубів
const {isLoading: brushingLoading, error: brushingError, data: brushingData} =useQuery(['brushing'], ()=>
makeRequest.get("/brushing?userId="+userId).then(res=>{
  return res.data;
}));
//частини ротовї попрожнини
const {isLoading: ocpLoading, error: ocpError, data: ocpData} =useQuery(['oral_cavity_parts'], ()=>
makeRequest.get("/oralCavityParts").then(res=>{
  return res.data;
}));
//системні процедури
const {isLoading: dirProceduresLoading, error: dirProceduresError, data: dirProceduresData} =useQuery(['dir_procedures'], ()=>
makeRequest.get("/directoryProcedures").then(res=>{
  return res.data;
}));
let dateNow =new Date();
let diffDays =0;
let lastProBrushing=0;
let diffInProBrushing =0;
let brushing=0;
let brushChange =0;
let oral_cavity_parts=[];
let procedures=[];
// посилання на елементи моделі зубної порожнини та інші
const tooth_11 = useRef(null);
const tooth_12 = useRef(null);
const tooth_13 = useRef(null);
const tooth_14  = useRef(null);
const tooth_15  = useRef(null);
const tooth_16  = useRef(null);
const tooth_17  = useRef(null);
const tooth_18  = useRef(null);
const tooth_21 = useRef(null);
const tooth_22  = useRef(null);
const tooth_23  = useRef(null);
const tooth_24 = useRef(null);
const tooth_25 = useRef(null);
const tooth_26 = useRef(null);
const tooth_27 = useRef(null);
const tooth_28 = useRef(null);
const tooth_31 = useRef(null);
const tooth_32 = useRef(null);
const tooth_33  = useRef(null);
const tooth_34  = useRef(null);
const tooth_35  = useRef(null);
const tooth_36 = useRef(null);
const tooth_37 = useRef(null);
const tooth_38 = useRef(null);
const tooth_41 = useRef(null);
const tooth_42 = useRef(null);
const tooth_43 = useRef(null);
const tooth_44 = useRef(null);
const tooth_45 = useRef(null);
const tooth_46 = useRef(null);
const tooth_47 = useRef(null);
const tooth_48 = useRef(null);
const filter_box = useRef(null);
const checkbox = useRef();
//обробка отриманих даних
if(recordsData!==undefined && proceduresData!==undefined && brushingData!==undefined && brushesData!==undefined){
  //розрахунок часу з останнього відвідування стоматолога
if(recordsData.length>0){
    const dateLastRecord = new Date(recordsData[recordsData.length-1].record_date);
    const diffTime = Math.abs(dateNow-dateLastRecord);
    diffDays = Math.ceil(diffTime/(1000*60*60*24));
    }
    //рахунок загальну кількість зубів
    let count =0;
    proceduresData.forEach(el => {
      if(el.proc_name.includes("Видалення зуба або його частин(-и)")|| el.proc_name.includes("Секційне видалення зуба або його частин(-и)") || el.proc_name.includes("видалення зуба")){
        count++;
      }else if (el.proc_name.includes("Видалення всіх зубів")){
        teethNumber=0;
      }
      })
  teethNumber=teethNumber-count;
  //розрахунок часу з останньої професійної чистки
  recordsData.forEach((el)=> {
    if(el.proc_names!==null){
    if(el.proc_names.includes("Відбілювання, внутрішнє") ||el.proc_names.includes("Відбілювання, в домашніх умовах")|| el.proc_names.includes("Відбілювання, зовнішнє") || el.proc_names.includes("Видалення нальоту або плям на зубах")){
      lastProBrushing= el;
    }
    }
  })
  let lastProBrushingDate = new Date(lastProBrushing.record_date);
  diffInProBrushing=Math.ceil(Math.abs(dateNow-lastProBrushingDate)/(1000*60*60*24))
  if(isNaN(diffInProBrushing)){
    diffInProBrushing=0;
  }
  brushingData.forEach((el)=>{
    let dateBr = new Date(el.brushing_date);
    let diffBr = Math.ceil(Math.abs(dateNow-dateBr)/(1000*60*60*24));
    if(diffBr<=1){
      brushing=el.number_of_times;
    }
  })
  //розрахунок часу з останьої заміни зубної щітки
  brushesData.forEach((el)=>{
    let dateBr = new Date(el.start_date);
    brushChange = Math.ceil(Math.abs(dateNow-dateBr)/(1000*60*60*24));    
  })
  // реалізація реагування моделі ротової порожнини на проведені процедури
  if(tooth_11.current!==undefined && tooth_11.current!==null){
    if(diffInProBrushing<365){
      tooth_11.current.src = tooth11_img;
      tooth_12.current.src = tooth12_img;
      tooth_13.current.src = tooth13_img;
      tooth_14.current.src = tooth14_img;
      tooth_15.current.src = tooth15_img;
      tooth_16.current.src = tooth16_img;
      tooth_17.current.src = tooth17_img;
      tooth_18.current.src = tooth18_img;
      tooth_21.current.src = tooth21_img;
      tooth_22.current.src = tooth22_img;
      tooth_23.current.src = tooth23_img;
      tooth_24.current.src = tooth24_img;
      tooth_25.current.src = tooth25_img;
      tooth_26.current.src = tooth26_img;
      tooth_27.current.src = tooth27_img;
      tooth_28.current.src = tooth28_img;
      tooth_31.current.src = tooth31_img;
      tooth_32.current.src = tooth32_img;
      tooth_33.current.src = tooth33_img;
      tooth_34.current.src = tooth34_img;
      tooth_35.current.src = tooth35_img;
      tooth_36.current.src = tooth36_img;
      tooth_37.current.src = tooth37_img;
      tooth_38.current.src = tooth38_img;
      tooth_41.current.src = tooth41_img;
      tooth_42.current.src = tooth42_img;
      tooth_43.current.src = tooth43_img;
      tooth_44.current.src = tooth44_img;
      tooth_45.current.src = tooth45_img;
      tooth_46.current.src = tooth46_img;
      tooth_47.current.src = tooth47_img;
      tooth_48.current.src = tooth48_img;
    }else{
      tooth_11.current.src = plag_tooth11_img;
      tooth_12.current.src = plag_tooth12_img;
      tooth_13.current.src = plag_tooth13_img;
      tooth_14.current.src = plag_tooth14_img;
      tooth_15.current.src = plag_tooth15_img;
      tooth_16.current.src = plag_tooth16_img;
      tooth_17.current.src = plag_tooth17_img;
      tooth_18.current.src = plag_tooth18_img;
      tooth_21.current.src = plag_tooth21_img;
      tooth_22.current.src = plag_tooth22_img;
      tooth_23.current.src = plag_tooth23_img;
      tooth_24.current.src = plag_tooth24_img;
      tooth_25.current.src = plag_tooth25_img;
      tooth_26.current.src = plag_tooth26_img;
      tooth_27.current.src = plag_tooth27_img;
      tooth_28.current.src = plag_tooth28_img;
      tooth_31.current.src = plag_tooth31_img;
      tooth_32.current.src = plag_tooth32_img;
      tooth_33.current.src = plag_tooth33_img;
      tooth_34.current.src = plag_tooth34_img;
      tooth_35.current.src = plag_tooth35_img;
      tooth_36.current.src = plag_tooth36_img;
      tooth_37.current.src = plag_tooth37_img;
      tooth_38.current.src = plag_tooth38_img;
      tooth_41.current.src = plag_tooth41_img;
      tooth_42.current.src = plag_tooth42_img;
      tooth_43.current.src = plag_tooth43_img;
      tooth_44.current.src = plag_tooth44_img;
      tooth_45.current.src = plag_tooth45_img;
      tooth_46.current.src = plag_tooth46_img;
      tooth_47.current.src = plag_tooth47_img;
      tooth_48.current.src = plag_tooth48_img;
    }
    if(proceduresData!==undefined){
   proceduresData.forEach((el)=>{
    if(el.proc_name.includes("Адгезивна реставрація переднього зуба") || el.proc_name.includes("Адгезивна реставрація бічного зуба")){
      if(el.partname!==null){
      el.partname.includes("Різець 11") ? tooth_11.current.src = fill_tooth11_img : tooth_11.current.src = tooth11_img;
      el.partname.includes("Різець 12") ? tooth_12.current.src = fill_tooth12_img : tooth_12.current.src = tooth12_img;
      el.partname.includes("Клик 13") ? tooth_13.current.src = fill_tooth13_img : tooth_13.current.src = tooth13_img;
      el.partname.includes("Премоляр 14") ? tooth_14.current.src = fill_tooth14_img : tooth_14.current.src = tooth14_img;
      el.partname.includes("Премоляр 15") ? tooth_15.current.src = fill_tooth15_img : tooth_15.current.src = tooth15_img;
      el.partname.includes("Моляр 16") ? tooth_16.current.src = fill_tooth16_img : tooth_16.current.src = tooth16_img;
      el.partname.includes("Моляр 17") ? tooth_17.current.src = fill_tooth17_img : tooth_17.current.src = tooth17_img;
      el.partname.includes("Моляр  18") ? tooth_18.current.src = fill_tooth18_img : tooth_18.current.src = tooth18_img;
      el.partname.includes("Різець 21") ? tooth_21.current.src = fill_tooth21_img : tooth_21.current.src = tooth21_img;
      el.partname.includes("Різець 22") ? tooth_22.current.src = fill_tooth22_img : tooth_22.current.src = tooth22_img;
      el.partname.includes("Клик 23") ? tooth_23.current.src = fill_tooth23_img : tooth_23.current.src = tooth23_img;
      el.partname.includes("Премоляр 24") ? tooth_24.current.src = fill_tooth24_img : tooth_24.current.src = tooth24_img;
      el.partname.includes("Премоляр 25") ? tooth_25.current.src = fill_tooth25_img : tooth_25.current.src = tooth25_img;
      el.partname.includes("Моляр 26") ? tooth_26.current.src = fill_tooth26_img : tooth_26.current.src = tooth26_img;
      el.partname.includes("Моляр 27") ? tooth_27.current.src = fill_tooth27_img : tooth_27.current.src = tooth27_img;
      el.partname.includes("Моляр 28") ? tooth_28.current.src = fill_tooth28_img : tooth_28.current.src = tooth28_img;
      el.partname.includes("Різець 31") ? tooth_31.current.src = fill_tooth31_img : tooth_31.current.src = tooth31_img;
      el.partname.includes("Різець 32") ? tooth_32.current.src = fill_tooth32_img : tooth_32.current.src = tooth32_img;
      el.partname.includes("Клик 33") ? tooth_33.current.src = fill_tooth33_img : tooth_33.current.src = tooth33_img;
      el.partname.includes("Премоляр 34") ? tooth_34.current.src = fill_tooth34_img : tooth_34.current.src = tooth34_img;
      el.partname.includes("Премоляр 35") ? tooth_35.current.src = fill_tooth35_img : tooth_35.current.src = tooth35_img;
      el.partname.includes("Моляр 36") ? tooth_36.current.src = fill_tooth36_img : tooth_36.current.src = tooth36_img;
      el.partname.includes("Моляр 37") ? tooth_37.current.src = fill_tooth37_img : tooth_37.current.src = tooth37_img;
      el.partname.includes("Моляр 38") ? tooth_38.current.src = fill_tooth38_img : tooth_38.current.src = tooth38_img;
      el.partname.includes("Різець 41") ? tooth_41.current.src = fill_tooth41_img : tooth_41.current.src = tooth41_img;
      el.partname.includes("Різець 42") ? tooth_42.current.src = fill_tooth42_img : tooth_42.current.src = tooth42_img;
      el.partname.includes("Клик 43") ? tooth_43.current.src = fill_tooth43_img : tooth_43.current.src = tooth43_img;
      el.partname.includes("Премоляр 44") ? tooth_44.current.src = fill_tooth44_img : tooth_44.current.src = tooth44_img;
      el.partname.includes("Премоляр 45") ? tooth_45.current.src = fill_tooth45_img : tooth_45.current.src = tooth45_img;
      el.partname.includes("Моляр 46") ? tooth_46.current.src = fill_tooth46_img : tooth_46.current.src = tooth46_img;
      el.partname.includes("Моляр 47") ? tooth_47.current.src = fill_tooth47_img : tooth_47.current.src = tooth47_img;
      el.partname.includes("Моляр 48") ? tooth_48.current.src = fill_tooth48_img : tooth_48.current.src = tooth48_img;
      }
    }
    if(el.proc_name.includes("Екстірпація пульпи або хірургічнаобробка кореневого каналу")){
      if(el.partname!==null){
      el.partname.includes("Різець 11") ? tooth_11.current.src = nerv_tooth11_img : tooth_11.current.src = tooth11_img;
      el.partname.includes("Різець 12") ? tooth_12.current.src = nerv_tooth12_img : tooth_12.current.src = tooth12_img;
      el.partname.includes("Клик 13") ? tooth_13.current.src = nerv_tooth13_img : tooth_13.current.src = tooth13_img;
      el.partname.includes("Премоляр 14") ? tooth_14.current.src = nerv_tooth14_img : tooth_14.current.src = tooth14_img;
      el.partname.includes("Премоляр 15") ? tooth_15.current.src = nerv_tooth15_img : tooth_15.current.src = tooth15_img;
      el.partname.includes("Моляр 16") ? tooth_16.current.src = nerv_tooth16_img : tooth_16.current.src = tooth16_img;
      el.partname.includes("Моляр 17") ? tooth_17.current.src = nerv_tooth17_img : tooth_17.current.src = tooth17_img;
      el.partname.includes("Моляр  18") ? tooth_18.current.src = nerv_tooth18_img : tooth_18.current.src = tooth18_img;
      el.partname.includes("Різець 21") ? tooth_21.current.src = nerv_tooth21_img : tooth_21.current.src = tooth21_img;
      el.partname.includes("Різець 22") ? tooth_22.current.src = nerv_tooth22_img : tooth_22.current.src = tooth22_img;
      el.partname.includes("Клик 23") ? tooth_23.current.src = nerv_tooth23_img : tooth_23.current.src = tooth23_img;
      el.partname.includes("Премоляр 24") ? tooth_24.current.src = nerv_tooth24_img : tooth_24.current.src = tooth24_img;
      el.partname.includes("Премоляр 25") ? tooth_25.current.src = nerv_tooth25_img : tooth_25.current.src = tooth25_img;
      el.partname.includes("Моляр 26") ? tooth_26.current.src = nerv_tooth26_img : tooth_26.current.src = tooth26_img;
      el.partname.includes("Моляр 27") ? tooth_27.current.src = nerv_tooth27_img : tooth_27.current.src = tooth27_img;
      el.partname.includes("Моляр 28") ? tooth_28.current.src = nerv_tooth28_img : tooth_28.current.src = tooth28_img;
      el.partname.includes("Різець 31") ? tooth_31.current.src = nerv_tooth31_img : tooth_31.current.src = tooth31_img;
      el.partname.includes("Різець 32") ? tooth_32.current.src = nerv_tooth32_img : tooth_32.current.src = tooth32_img;
      el.partname.includes("Клик 33") ? tooth_33.current.src = nerv_tooth33_img : tooth_33.current.src = tooth33_img;
      el.partname.includes("Премоляр 34") ? tooth_34.current.src = nerv_tooth34_img : tooth_34.current.src = tooth34_img;
      el.partname.includes("Премоляр 35") ? tooth_35.current.src = nerv_tooth35_img : tooth_35.current.src = tooth35_img;
      el.partname.includes("Моляр 36") ? tooth_36.current.src = nerv_tooth36_img : tooth_36.current.src = tooth36_img;
      el.partname.includes("Моляр 37") ? tooth_37.current.src = nerv_tooth37_img : tooth_37.current.src = tooth37_img;
      el.partname.includes("Моляр 38") ? tooth_38.current.src = nerv_tooth38_img : tooth_38.current.src = tooth38_img;
      el.partname.includes("Різець 41") ? tooth_41.current.src = nerv_tooth41_img : tooth_41.current.src = tooth41_img;
      el.partname.includes("Різець 42") ? tooth_42.current.src = nerv_tooth42_img : tooth_42.current.src = tooth42_img;
      el.partname.includes("Клик 43") ? tooth_43.current.src = nerv_tooth43_img : tooth_43.current.src = tooth43_img;
      el.partname.includes("Премоляр 44") ? tooth_44.current.src = nerv_tooth44_img : tooth_44.current.src = tooth44_img;
      el.partname.includes("Премоляр 45") ? tooth_45.current.src = nerv_tooth45_img : tooth_45.current.src = tooth45_img;
      el.partname.includes("Моляр 46") ? tooth_46.current.src = nerv_tooth46_img : tooth_46.current.src = tooth46_img;
      el.partname.includes("Моляр 47") ? tooth_47.current.src = nerv_tooth47_img : tooth_47.current.src = tooth47_img;
      el.partname.includes("Моляр 48") ? tooth_48.current.src = nerv_tooth48_img : tooth_48.current.src = tooth48_img;
      }
    } 
    if(el.proc_name.includes("Видалення зуба або його частин") || el.proc_name.includes("Секційне видалення зуба або його частин(-и)") || el.proc_name.includes("видалення зуба")){
      if(el.partname!==null){
      el.partname.includes("Різець 11") ? tooth_11.current.style.visibility = "hidden" : tooth_11.current.style.visibility = "visible";
      el.partname.includes("Різець 12") ? tooth_12.current.style.visibility = "hidden" : tooth_12.current.style.visibility = "visible";
      el.partname.includes("Клик 13") ? tooth_13.current.style.visibility = "hidden" : tooth_13.current.style.visibility = "visible";
      el.partname.includes("Премоляр 14") ? tooth_14.current.style.visibility = "hidden" : tooth_14.current.style.visibility = "visible";
      el.partname.includes("Премоляр 15") ? tooth_15.current.style.visibility = "hidden" : tooth_15.current.style.visibility = "visible";
      el.partname.includes("Моляр 16") ? tooth_16.current.style.visibility = "hidden" : tooth_16.current.style.visibility = "visible";
      el.partname.includes("Моляр 17") ? tooth_17.current.style.visibility = "hidden" : tooth_17.current.style.visibility = "visible";
      el.partname.includes("Моляр  18") ? tooth_18.current.style.visibility = "hidden" : tooth_18.current.style.visibility = "visible";
      el.partname.includes("Різець 21") ? tooth_21.current.style.visibility = "hidden" : tooth_21.current.style.visibility = "visible";
      el.partname.includes("Різець 22") ? tooth_22.current.style.visibility = "hidden" : tooth_22.current.style.visibility = "visible";
      el.partname.includes("Клик 23") ? tooth_23.current.style.visibility = "hidden" : tooth_23.current.style.visibility = "visible";
      el.partname.includes("Премоляр 24") ? tooth_24.current.style.visibility = "hidden" : tooth_24.current.style.visibility = "visible";
      el.partname.includes("Премоляр 25") ? tooth_25.current.style.visibility = "hidden" : tooth_25.current.style.visibility = "visible";
      el.partname.includes("Моляр 26") ? tooth_26.current.style.visibility = "hidden" : tooth_26.current.style.visibility = "visible";
      el.partname.includes("Моляр 27") ? tooth_27.current.style.visibility = "hidden" : tooth_27.current.style.visibility = "visible";
      el.partname.includes("Моляр 28") ? tooth_28.current.style.visibility = "hidden" : tooth_28.current.style.visibility = "visible";
      el.partname.includes("Різець 31") ? tooth_31.current.style.visibility = "hidden" : tooth_31.current.style.visibility = "visible";
      el.partname.includes("Різець 32") ? tooth_32.current.style.visibility = "hidden" : tooth_32.current.style.visibility = "visible";
      el.partname.includes("Клик 33") ? tooth_33.current.style.visibility = "hidden" : tooth_33.current.style.visibility = "visible";
      el.partname.includes("Премоляр 34") ? tooth_34.current.style.visibility = "hidden" : tooth_34.current.style.visibility = "visible";
      el.partname.includes("Премоляр 35") ? tooth_35.current.style.visibility = "hidden" : tooth_35.current.style.visibility = "visible";
      el.partname.includes("Моляр 36") ? tooth_36.current.style.visibility = "hidden" : tooth_36.current.style.visibility = "visible";
      el.partname.includes("Моляр 37") ? tooth_37.current.style.visibility = "hidden" : tooth_37.current.style.visibility = "visible";
      el.partname.includes("Моляр 38") ? tooth_38.current.style.visibility = "hidden" : tooth_38.current.style.visibility = "visible";
      el.partname.includes("Різець 41") ? tooth_41.current.style.visibility = "hidden" : tooth_41.current.style.visibility = "visible";
      el.partname.includes("Різець 42") ? tooth_42.current.style.visibility = "hidden" : tooth_42.current.style.visibility = "visible";
      el.partname.includes("Клик 43") ? tooth_43.current.style.visibility = "hidden" : tooth_43.current.style.visibility = "visible";
      el.partname.includes("Премоляр 44") ? tooth_44.current.style.visibility = "hidden" : tooth_44.current.style.visibility = "visible";
      el.partname.includes("Премоляр 45") ? tooth_45.current.style.visibility = "hidden" : tooth_45.current.style.visibility = "visible";
      el.partname.includes("Моляр 46") ? tooth_46.current.style.visibility = "hidden" : tooth_46.current.style.visibility = "visible";
      el.partname.includes("Моляр 47") ? tooth_47.current.style.visibility = "hidden" : tooth_47.current.style.visibility = "visible";
      el.partname.includes("Моляр 48") ? tooth_48.current.style.visibility = "hidden" : tooth_48.current.style.visibility = "visible";
    }
  }
   })
  }
  }
oral_cavity_parts = ocpData.map(({ partname }) => ({ ['label']: partname , ['value']: partname }));
procedures= dirProceduresData.map(({ proc_name }) => ({ ['label']: proc_name , ['value']: proc_name }));
}
const [show, setShow] = useState(false);
const [showShareBoard, setShowShareBoard] = useState(false);
const [filterNumber, setFilter] = useState(1);
const [filterOn, setFilterOn] = useState(0);
const [procedureAfterFilter, setprocedureAfterFilter]= useState([]);
const showSharing = () =>{
  setShowShareBoard(current => !current);
}
const showFilter = () =>{
  setShow(current => !current);
 }
const showTreatments = async()=>{
  setFilter(1);
}
const showProcedures = async()=>{
  setFilter(3);
}
const showRecords = async()=>{
  setFilter(2);
}
//реалізація пошук даних за фільтром
const acceptFilter = async(e) =>{
  procedureAfterFilter.splice(0,procedureAfterFilter.length);
  e.preventDefault();
  let procedF = JSON.parse(JSON.stringify(selected));
  let ocpF=JSON.parse(JSON.stringify(selected2));
  let dateStr = new Date(JSON.stringify(dateStFilter));
  let dateEnd = new Date(JSON.stringify(dateEnFilter)); 
  if( checkbox.current.checked){
      recordsData.forEach((el)=>{
        let dateRec = new Date(el.record_date);
        if(dateRec>dateStr && dateRec <dateEnd){
          procedureAfterFilter.push(el);
        }
      })
      setFilter(2);
      setFilterOn(1);
  }else{
    proceduresData.forEach((el)=>{
      if((Object.keys(procedF)).length>0){
        procedF.forEach((element)=>{
          if(element.value==el.proc_name){
            if((Object.keys(ocpF)).length>0){
              ocpF.forEach((ocp)=>{
                if(el.partname.includes(ocp.value)){
                  procedureAfterFilter.push(el);
                }
              })
            }else{
              procedureAfterFilter.push(el);
            }
          }else{
            if((Object.keys(ocpF)).length>0){
              ocpF.forEach((ocp)=>{
                if(el.partname.includes(ocp.value)){
                  procedureAfterFilter.push(el);
                }
              })
            }
          }
        });
      }else if((Object.keys(ocpF)).length>0){
        ocpF.forEach((ocp)=>{
          if(el.partname.includes(ocp.value)){
            if((Object.keys(procedF)).length>0){
              procedF.forEach((element)=>{
                if(element.value==el.proc_name){
                  procedureAfterFilter.push(el);
                }
              })
            }else{
              procedureAfterFilter.push(el);
            }
          }else{
            if((Object.keys(procedF)).length>0){
              procedF.forEach((element)=>{
                if(element.value==el.proc_name){
                  procedureAfterFilter.push(el);
                }
              })
            }
          }
        })
      }
    });
    setFilter(3);
    setFilterOn(1);
  }
}
//перемикання між типами записів
const  rightFilter= async()=>{
  if(filterNumber==1){
    setFilter(2);
  }else if(filterNumber==2){
    setFilter(3);
  }else if(filterNumber==3){
    setFilter(1);
  }
}
const leftFilter = async()=>{
  if(filterNumber==1){
    setFilter(3);
  }else if(filterNumber==2){
    setFilter(1);
  }else if(filterNumber==3){
    setFilter(2);
  }
}
const [doctorsData, setDoctors]= useState([]);
const [doctorsLoading, setdoctorsLoading]= useState(false);
const [doctorsErr, setDoctorsErr] = useState('');
//реалізація пошуку лікаря
const GetDoctors = async()=>{
  setdoctorsLoading(true);
    try {
      const response = await fetch("http://localhost:8800/users/doctors?username="+inputs.username+"&phone="+inputs.phone, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setDoctors(result);
    } catch (err) {
      setDoctorsErr(err.message);
    } finally {
      setdoctorsLoading(false);
    }
}
  return (
    <> 
    <div className='mouth-board'>
      <div className='mouth-board__left-wrap'>
        <img className='mouth-board__mouth'src={mouth_img}/>
        <img className='mouth__tooth_11 mouth__tooth' ref={tooth_11} src={tooth11_img}/>
        <img className='mouth__tooth_12 mouth__tooth' ref={tooth_12} src={tooth12_img}/>
        <img className='mouth__tooth_13 mouth__tooth' ref={tooth_13} src={tooth13_img}/>
        <img className='mouth__tooth_14 mouth__tooth' ref={tooth_14} src={tooth14_img}/>
        <img className='mouth__tooth_15 mouth__tooth' ref={tooth_15} src={tooth15_img}/>
        <img className='mouth__tooth_16 mouth__tooth' ref={tooth_16} src={tooth16_img}/>
        <img className='mouth__tooth_17 mouth__tooth' ref={tooth_17} src={tooth17_img}/>
        <img className='mouth__tooth_18 mouth__tooth' ref={tooth_18} src={tooth18_img}/>
        <img className='mouth__tooth_21 mouth__tooth' ref={tooth_21} src={tooth21_img}/>
        <img className='mouth__tooth_22 mouth__tooth' ref={tooth_22} src={tooth22_img}/>
        <img className='mouth__tooth_23 mouth__tooth' ref={tooth_23} src={tooth23_img}/>
        <img className='mouth__tooth_24 mouth__tooth' ref={tooth_24} src={tooth24_img}/>
        <img className='mouth__tooth_25 mouth__tooth' ref={tooth_25} src={tooth25_img}/>
        <img className='mouth__tooth_26 mouth__tooth' ref={tooth_26} src={tooth26_img}/>
        <img className='mouth__tooth_27 mouth__tooth' ref={tooth_27} src={tooth27_img}/>
        <img className='mouth__tooth_28 mouth__tooth' ref={tooth_28} src={tooth28_img}/>
        <img className='mouth__tooth_31 mouth__tooth' ref={tooth_31} src={tooth31_img}/>
        <img className='mouth__tooth_32 mouth__tooth' ref={tooth_32} src={tooth32_img}/>
        <img className='mouth__tooth_33 mouth__tooth' ref={tooth_33} src={tooth33_img}/>
        <img className='mouth__tooth_34 mouth__tooth' ref={tooth_34} src={tooth34_img}/>
        <img className='mouth__tooth_35 mouth__tooth' ref={tooth_35} src={tooth35_img}/>
        <img className='mouth__tooth_36 mouth__tooth' ref={tooth_36} src={tooth36_img}/>
        <img className='mouth__tooth_37 mouth__tooth' ref={tooth_37} src={tooth37_img}/>
        <img className='mouth__tooth_38 mouth__tooth' ref={tooth_38} src={tooth38_img}/>
        <img className='mouth__tooth_41 mouth__tooth' ref={tooth_41} src={tooth41_img}/>
        <img className='mouth__tooth_42 mouth__tooth' ref={tooth_42} src={tooth42_img}/>
        <img className='mouth__tooth_43 mouth__tooth' ref={tooth_43} src={tooth43_img}/>
        <img className='mouth__tooth_44 mouth__tooth' ref={tooth_44} src={tooth44_img}/>
        <img className='mouth__tooth_45 mouth__tooth' ref={tooth_45} src={tooth45_img}/>
        <img className='mouth__tooth_46 mouth__tooth' ref={tooth_46} src={tooth46_img}/>
        <img className='mouth__tooth_47 mouth__tooth' ref={tooth_47} src={tooth47_img}/>
        <img className='mouth__tooth_48 mouth__tooth' ref={tooth_48} src={tooth48_img}/>
      </div>
      <div className='mouth-board__right-wrap'>
        <div className='mouth-board__card'>
          <div className='mouth-board__text-wrap_left'>
            <p className='mouth-board__text'>Кількість зубів:</p>
          </div>
          <div className='mouth-board__text-wrap_right'>
            <p className='mouth-board__text-days_data number_teeth'>{teethNumber}</p>
          </div>
        </div>
        <div className='mouth-board__card'>
          <div className='mouth-board__text-wrap_left'>
            <p className='mouth-board__text'>Час з останнього відвідування стоматолога:</p>
          </div>
          <div className='mouth-board__text-wrap_right'>
            <p className='mouth-board__text-days_data last_appointment'>{diffDays}</p>
            <p className='mouth-board__text-days'>днів</p>
          </div>
        </div>
        <div className='mouth-board__card'>
          <div className='mouth-board__text-wrap_left'>
            <p className='mouth-board__text'>Час з останньої професійної чистки:</p>
          </div>
          <div className='mouth-board__text-wrap_right'>
            <p className='mouth-board__text-days_data last_cleaning'>{diffInProBrushing}</p>
            <p className='mouth-board__text-days'>днів</p>
          </div>
        </div>
        <div className='mouth-board__card'>
          <div className='mouth-board__text-wrap_left'>
            <p className='mouth-board__text'>Час з останньої заміни зубної щітки:</p>
          </div>
          <div className='mouth-board__text-wrap_right'>
            <p className='mouth-board__text-days_data last_brushchange'>{brushChange}</p>
            <p className='mouth-board__text-days'>днів</p>
          </div>
        </div>
        <div className='mouth-board__card'>
          <div className='mouth-board__text-wrap_left'>
            <p className='mouth-board__text'>Сьогоднішня кількість разів чистки зубів:</p>
          </div>
          <div className='mouth-board__text-wrap_right'>
            <p className='mouth-board__text-days_data count_today_brushing'>{brushing}</p>
          </div>
        </div>
      </div>
    </div>
    <div className='diary'>
      <div className='diary__filters-wrap'>
        <button className='filters__buttn_treatment filters__buttn' onClick={showTreatments} >
          <p className='filters__buttn-text' >ЛІКУВАННЯ</p>
        </button>
        <button className='filters__buttn_records filters__buttn' onClick={showRecords}>
          <p className='filters__buttn-text' >ЗАПИСИ</p>
        </button>
        <button className='filters__buttn_procedures filters__buttn' onClick={showProcedures}>
          <p className='filters__buttn-text' >ПРОЦЕДУРИ</p>
        </button>
      </div>
      <div className='diary__nav-panel'>
        <div className='nav-panel__arrows'>
          <button className='buttons__left' onClick={leftFilter}></button>
          <button className='buttons__right'onClick={rightFilter}></button>
        </div>
        <div className='nav-panel__button-wrap'>
          <Link to="/treatment">
            <button className=' nav-panel__button nav-panel__button_primary button__add-treatment'>
              <p className='nav-panel__button_text'>Нове лікування</p>
            </button>
          </Link>
          <button className='nav-panel__button nav-panel__button_secondary button__share'>
            <p className='nav-panel__button_text' onClick={showSharing}>Поділитися</p>
          </button>
          <button className='button__filter' onClick={showFilter}></button>
        </div>
      </div>
      <div className='diary__records'>
        <div className='diary__records-wrap'>
        {treatmentError
        ? "Щось пішло не так!"
        : treatmentLoading
        ? "завантаження..."
        : filterNumber===1
        ? treatmentData.map((treatments)=> <TreatmentCard treatment={treatments} key={treatments.idtreatment}/>)
        : ""
        }
        {recordsError
        ? "Щось пішло не так!"
        : recordsLoading
        ? "завантаження..."
        : filterNumber===2 
        ? filterOn===1 
        ? procedureAfterFilter.map((records) => <RecordCard teeth_record={records} key={records.idrecord}/>)
        : recordsData.map((records) => <RecordCard teeth_record={records} key={records.idrecord}/>)
        : ""
        }
        {proceduresError
        ? "Щось пішло не так!"
        : proceduresLoading
        ? "завантаження..."
        : filterNumber===3
        ? filterOn===1 
        ? procedureAfterFilter.map((procedures) => <ProcedureCard procedure={procedures} key={procedures.idprocedure}/>)
        : proceduresData.map((procedures) => <ProcedureCard procedure={procedures} key={procedures.idprocedure}/>)
        : ""
        }
        </div>
      </div>
    </div>
    <div className='sharing-board' style={{display: showShareBoard ? 'block' : 'none'}}>
      <div className='sharing-board__wrap'>
          <p className='sharing-board__text_header'>Введіть дані для пошуку</p>
          <div className='sharing-board__input-wrap'>
            <p className='sharing-board__text_title'>Прізвище Ім'я Побатькові:</p>
            <input type="text" className='sharing-board__input_name' name="username" onChange={handleChange}/>
          </div>
          <div className='sharing-board__input-wrap'>
            <p className='sharing-board__text_title'>Номер телефону:</p>
            <input type="text" className='sharing-board__input_name' name="phone" onChange={handleChange}/>
          </div>
          <div className='sharing-board__input-wrap_buttons'>
            <button className='sharing-board__buttn_search' onClick={GetDoctors}>Пошук</button>
        </div>
        <div className='result-box'>
          <p className='result-box__text_header'>Результат пошуку:</p>
        {doctorsData.length>0
        ? doctorsData.map((results)=> <ResultBox result={results} key={results.iduser}/>)
        : "Не знайдено відповідностей"
        }
        </div>
      </div>
    </div>
    <div className='filter-board' rex={filter_box} style={{display: show ? 'block' : 'none'}} >
      <div className='filter-board__wrap'>
        <div className='filter-board__header-wrap'>
          <input type='checkbox' className='filter-board__check-date' ref={checkbox}/>
          <p className='filter-board__text_title'>Дата:</p>
          <div className='filter-board__date-wrap'>
          <p className='filter-board__text_title'>з</p>
          <input type="date" className='filter-board__date_start filter-board__input-date' name="date" value={dateStFilter} onChange={(e)=>setDateStFilter(e.target.value)}/>
          <p className='filter-board__text_title'>до</p>
          <input type="date" className='filter-board__date_end filter-board__input-date' value={dateEnFilter} onChange={(e)=>setDateEnFilter(e.target.value)} />
          </div>
        </div>
        <div className='filter-board__select-wrap'>
          <p className='filter-board__text_title'>Процедура:</p>
            <MultiSelect 
              className='filter-board__select'
               options={procedures}
              value = {selected}
              onChange={setSelected}
              labelledBy='Select'
            />
        </div>
        <div className='filter-board__select-wrap'>
          <p className='filter-board__text_title'>Область застосування:</p>
            <MultiSelect 
              className='filter-board__select'
               options={oral_cavity_parts}
              value = {selected2}
              onChange={setSelected2}
              labelledBy='Select'
            />
        </div>
        <div className='filter-board__button-wrap'>
          <button className='filter-board__button' onClick={acceptFilter}>
            <p className='filter-board__buttn-text'>Застосувати</p>
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
export default PatientDiary;