import React, { useEffect, useState, useRef } from 'react';
import {MultiSelect} from "react-multi-select-component";
import "./procedure.scss"
import {useQuery, useQueries } from 'react-query'
import { makeRequest } from '../../axios';
import FileCard from '../../components/fileCard/fileCard';
import { useMutation, queryClient } from "react-query";
const Procedure = () => {
const [selected1, setSelected1] = useState([]);
const [selected2, setSelected2] = useState([]);
const procedureFromStorage = JSON.parse(localStorage.getItem("procedure"))
const adressRef = useRef(null);
const dateRef = useRef(null);
const ocpRef = useRef(null);
const procedureRef = useRef(null);
const updateArr =[];
const [localSg , setlocalSg] =useState({
  idprocedure: procedureFromStorage.idprocedure,
  partname: procedureFromStorage.partname,
  proc_name: procedureFromStorage.proc_name,
  id_or_cav_part: procedureFromStorage.id_or_cav_part
});
const {isLoading: ocpLoading, error: ocpError, data: ocpData} =useQuery(['oral_cavity_parts'], ()=>
makeRequest.get("/oralCavityParts").then(res=>{
  return res.data;
}));
const {isLoading: dirProceduresLoading, error: dirProceduresError, data: dirProceduresData} =useQuery(['dir_procedures'], ()=>
makeRequest.get("/directoryProcedures").then(res=>{
  return res.data;
}));
const {isLoading: filesLoading, error: filesError, data: filesData} =useQuery(['files'], ()=>
makeRequest.get("/files?procedure_id="+procedureFromStorage.idprocedure).then(res=>{
  return res.data;
}));
let oral_cavity_parts=[];
let procedures=[];
if(ocpData!==undefined && dirProceduresData!==undefined){
  oral_cavity_parts = ocpData.map(({ partname, id_or_cav_part }) => ({ ['label']: partname , ['value']: id_or_cav_part }));
  procedures= dirProceduresData.map(({ proc_name, idprocedures }) => ({ ['label']: proc_name , ['value']: idprocedures }));
}
const [selectedFile, setSelectedFile]= useState(null);
const [inputs, setInputs]=useState({
      file_name: "",
      file_date: "",
      file_adress: "",
      procedure_id:""
})
const [procData, setProcData]=useState({
  procedures_id: "",
  record_id: JSON.parse(localStorage.getItem("record")).idrecord,
})
const handleChange =(e)=>{
  setInputs((prev)=>({...prev, [e.target.name]:e.target.value}));
}
const uploadFile=(e)=>{
  setSelectedFile(e.target.files[0]);
}
const onChangeProcedure = (e)=>{
  setSelected2(e.target.value)
  setProcData((prev)=>({...prev, ["procedures_id"]: e.target.value}));
  setlocalSg((prev)=>({...prev, ["proc_name"]:procedures[selected2]}))
}
const updateSelect1 =(e)=>{
  setlocalSg((prev)=>({...prev,["partname"]:(selected1).map((el)=>el.label).join(',')}))
  setlocalSg((prev)=>({...prev,["id_or_cav_part"]:(selected1).map((el)=>el.value).join(',')}))
}
const upload = async(file) =>{
  try{
    const formData = new FormData();
    formData.append("file", file);
    const res = await makeRequest.post("/api/upload", formData)
    return res.data;
  }catch (err){
    console.log(err);
  }
}
const updateProcedure = useMutation(
  (upd) => {
    return makeRequest.put("/procedures/api/"+procedureFromStorage.idprocedure, upd);
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries(["procedures"]);
    },
  }
  );
  const deleteArea = useMutation(
    (procId) => {
      return makeRequest.delete("/areas/delete?procedure_id=" + procId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["areas"]);
      },
    }
  );
const saveFile= async (e)=>{
  e.preventDefault();
  let fileURL;
    if(selectedFile){
      fileURL = await upload(selectedFile);
      setInputs((prev)=>({...prev, ["file_name"]: fileURL}));
      setlocalSg((prev)=>({...prev, ["file_name"]:fileURL}));
      updateArr.push({
        file_date: inputs.file_date,
        file_adress: inputs.file_adress,
        file_name: fileURL,
        procedure_id: procedureFromStorage.idprocedure,
      });
    }
  if(procedureFromStorage.idprocedure>=0){
      setInputs((prev)=>({...prev, ["procedure_id"]: procedureFromStorage.idprocedure}));
      if(selected1.length>0){
        deleteArea.mutate(procedureFromStorage.idprocedure);
        setTimeout(()=>{
          selected1.forEach((el)=>{
            let arr = {
              procedure_id: procedureFromStorage.idprocedure,
              or_cav_part_id: el.value
            };
            try{
              const newArea = makeRequest.post("/areas", arr);
            }catch(err){
              console.log(err);
            }
          })
        },6000); 
        setlocalSg((prev)=>({...prev,["partname"]:(selected1).map((el)=>el.label).join(',')}))
        setlocalSg((prev)=>({...prev,["id_or_cav_part"]:(selected1).map((el)=>el.value).join(',')}))
      }
      if(selected2.length>0){
        updateProcedure.mutate({procedures_id: selected2});
      }
      setTimeout(()=>{
        if(selectedFile){
        try{
          const newFile = makeRequest.post("/files", updateArr[0]);
        }catch(err){
          console.log(err);
        }
      }
    },8000);
    localStorage.setItem("procedure",JSON.stringify(localSg));
  }else{
    let proc;
      try{
         proc = await makeRequest.post("/procedures", procData);
          setInputs((prev)=>({...prev, ["procedure_id"]: proc.data[0].idprocedure}))
          updateArr.push({
            file_date: inputs.file_date,
            file_adress: inputs.file_adress,
            file_name: fileURL,
            procedure_id: proc.data[0].idprocedure,
          })
      }catch(err){
        console.log(err);
      }
    setTimeout(()=>{
        if(selectedFile){
          try{
            const newFile = makeRequest.post("/files", updateArr[1]);
          }catch(err){
            console.log(err);
          }
        }
    },6000)
    setTimeout(()=>{
    if(selected1.length>0){
      selected1.forEach((el)=>{
        let arr = {
          procedure_id: proc.data[0].idprocedure,
          or_cav_part_id: el.value
        };
        try{
          const newArea = makeRequest.post("/areas", arr);
        }catch(err){
          console.log(err);
        }
      })
    }
    },6500)
  }
}
if(procedureFromStorage.idprocedure>=0){
if(adressRef.current!==null && dateRef.current!==null && ocpRef.current!==null && procedureRef.current!==null){
  ocpRef.current.innerText=procedureFromStorage.partname;
  procedureRef.current.innerText=procedureFromStorage.proc_name;
}
}
  return (
    <>
    <form className='procedure'>
      <div className='procedure-wrap'>
        <p className='procedure__text_header'>Процедура</p>
        <div className="procedure__input-wrap">
          <p className="procedure__text_title">Процедура:</p>
          <div className='procedure__proc-data'>
            <p className='procedure__proc-data-text' ref={procedureRef}></p>
            <select 
              className=' procedure__input procedure__input_procedure-select' 
              name="procedure"
              defaultValue={selected2}
              onChange={onChangeProcedure}
              >
                {procedures.map((opt)=>(<option value={opt.value}>{opt.label}</option>))}
            </select>
          </div>
        </div>
        <div className='procedure__input-wrap'>
          <div className='procedure__input-text_wrap'>
            <p className='procedure__text_title'>Область застосування:</p>
          </div>
          <div className='procedure__ocp-data'>
            <p className='procedure__ocp-data-text' ref={ocpRef}></p>
            <MultiSelect 
              className=' procedure__input_ocp'
              options={oral_cavity_parts}
              value = {selected1}
              onChange={setSelected1}
              onClick={updateSelect1}
              labelledBy='Select'
              />
          </div>
        </div>
        <div className='procedure__input-wrap'>
          <p className='procedure__text_title'>Файл:</p>
          <div className='file-form'>
            <p className='file-form__header'>Ввведіть дані про файл</p>
            
            <div className="file__input-wrap">
              <p className='file__text_title file__text_date'>Дата:</p>
              <input type="date" ref={dateRef} className='file__input file__input_date' name="file_date" onChange={handleChange}/>
            </div>
            <div className="file__input-wrap">
              <p className='file__text_title file__text_adress'>Адреса:</p>
              <input type="text" ref={adressRef} className='file__input file__input_adress' name="file_adress" onChange={handleChange}/>
            </div>
            <div className="file__input-wrap file__input-wrap_upload">
              <p className=' file__text_title file__text_title-upload'>Завантажити:</p>
              <input type="file" className=' file__input_upload' name="file" accept="image/*" onChange={uploadFile}/>
            </div>
            <div className='all-files'>
              {filesError
              ? ""
              : filesLoading
              ? ""
              : filesData==undefined
              ? ""
              :filesData.map((files)=><FileCard fileph={files} key={files.idfile}/>)
              }
            </div>
          </div>
        </div>
        <div className='procedure__input-wrap procedure__input-wrap_buttn'>
          <button className='form__buttn_save' onClick={saveFile}>Зберегти</button>
        </div>
      </div>
      </form>
    </>
  )
}
export default Procedure