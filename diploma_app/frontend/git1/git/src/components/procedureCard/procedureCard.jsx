//підключення модулів
import React ,{ useRef }from 'react'
import file_img from "../../images/icons/svges/drive_file_insert_icon.svg"
import  feather_img from "../../images/icons/svges/wing_feather_angel_heaven_bird_icon.svg"
import { useMutation, queryClient } from 'react-query';
import { makeRequest } from '../../axios';
import { useNavigate } from "react-router-dom";
//модуль картки процедури
const ProcedureCard = ({procedure}) => {
    const navigate=useNavigate();
    //обробка видалення
    const deleteMutation = useMutation(
        (procId) => {return makeRequest.delete("/procedures/api/" + procId); },
        {onSuccess: () => {queryClient.invalidateQueries(["procedures"]);},});
    const deleteProcedure = ()=>{
        let answer = window.confirm('Ви впевнені, що хочете видалити цей запис і що з ним пов\'язано?')
        if (answer){
            deleteMutation.mutate(procedure.idprocedure);
            window.location.reload(false);
        }};
        // реалізація відкриття файлу
    const openProcFile =(event)=>{ 
      localStorage.setItem("procedure",JSON.stringify({
        idprocedure: procedure.idprocedure,
        partname: procedure.partname,
        proc_name: procedure.proc_name,
        id_or_cav_part: procedure.id_or_cav_part
      }) );
      navigate("/procedure_file");}
      //обробка оновлення
    const updateProcedure=()=>{ 
      localStorage.setItem("procedure",JSON.stringify({
        idprocedure: procedure.idprocedure,
        partname: procedure.partname,
        proc_name: procedure.proc_name,
        id_or_cav_part: procedure.id_or_cav_part
      }) );
      navigate("/procedure")}
    const buttFileRef = useRef(null);
    if(buttFileRef.current!==null){
      if(procedure.file_name!==null){
        buttFileRef.current.style.display="block"
      }else{
        buttFileRef.current.style.display="none"
      } }
    return ( 
        <div className='procedure-card'>
            <img className='procedure-card__feather_first' src={feather_img}/>
            <img className='procedure-card__feather_second' src={feather_img}/>
            <div className="procedure-card__left-wrap">
                <p className='procedure-card__text-title'>Назва:</p>
            </div>
            <p className='procedure-card__text-data_name procedure-card__text-data'>{procedure.proc_name}</p>
            
            <div className='procedure-card__buttns-wrap'>
                <button className='buttn_delete' onClick={deleteProcedure}></button>
                <button className='buttn_edit' onClick={updateProcedure}></button>
            </div>
            <div className="procedure-card__left-wrap">
                <p className='procedure-card__text-title'>Область застосування</p>
            </div>
            <p className='procedure-card__text-data_name procedure-card__text-data'>{procedure.partname}</p>
            <button className='procedure-card__file-img' ref={buttFileRef} onClick={openProcFile} src={file_img} ></button>
      </div>
    )}
export default ProcedureCard