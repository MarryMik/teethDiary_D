import React from "react";
import "./file_card.scss";
import { makeRequest } from '../../axios';
import { useQuery, useMutation, queryClient } from 'react-query';
const FileCard =({fileph})=>{
    const deleteMutationR = useMutation(
        (recId) => {
          return makeRequest.delete("/files/api/" + recId);
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["files"]);
          },
        }
      );
      const deleteFile = ()=>{
        let answer = window.confirm('Ви впевнені, що хочете видалити цей запис і що з ним пов\'язано?')
        if (answer){
            deleteMutationR.mutate(fileph.idfile);
            window.location.reload(false);
        }
    };
    return(
        <div className='file-box'>
            <img className='file-box__img' src={require('../../../src/upload/'+fileph.file_name)}></img>
            <div className="file-box__right">
                <p className='file-box__text file-box__text_adress'>{fileph.file_adress}</p>
                <p className='file-box__text file-box__text_date'>{fileph.file_date}</p>
                <button className='file-box__buttn-delete' onClick={deleteFile}>Видалити</button>
        </div>
        </div>
    )
}
export default FileCard