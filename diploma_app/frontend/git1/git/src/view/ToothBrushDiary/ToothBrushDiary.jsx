import React, { useState } from 'react'
import  brushes_img from "../../images/brushes.svg"
import  brush_img from "../../images/brush3.svg"
import "./tooth_brush_diary.scss";
import BrushRecord from '../../components/brushRecord/brushRecord';
import HistoryBrush from '../../components/historyBrush/historyBrush';
import { useQuery, useMutation, queryClient, useRef } from 'react-query';
import axios from 'axios';
import { makeRequest } from '../../axios';
const ToothBrushDiary = () => {
  const historyBrushes = [];
  const activeBrushes =[];
  const [firstArray, setFirstArray] = useState([]);
  const [secondArray, setArray]= useState([]);
  const {isLoading: brushesLoading, error: brushesError, data: brushesData} =useQuery(['brushes'], ()=>
  makeRequest.get("/brushes?userId="+JSON.parse(localStorage.getItem('user')).iduser).then(res=>{
    res.data.forEach((el)=>{
      if(el.start_date!==null && el.start_date!==""){
        let stDate = new Date(el.start_date);
        el.start_date= `${stDate.getFullYear()}-${stDate.getMonth()+1}-${stDate.getDate()}`
      }
      if(el.end_date!==null && el.end_date!==""){
        let enDate = new Date(el.end_date);
        el.end_date= `${enDate.getFullYear()}-${enDate.getMonth()+1}-${enDate.getDate()}`
      }
      if(el.status==0){
        historyBrushes.push(el);
      }else{
        activeBrushes.push(el);
      }
    })
    if(secondArray.length<1){
      secondArray.push(historyBrushes);
    }
    if(firstArray.length<1){
      firstArray.push(activeBrushes);
    }
  return res.data;
}));
const [show, setShow] = useState(false);
 const showAddBox = (e)=>{
  e.preventDefault();
  setShow(current => !current);
 }
 const [newBrush, setNewBrush]= useState({
   iduser: JSON.parse(localStorage.getItem("user")).iduser,
   hardness: "",
   color: "",
   start_date: "",
   status: 1
 })
const handleChange =(e)=>{
  setNewBrush((prev)=>({...prev, [e.target.name]:e.target.value}));
}
const addBrush =async(e)=>{
  e.preventDefault();
  try{
    const res = await axios.post("http://localhost:8800/brushes",newBrush );
  }catch (err){
    console.log(err)
  }
}
  return (
    <>
      <div className='active-brush'>
        <div className='active-brush__wrap'>
          <div className='active-brush__left'>
            <img className='active-brush__img' src={brushes_img}/>
          </div>
          <div className='active-brush__right'>
            <div className='active-brush__boxes-wrap'>
            {brushesError
            ? "Щось пішло не так!"
            : brushesLoading
            ? "завантаження..."
            : firstArray.length>0
            ? firstArray[0].map((el)=><BrushRecord brush={el} key={el.idtoothbrush}/>)
            : ""
            }            
            </div>
            <div className='active-brush__buttn-wrap'>
              <button className='active-brush__buttn-add' onClick={showAddBox}>{ show ? 'Закрити' : 'Додати'}</button>
            </div>
          </div>
        </div>
      </div>
      <div className='brushes'>
        <div className='brushes__text_header-wrap'>
          <p className='brushes__text_header'>Попередні записи:</p>
        </div>
        <div className='brushes__history'>
          {secondArray.length>0
          ? secondArray[0].map((el)=><HistoryBrush brush={el} key={el.idtoothbrush}/>)
          :""          
          }        
        </div>
      </div>
      <div className='new-toothbrush' style={{display: show ? 'block' : 'none'}}>
        <div className='new-toothbrush__header-wrap'>
          <p className='new-toothbrush__text_header'>Зубна щітка</p>
        </div>
        <div className='new-toothbrush__input-wrap'>
          <p className='new-toothbrush__text_title'>Жорсткість:</p>
          <input type="text" className='new-toothbrush__input new-toothbrush__input_hardness' name="hardness" onChange={handleChange}/>
        </div>
        <div className='new-toothbrush__input-wrap'>
          <p className='new-toothbrush__text_title'>Колір:</p>
          <input type="text" className='new-toothbrush__input new-toothbrush__input_color' name="color" onChange={handleChange}/>
        </div>
        <div className='new-toothbrush__input-wrap'>
          <p className='new-toothbrush__text_title'>Дата:</p>
          <input type="date" className='new-toothbrush__input new-toothbrush__input_date' name="start_date" onChange={handleChange}/>
        </div>
        <div className='new-toothbrush__buttn-wrap'>
          <button className='new-toothbrush__buttn' onClick={addBrush}>Зберегти</button>
        </div>
        <div className='new-toothbrush__img-wrap'>
          <img className='new-toothbrush__img' src={brush_img}/>
        </div>
      </div>
    </>
  )
}
export default ToothBrushDiary