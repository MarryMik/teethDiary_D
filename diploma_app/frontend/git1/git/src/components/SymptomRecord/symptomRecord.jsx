import React from "react";
import "./symptom_record.scss";
import { useQuery, useMutation, queryClient } from 'react-query';
import { makeRequest } from '../../axios';
const SymptomRecord =({symptom})=>{
    const deleteMutationR = useMutation(
        (sId) => {
          return makeRequest.delete("/symptoms/api/" + sId);
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["records"]);
          },
        }
      );
    const deleteSymptom =()=>{
        let answer = window.confirm('Ви впевнені, що хочете видалити цей запис і що з ним пов\'язано?')
        if (answer){
            deleteMutationR.mutate(symptom.idsymptom);
            window.location.reload(false);
        }
    }
    return(
        <div className='symptom-card'>
          <div className='symptom-card__wrap symptom-card__wrap_primary'>
            <p className='symptom-card__text_title'>Назва:</p>
            <div className='symptom-card__text_wrap'>
              <p className='symptom-card__text_data symptom-card__text_data-name'>{symptom.symptom_name}</p>
            </div>
          </div>
          <div className='symptom-card__wrap symptom-card__wrap_secondary'>
            <p className='symptom-card__text_title'>Дата початку:</p>
            <div className='symptom-card__text_wrap'>
              <p className='symptom-card__text_data symptom-card__text_data-date'>{symptom.symptom_datestart}</p>
            </div>
          </div>
          <div className='symptom-card__wrap symptom-card__wrap_tertiary'>
            <p className='symptom-card__text_title'>Біль:</p>
            <div className='symptom-card__circle'>
              <p className='symptom-card__text_data symptom-card__circle-text_data'>{symptom.level_pain}</p>
            </div>
          </div>
          <div className='symptom-card__wrap symptom-card__wrap_quanternary'>
            <button className='symptom-card__buttn_delete buttn_delete' onClick={deleteSymptom}></button>
          </div>
        </div>
    )
}
export default SymptomRecord;