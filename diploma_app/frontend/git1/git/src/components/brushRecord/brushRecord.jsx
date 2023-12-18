import React from "react";
import "./brushRecord.scss";
import { useQuery, useMutation, queryClient } from 'react-query';
import { makeRequest } from "../../axios";
const BrushRecord = ({brush})=>{
    let diffInProBrushing =0;
    let dateNow =new Date();
    let lastProBrushingDate = new Date(brush.start_date);
    diffInProBrushing=Math.ceil(Math.abs(dateNow-lastProBrushingDate)/(1000*60*60*24));
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
      const updateMutation = useMutation(
        (upd) => {
          return makeRequest.put("/brushes/api/upd/"+upd);
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["brushes"]);
          },
        }
        );
const editClick =(e)=>{
    let answer = window.confirm('Ви впевнені, що хочете перестати користуватися цією щіткою?')
    if(answer){
        updateMutation.mutate(brush.idtoothbrush)
    } 
}
const deleteClick =(e)=>{
    let answer = window.confirm('Ви впевнені, що хочете видалити цей запис і що з ним пов\'язано?')
    if (answer){
        deleteMutationR.mutate(brush.idtoothbrush);
        window.location.reload(false);
    }
}
    return(
        <div className='box'>
                <div className='box__permanent'>
                  <div className='box__text-wrap'>
                    <div className='box__text-wrap_left'>
                      <p className='box__text_title'>Дата:</p>
                    </div>
                    <div className='box__text-wrap_right'>
                      <p className='box__text_data'>{brush.start_date}</p>
                    </div>
                  </div>
                  <div className='box__text-wrap'>
                    <div className='box__text-wrap_left'>
                      <p className='box__text_title'>Жорсткість:</p>
                    </div>
                    <div className='box__text-wrap_right'>
                      <p className='box__text_data'>{brush.hardness}</p>
                    </div>
                  </div>
                  <div className='box__text-wrap'>
                    <div className='box__text-wrap_left'>
                      <p className='box__text_title'>Колір:</p>
                    </div>
                    <div className='box__text-wrap_right'>
                      <p className='box__text_data'>{brush.color}</p>
                    </div>
                  </div>
                </div>
                <div className='box__secondary'>
                  <div className='box__circle'>
                    <p className='box__text_termin'>{diffInProBrushing}</p>
                  </div>
                </div>
                <div className='manage__buttns-wrap'>
                    <button className='buttn_delete' onClick={deleteClick}></button>
                    <button className='buttn_edit' onClick={editClick}></button>
                </div>
            </div>
    )
}
export default BrushRecord;