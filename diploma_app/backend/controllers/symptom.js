import Model from "../dbconnect/model.js";
import { verifyToken } from "../utils/verifyToken.js";
let symptomM = new Model("symptom");
const fieldId= "idsymptom";
let diaryM= new Model ("diary");
export const getSymptoms = async (req,res,next)=>{
    let userId = req.query.userId; 
    let diary;
    verifyToken (req,res, async()=>{
        if(userId!==undefined){
            diary = await diaryM.findPlus("user_id",userId, ` and diary.diary_type="Щоденник спостерігача"`);
        }else{
            diary = await diaryM.findPlus("user_id",req.user.iduser, ` and diary.diary_type="Щоденник спостерігача"`);
        }
        if(diary.length>0){
            let result = symptomM.find("diary_id", diary[0].iddiary);
            result.then(function(value){
                console.log(value)
                res.json(value)})
                .catch(function(error){
                    console.log( error );
                    next(error);
                });
        }else{
            res.status(409).json("Такого щоденника не існує!")
        }
    });
}
export const deleteSymptom = (req,res,next)=>{
    const idSymptom = req.params.idsymptom;
    let result = symptomM.delete(idSymptom, fieldId);
    result.then(function(value){
        console.log("Симптом був видалений");
        res.json(value)})        
        .catch(function(error){
            console.log( error );
            next(error);
        })
}
export const createSymptom = async(req, res, next)=>{
    console.log( req.body.symptom_date.slice(0,10))
    const userId = req.body.iduser;
            let diary = await diaryM.findPlus("user_id", userId,` and diary.diary_type="Щоденник спостерігача"` );
            if (diary.length<1){
                res.status(409).json("Такого щоденника не існує!")
            }else{
                const params="`diary_id`,`symptom_name`,`level_pain`,`symptom_date`,`symptom_datestart`";
                const values = [
                    diary[0].iddiary,
                    req.body.symptom_name,
                    req.body.level_pain,
                    req.body.symptom_date.slice(0,10),
                    req.body.symptom_datestart                    
                ]
                let result = symptomM.create(params,values,fieldId);
                result.then( function(value){
                    console.log( "Симптом було створено" ); 
                    res.json( value);})
                .catch( function(error){
                    console.log( error )
                    next(error);
                });
            }
}