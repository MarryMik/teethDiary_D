import React , { Component }from 'react'
import star_img from "../../images/icons/svges/favorite_star_favorites_favourite_multimedia_icon.svg"
import  feather_img from "../../images/icons/svges/wing_feather_angel_heaven_bird_icon.svg"
import { useQuery, useMutation, queryClient } from 'react-query';
import { makeRequest } from '../../axios';
import { useNavigate } from "react-router-dom";
const RecordCard = ({teeth_record}) => {
    const deleteMutationR = useMutation(
        (recId) => {
          return makeRequest.delete("/records/api/" + recId);
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["records"]);
          },
        }
      ); 
    const deleteRecord = ()=>{
        let answer = window.confirm('Ви впевнені, що хочете видалити цей запис і що з ним пов\'язано?')
        if (answer){
            deleteMutationR.mutate(teeth_record.idrecord);
            window.location.reload(false);
        }
    };
    const navigate=useNavigate();
    const updateRecord= ()=>{
        localStorage.setItem("record", JSON.stringify(
            {"idrecord":teeth_record.idrecord,
            "record_date": teeth_record.record_date,
            "record_adress":teeth_record.record_adress,
            "doctor_name": teeth_record.doctor_name,
            "prescription":teeth_record.prescription,
            "rating": teeth_record.rating       
            }))
        navigate("/record")
    }
  return (
    <div className='record-card'>
        <img className='record-card__feather_first' src={feather_img}/>
        <img className='record-card__feather_second' src={feather_img}/>
        <div className='record-card__left'>
            <div className='record-card__field-wrap'>
                <p className='record-card__text_title record-card__text_title-primary'>Дата:</p>
                <p className='record-card__text_data'>{teeth_record.record_date}</p>
            </div>
            <div className='record-card__field-wrap'>
                <p className='record-card__text_title record-card__text_title-secondary'>Лікар:</p>
                <p className='record-card__text_data'>{teeth_record.doctor_name}</p>
            </div>
            <div className='record-card__field-wrap'>
                <p className='record-card__text_title record-card__text_title-tertiary'>Адреса:</p>
                <p className='record-card__text_data'>{teeth_record.record_adress}</p>
            </div>
            <div className='record-card__field-wrap'>
                <p className='record-card__text_title record-card__text_title-quaternary'>Кіл-ть процедур:</p>
                <p className='record-card__text_data'>{teeth_record.number_of_procedures}</p>
            </div>
            <div className='record-card__field-wrap'>
                <p className='record-card__text_title record-card__text_title-fifth'>Рецепт:</p>
                <p className='record-card__text_data'>{teeth_record.prescription}</p>
            </div>
        </div>
        <div className='record-card__right'>
            <div className='manage__buttns-wrap'>
                <button className='buttn_delete' onClick={deleteRecord}></button>
                <button className='buttn_edit' onClick={updateRecord}></button>
            </div>
            <div className='record-card__rating-wrap'>
                <p className='rating__text'>{teeth_record.rating}</p>
                <img className='rating__icon' src={star_img}/>
            </div>
        </div>
      </div>
    )
}
export default RecordCard