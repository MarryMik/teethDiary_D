//підключення необхідних модулів
import Model from "../dbconnect/model.js";
import { verifyToken } from "../utils/verifyToken.js";
//моделі таблиць бази даних
let procedureM = new Model("teethdiary.procedure");
let procedureVM = new Model("procedure_data");
let areaV = new Model("procedure_area")
let fileV = new Model("fileph")
let fieldId ="idprocedure";
//отримання даних з представлення
export const getProceduresView = async(req,res,next)=>{
    const userId = req.query.userId;
    let result;
    verifyToken(req, res,()=>{
        if(userId!==undefined){
            result = procedureVM.find("user_id",userId);
        }else{
            result = procedureVM.find("user_id",req.user.iduser);
        }
        result.then(function(value){
            console.log("All procedures (view)");
            res.json(value)})
            .catch(function(error){
                console.log( error );
                next(error);
            })
    });
}
//отримання процедур за записом
export const getProceduresByRecord = (req,res,next)=>{
    const idrecord = req.query.idrecord;
    if(idrecord>=0){
        const result = procedureVM.find("idrecord", idrecord);
        result.then(function(value){
            console.log("Процедури обраного запису");
            res.json(value)})
            .catch(function(error){
                console.log( error );
                next(error);
            })
    }
}
//видалення процедури
export const deleteProcedure = async(req, res, next)=>{
    let idProcedure= req.params.idprocedure;
    console.log("procedure: "+ idProcedure);
    let proc_area = await areaV.find("procedure_id", idProcedure);
    if(proc_area.length<1){ console.log("Область застосування не знайдена");
    }else{
        proc_area.forEach( async(element) => {
            let areaDel = await areaV.delete(element.id_area, "id_area");
        });
    } 
    let files = await fileV.find("procedure_id", idProcedure);
    if(files<1){ console.log("Файлів не знайдено");
    }else{
        files.forEach( async(element) => {
            let fileDel = await fileV.delete(element.idfile, "idfile");
        });
    }        
    let result = procedureM.delete(idProcedure, "idprocedure");
    result.then(
        console.log( "Процедура була видалена" )
    )
    .catch( function(error){
        console.log( error );
        next(error);
    });
}
//створення процедури
export const createProcedure = async(req, res, next)=>{
   const params="`procedures_id`,`record_id`";
    const values=[
        req.body.procedures_id,
        req.body.record_id,
    ];
    let result = procedureM.create(params, values, fieldId);
    result.then( function(value){
        console.log( "Процедуру було створено" ); 
        res.json( value);})
    .catch( function(error){
        console.log( error )
        next(error);
    });
}
//оновлення даних процедури
export const updateProcedure = (req,res, next)=>{
    const params={
        procedures_id: req.body.procedures_id
    }
    let result = procedureM.update(req.params.idprocedure, params, fieldId);
    result.then( function(value){
        console.log("Процедура була оновлена"); 
        res.json( value); 
    })
    .catch( function(error){
        console.log( error );
        next(error);});
}