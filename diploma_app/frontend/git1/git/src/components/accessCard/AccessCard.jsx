import "./access_card.scss"
import React from 'react';
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
const AccessCard =({patient})=>{
const navigate =useNavigate();
const goToDiary= (e)=>{
    e.preventDefault();
    localStorage.setItem("patient", JSON.stringify({
        idPatient: patient.owner_id
    }));
    navigate("/diary");
}
return(
    <div className='access' onClick={goToDiary}> 
          <div className='access__name'>
            <p className='access__text access__text-name'>{patient.owner}</p>
          </div>
          <div className='access_phone'>
            <p className='access__text access__text-phone'>{patient.owner_phone}</p>
          </div>
        </div>
)
}
export default AccessCard