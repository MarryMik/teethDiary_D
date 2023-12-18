import Model from "../dbconnect/model.js";
import { createError } from "../utils/error.js";
import { verifyToken } from "../utils/verifyToken.js";
let treatmentM = new Model("treatment");
let treatmentVM = new Model("all_treatments");
let recordM = new Model("teeth_record");
let areaV = new Model("procedure_area");
let procedureM = new Model("teethdiary.procedure");
let diaryM= new Model ("diary");
let fileM = new Model("file_ph")
const fieldId='idtreatment';
export const createTreatment =async (req,res,next)=>{
        const userId = req.body.iduser;
        let diary = await diaryM.findPlus("user_id", userId,` and diary.diary_type="Щоденник пацієнта"` );
        if (diary.length<1){
            res.status(409).json("Такого щоденника не існує!")
        }else{
        const params="`treatment_name`,`start_date_trtment`, `end_date_trtment`, `diary_id`";
        const values = [
            req.body.treatment_name,
            req.body.start_date,
            req.body.end_date,
            diary[0].iddiary
        ]
        let trtmnt = treatmentM.create(params, values, fieldId);
        trtmnt.then( function(value){
            console.log( "Лікування було створено" ); 
            res.json( value);})
        .catch( function(error){
            console.log( error )
            next(error);
        });
    }
}
export const updateTreatment = async (req, res,next)=>{
        let treatment = await treatmentM.find(fieldId, req.params.idtreatment);
        if(treatment.length>0){ 
            const params= {
                treatment_name:req.body.treatment_name,
                start_date_trtment: req.body.start_date, 
                end_date_trtment:req.body.end_date,
            };
            let result =treatmentM.update(req.params.idtreatment, params, fieldId);
            result.then( function(value){
                console.log("Лікування оновлено"); 
                res.json( value); 
            })
            .catch( function(error){
                console.log( error );
                next(error);});
        } 
        else{
            return next(createError(404,"Лікування не знайдено" ));  
        }  
}
export const  deleteTreatment = async(req, res,next)=>{
    let record, procedure, proc_area, fileph;
    let idTreatment = req.params.idtreatment;
    console.log("treatment "+idTreatment);
    record = await recordM.find("treatment_id", idTreatment);
    if(record.length<1){console.log("Запису не знайдено");}
    else{
        record.forEach(async(el)=>{
            procedure = await procedureM.find("record_id", el.idrecord);
            if(procedure.length<1){console.log("Процедура не знайдена");}
            else{
                procedure.forEach(async(elem)=>{
                    proc_area = await areaV.find("procedure_id", elem.idprocedure);
                    if(proc_area.length<1){ console.log("Область застосування не знайдена");
                    }else{
                        proc_area.forEach((element) => {
                            console.log(element)
                            let areaDel = areaV.delete(element.id_area, "id_area");
                            areaDel.then(console.log("Area deleted"))
                        });
                    }
                    fileph = fileM.find("procedure_id", elem.idprocedure);
                    if(fileph.length<1){ console.log("Файл не знайдено");
                    }else{
                        fileph.forEach((element) => {
                            let fileDel = fileM.delete(element.idfile, "idfile");
                            fileDel.then(console.log("file deleted"))
                        });
                    }
                    let procDelete = procedureM.delete(el.idprocedure, "idprocedure");
                    procDelete.then(console.log("procedure deleted"))
                })
            }
            let recDelete = recordM.delete(el.idrecord, "idrecord")
            recDelete.then( function(value){
                console.log( "Treatment has been deleted" ); 
                res.json( value);})
            .catch( function(error){
                console.log( error );
                next(error);
            });
        })  
    }
            let result = treatmentM.delete(idTreatment, fieldId);
            result.then( function(value){
                console.log( "Treatment has been deleted" ); 
                res.json( value);})
            .catch( function(error){
                console.log( error );
                next(error);  
            });
}
export const getTreatment = async(req,res,next)=>{
    let result = treatmentM.find(fieldId,req.params.idtreatment);
    result.then(function(value){
        res.json(value);
    }).catch(function(error){
        console.log(error);
        next(error);
    });
}
export const getTreatments = async(req,res,next)=>{
    let result = treatmentM.find("diary_id",req.body.diaryId);
    result.then(function(value){
        console.log("All treatments");
        res.json(value)})
        .catch(function(error){
            console.log( error );
            next(error);
        })
}
export const getTreatmentsView = async(req,res,next)=>{
    const userId = req.query.userId;
    let result;
    verifyToken(req, res,()=>{
        if(userId!==undefined){
            result = treatmentVM.find("user_id",userId);
            console.log(userId)
        }else{
            result = treatmentVM.find("user_id",req.user.iduser);
            console.log("token "+req.user.iduser)
        }
        result.then(function(value){
            console.log("All treatments (view)");
            res.json(value)})
            .catch(function(error){
                console.log( error );
                next(error);
            })
    });
}

