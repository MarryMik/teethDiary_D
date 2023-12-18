import React, {useState} from "react";
import "./history_brush.scss";
import { useQuery, useMutation, queryClient } from 'react-query';
import { makeRequest } from "../../axios";
const HistoryBrush =({brush})=>{
    let diff =0;
    if(brush.end_date!==null && brush.start_date!==null ){
        let end =new Date(brush.end_date);
        let start = new Date(brush.start_date);
        diff=Math.ceil(Math.abs(end-start)/(1000*60*60*24));
    }
    const deleteMutationR = useMutation(
        (recId) => {
          return makeRequest.delete("/brushes/api/" + recId);
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["brushes"]);
          },
        }
      );
    const deleteBrush= ()=>{
        let answer = window.confirm('Ви впевнені, що хочете видалити цей запис і що з ним пов\'язано?')
        if (answer){
            deleteMutationR.mutate(brush.idtoothbrush);
            window.location.reload(false);
        }
    }
    return(
        <div className='history'>
            <div className='history__text-wrap history__text-wrap_permanent'>
              <p className=' history__text history__text_title'>Дата:</p>
              <p className=' history__text history__text_data'>{brush.start_date}</p>
            </div>
            <div className='history__text-wrap history__text-wrap_secondary'>
              <p className='history__text history__text_title'>Час використання:</p>
              <p className='history__text history__text_data'>{diff}</p>
            </div>
            <div className='history__text-wrap history__text-wrap_third'>
              <p className='history__text history__text_title'>Жорсткість:</p>
              <p className='history__text history__text_data'>{brush.hardness}</p>
            </div>
            <div className='history__text-wrap history__text-wrap_tertiary'>
              <p className='history__text history__text_title'>Колір:</p>
              <p className='history__text history__text_data'> brush.color</p>
            </div>
            <div className='history__buttns-wrap'>
                <button className='history__buttn history__buttn_delete buttn_delete' onClick={deleteBrush}></button>
            </div>
          </div>
    )
}
export default HistoryBrush;