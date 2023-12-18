import React, {useState, useRef} from 'react';
import "./accesses.scss";
import AccessCard from '../../components/accessCard/AccessCard';
import { makeRequest } from '../../axios';
import {useQuery } from 'react-query'
const Accesses = () => {
  const [pages, setPage]= useState({
    from: 0,
    to: 9
});
const [search, setSearch]= useState("");
const [resultSearch, setReltSearch]=useState([]);
const {isLoading: accessLoading, error: accessError, data: accessData} =useQuery(['accesse'], ()=>
makeRequest.get("/diaries/view?iduser="+JSON.parse(localStorage.getItem("user")).iduser).then(res=>{
  return res.data;
}));
localStorage.setItem("patient", JSON.stringify({"":""}));
const leftClick = (e)=>{
  e.preventDefault();
  let pageFrom;
  let pageTo;
  if(pages.from>=10){
    pageFrom = pages.from-10;
    pageTo = pages.to-10;
    setPage((prev)=>({...prev, ["from"]: pageFrom, ["to"]: pageTo}));
  }  
}
const rightClick = (e)=>{
  e.preventDefault();
  let pageFrom = pages.from+10;
  let pageTo = pages.to+10;
  if(pageTo>accessData.length-1){
    pageTo = accessData.length;
    let diff = pageTo-pageFrom;
    if(diff<0){
      pageFrom=pages.from;
    }
  }
  setPage((prev)=>({...prev, ["from"]: pageFrom, ["to"]: pageTo}));
}
const searchDiary =(e)=>{
  resultSearch.splice(0, resultSearch.length);
  e.preventDefault();
  accessData.forEach((el)=>{
    if(el.owner.includes(search)){
      resultSearch.push(el);
    }
  })
}
  return (
    <>
    <div className='accesses'>
      
      <form className='accesses__searching'>
        <input type="text" className='accesses__input-search' value={search}  onChange={(e)=>setSearch(e.target.value)} placeholder='Пошук' />
        <button className='accesses__buttn-search' onClick={searchDiary}>Знайти</button>
      </form>
      <div className='accesses__diaries'>
        {
          resultSearch.length>0
          ? resultSearch.map((access)=><AccessCard patient={access} key={access.owner_id}/>)
          :accessError
          ? "Щось пішло не так!"
          : accessLoading
          ? "завантаження..."
          : accessData.map((access)=><AccessCard patient={access} key={access.owner_id}/>).splice(pages.from,pages.to)
        }        
      </div>
      <div className='accesses__buttons'>
        <button className='accesses__buttons_left' onClick={leftClick}></button>
        <button className='accesses__buttons_right' onClick={rightClick}></button>
      </div>
    </div>
    </>
  )
}
export default Accesses