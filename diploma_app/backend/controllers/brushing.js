import Model from "../dbconnect/model.js";
import { createError } from "../utils/error.js";
import { verifyToken } from "../utils/verifyToken.js";
let brushingM= new Model("record_brushing");
let diaryM= new Model ("diary");
let fieldId = "id_brushing";
export const getBrushingsByUser = async(req,res,next)=>{
    const userId = req.query.userId;
    let diary;
    let result;
    verifyToken(req, res, async()=>{ 
        if(userId!==undefined){
            diary = await diaryM.findPlus("user_id",userId, ` and diary.diary_type="Трекер чистки зубів"`);
        }else{
            diary = await diaryM.findPlus("user_id",req.user.iduser, ` and diary.diary_type="Трекер чистки зубів"`);
        }
        if(diary.length>0){
            result = brushingM.find("diary_id", diary[0].iddiary);
        result.then(function(value){
            res.json(value)})
            .catch(function(error){
                console.log( error );
                next(error);
            })
        }else{
            res.status(409).json("Такого щоденника не існує!")
        }
    });
}
export const deleteBrushing =(req,res,next)=>{
    const  idBrushing = req.params.idbrushing;
    const result = brushingM.delete(idBrushing,fieldId );
    result.then(function(value){
        res.json(value)})
        .catch(function(error){
            console.log( error );
            next(error);
        })
}
export const createBrushing = async(req,res,next)=>{
    const dateBrushing = req.body.brushing_date;
    console.log(dateBrushing)
    if(dateBrushing!==null && dateBrushing!==undefined){
        let brushing = await brushingM.find("brushing_date", dateBrushing);
        if(brushing.length>0){
            console.log("Сьогодні запис вже був створений, дані оновлюються...");
            const updateParams ={
                brushing_date: req.body.brushing_date,
                number_of_times: req.body.number_of_times,
                morning_check: req.body.morning_check,
                after_meals:req.body.after_meals,
                before_sleep:req.body.before_sleep
            }
            let updateResult = brushingM.update(brushing[0].id_brushing, updateParams, fieldId);
            updateResult.then( function(value){
                console.log( "Дані про чистку зубів було оновлено" ); 
                res.json( value);})
            .catch( function(error){
                console.log( error )
                next(error);
            });
        }else{
            const userId = req.body.iduser;
            let diary = await diaryM.findPlus("user_id", userId,` and diary.diary_type="Трекер чистки зубів"` );
            if (diary.length<1){
                res.status(409).json("Такого щоденника не існує!")
            }else{
                const params="`brushing_date`,`number_of_times`,`morning_check`,`after_meals`,`before_sleep`, `diary_id`";
                const values = [
                    req.body.brushing_date,
                    req.body.number_of_times,
                    req.body.morning_check,
                    req.body.after_meals,
                    req.body.before_sleep,
                    diary[0].iddiary,
                ]
                let result = brushingM.create(params,values,fieldId);
                result.then( function(value){
                    console.log( "Дані про чистку зубів було внесено" ); 
                    res.json( value);})
                .catch( function(error){
                    console.log( error )
                    next(error);
                });
            }
        }
    }
}
export const updateBrushing = async (req,res,next)=>{
    const updateParams ={
        number_of_times: req.body.number_of_times,
        morning_check: req.body.morning_check,
        after_meals:req.body.after_meals,
        before_sleep:req.body.before_sleep
    }
    let brushing = await brushingM.find(fieldId, req.params.idbrushing);
    if (brushing.length>0){
        let result = brushingM.update(req.params.idbrushing,updateParams, fieldId);
        result.then( function(value){
            console.log("Дані про чистку були оновлені"); 
            res.json( value); 
        })
        .catch( function(error){
            console.log( error );
            next(error);});
    }else{
        console.log("Даних про дану чистку не існує");
    }
}