import Model from "../dbconnect/model.js";
import { createError } from "../utils/error.js";
import { verifyToken } from "../utils/verifyToken.js";
let recordM = new Model("teeth_record");
let recordVM = new Model("record_data");
let procedureM = new Model("teethdiary.procedure");
let areaV = new Model("procedure_area")
let fieldId ="idrecord";
export const getRecordsView = async(req,res,next)=>{
    const userId = req.query.userId;
    let result; 
    verifyToken(req, res,()=>{
        if(userId!==undefined){
            result = recordVM.find("user_id",userId);
        }else{
            result = recordVM.find("user_id",req.user.iduser);
        }
        result.then(function(value){
            console.log("All records (view)");
            res.json(value)})
            .catch(function(error){
                console.log( error );
                next(error);
            })
    });
}
export const getRecordByTrtmnt = (req, res, next)=>{
    const treatment_id =req.query.idtreatment;
    if (treatment_id>=0){
        const result = recordVM.find("idtreatment", treatment_id);
        result.then(function(value){
            console.log("Записи обраного лікування");
            console.log(value);
            res.json(value)})
            .catch(function(error){
                console.log( error );
                next(error);
            })
    }
}
export const deleteRecord = async (req,res, next)=>{
    let idRecord = req.params.idrecord;
    console.log("record "+ idRecord);
    let procedure = await procedureM.find("record_id", idRecord);
    if(procedure.length<1){console.log("Процедура не знайдена");}
    else{
        let proc_area = await areaV.find("procedure_id", procedure.idprocedure);
        if(proc_area.length<1){ console.log("Область застосування не знайдена");
        }else{
            proc_area.forEach( async(element) => {
                let areaDel = await areaV.delete(element.id_area, "id_area");
            });
        } 
        procedure.forEach(async(el)=>{
            let procDelete = await procedureM.delete(el.idprocedure, "idprocedure");
        })
    }
    let result = recordM.delete(idRecord, "idrecord");
    result.then(
        function(value){
            console.log( "Запис був видалений" ); 
            res.json( value);}
    )
    .catch( function(error){
        console.log( error );
        next(error);
    });
}
export const createRecord = async(req,res,next)=>{
    const params="`doctor_id`,`record_date`, `treatment_id`, `rating`, `record_adress`, `prescription`";
        const values = [
            req.body.doctor_id,
            req.body.record_date,
            req.body.treatment_id,
            req.body.rating, 
            req.body.record_adress,
            req.body.prescription
        ]
        let result = recordM.create(params, values, "idrecord");
        result.then( function(value){
            console.log( "Запис було створено" ); 
            res.json( value);})
        .catch( function(error){
            console.log( error )
            next(error);
        });
}
export const updateRecord = async(req, res,next)=>{
    let record = await recordM.find(fieldId, req.params.idrecord);
    if(record.length>0){ 
        let params;
        if(req.body.doctor_id!==""){
            params = {
                doctor_id: req.body.doctor_id,
                record_date: req.body.record_date,
                rating: req.body.rating, 
                record_adress: req.body.record_adress,
                prescription: req.body.prescription
            }
        }else{
            params = {
                record_date: req.body.record_date,
                rating: req.body.rating, 
                record_adress: req.body.record_adress,
                prescription: req.body.prescription
            }
        }
        let result =recordM.update(req.params.idrecord, params, fieldId);
        result.then( function(value){
            console.log("Запис оновлено"); 
            res.json( value); 
        })
        .catch( function(error){
            console.log( error );
            next(error);});
    } 
    else{
        return next(createError(404,"Запис не знайдено" ));  
    }
}