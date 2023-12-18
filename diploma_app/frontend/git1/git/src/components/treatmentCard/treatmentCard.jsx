import React from 'react'
import  feather_img from "../../images/icons/svges/wing_feather_angel_heaven_bird_icon.svg"
import { makeRequest } from '../../axios';
import { useQuery, useMutation, queryClient } from 'react-query';
import { useNavigate } from "react-router-dom";
const TreatmentCard = ({treatment}) =>{
    const deleteMutationT = useMutation(
        (trtmId) => {
          return makeRequest.delete("/treatments/api/" + trtmId);
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["treatnents"]);
          },
        }
      );
      const deleteTreatment = ()=>{
        let answer = window.confirm('Ви впевнені, що хочете видалити цей запис і що з ним пов\'язано?')
        if (answer){
            deleteMutationT.mutate(treatment.idtreatment);
            window.location.reload(false);
        }        
    };
    const navigate=useNavigate();
    const updateTreatment =()=>{
        localStorage.setItem("treatment", JSON.stringify(
            {"idtreatment":treatment.idtreatment,
            "treatment_name":treatment.treatment_name,
            "start_date_trtment": treatment.start_date_trtment,
            "end_date_trtment": treatment.end_date_trtment        
            }))
        navigate("/treatment")
    }   
    return(
        <div className='treatment-card'>
            <img className='treatment-card__feather_first' src={feather_img}/>
            <img className='treatment-card__feather_second' src={feather_img}/>
            <div className='treatment-card__left-wrap'>
                <div className='treatment-card__field-wrap_primary'>
                    <p className='treatment-card__text-title'>Назва:</p>
                    <p className='treatment-card__text-data_name treatment-card__text-data'>{treatment.treatment_name}</p>
                </div>
                <div className='treatment-card__field-wrap_primary'>
                    <p className='treatment-card__text-title'>Дата початку:</p>
                    <p className='treatment-card__text-data_startdate treatment-card__text-data'>{treatment.start_date_trtment}</p>
                </div>
                <div className='treatment-card__field-wrap_primary'>
                    <p className='treatment-card__text-title'>Останній запис</p>
                    <p className='treatment-card__text-data_lastrecord treatment-card__text-data'>{treatment.end_date_trtment}</p>
                </div>
                <div className='treatment-card__field-wrap_primary'>
                    <p className='treatment-card__text-title'>Записів:</p>
                    <p className='treatment-card__text-data_number-records treatment-card__text-data'>{treatment.number_of_records}</p>
                </div>
            </div>
            <div className='treatment-card__buttns_wrap'>
                <button className='buttn_delete' onClick={deleteTreatment}></button>
                <button className='buttn_edit' onClick={updateTreatment}></button>
            </div>
      </div>
    )
}
export default TreatmentCard 