import React, {useRef,useState}from "react";
import "./brushing_record.scss";
import circleChecked_img from "../../images/icons/svges/check_circle_icon.svg";
import circleNotChecked_img from "../../images/icons/svges/blank_check_circle_icon.svg";
import { useQuery, useMutation, queryClient } from 'react-query';
import { makeRequest } from "../../axios";
const BrushingRecord =({brushing})=>{
    const morningCheckRef = useRef(null);
    const afterMealsRef = useRef(null);
    const beforeSleepRef = useRef(null);
    if(morningCheckRef.current!==null && afterMealsRef.current!==null && beforeSleepRef.current!==null){
        brushing.morning_check==1?morningCheckRef.current.src=circleChecked_img:morningCheckRef.current.src=circleNotChecked_img;
        brushing.after_meals==1?afterMealsRef.current.src=circleChecked_img:afterMealsRef.current.src=circleNotChecked_img;
        brushing.before_sleep==1?beforeSleepRef.current.src=circleChecked_img:beforeSleepRef.current.src=circleNotChecked_img;
    }
    const deleteMutationR = useMutation(
        (recId) => {
          return makeRequest.delete("/brushing/api/" + recId);
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["brushings"]);
          },
        }
      );
      const deleteBrushing =(e)=>{
        e.preventDefault();
        let answer = window.confirm('Ви впевнені, що хочете видалити цей запис і що з ним пов\'язано?')
        if (answer){
            deleteMutationR.mutate(brushing.id_brushing);
            window.location.reload(false);
        }
      }
      const updateClick = (e)=>{
        e.preventDefault();
        localStorage.setItem("update", JSON.stringify({
            "status": "on",
             "id_brushing":brushing.id_brushing,
             "brushing_date": brushing.brushing_date,
             "number_of_times": brushing.number_of_times,
             "morning_check": brushing.morning_check,
             "after_meals": brushing.after_meals,
             "before_sleep": brushing.before_sleep            
            }));
      }
    return(
        <div className='brushing-card'>
            <div className='brushing-card__text-wrap brushing-card__text-wrap_primary'>
              <p className='brushing-card__text'>{brushing.brushing_date}</p> 
            </div>
            <div className='brushing-card__text-wrap brushing-card__text-wrap_secondary'>
              <img className='brushing-card__img brushing-card__img_secondary' ref={morningCheckRef} alt="" src={brushing.morning_check==1 ? circleChecked_img : circleNotChecked_img}/>
            </div>
            <div className='brushing-card__text-wrap brushing-card__text-wrap_tertiary'>
              <img className='brushing-card__img brushing-card__img_tertiary' ref={afterMealsRef} alt="" src={brushing.after_meals==1 ? circleChecked_img : circleNotChecked_img}/>            
            </div>
            <div className='brushing-card__text-wrap brushing-card__text-wrap_quanternary'>
              <img className='brushing-card__img brushing-card__img_quanternary' ref={beforeSleepRef} alt="" src={brushing.before_sleep==1 ? circleChecked_img : circleNotChecked_img}/>            
            </div>
            <div className='brushing-card__text-wrap brushing-card__text-wrap_fifth'>
              <div className='brushing-card__circle-count'>
                <p className='brushing-card__circle-text'>{brushing.number_of_times}</p>
              </div>
            </div>
            <div className='brushing-card__buttns-wrap'>
                  <button className='brushing-card__buttn_delete buttn_delete' onClick={deleteBrushing}></button>
                   <button className='brushing-card__buttn_edit buttn_edit' onClick={updateClick}></button> 
            </div>
          </div>
    )
}
export default BrushingRecord;