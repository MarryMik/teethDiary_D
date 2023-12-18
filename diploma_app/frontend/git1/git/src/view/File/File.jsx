import React, { useEffect, useState, useRef } from 'react'
import {useQuery } from 'react-query'
import { makeRequest } from '../../axios';
import "./File.scss";
const FilePF =()=>{
    const img_ref = useRef(null);
    const {isLoading, error, data} =useQuery(['files'], ()=>
        makeRequest.get("/files?procedure_id="+JSON.parse(localStorage.getItem("procedure")).idprocedure).then(res=>{
        return res.data;
    }));
    return(
        <div className='proc_img-file__wrap'>
            { error
            ? "До даної процедури не було прикріплено файлів "
            : isLoading
            ? "завантаження"
            :data.map((data)=><img src={require('../../../src/upload/'+data.file_name)} ref={img_ref} alt="file-picture"/>)
            }
        </div>
    )
}
export default FilePF
