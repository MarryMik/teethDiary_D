import Model from "../dbconnect/model.js";
import { verifyToken } from "../utils/verifyToken.js";
let brushM= new Model("toothbrush");
let diaryM= new Model ("diary");
let fieldId = "idtoothbrush"
export const getBrushesByUser = async(req,res,next)=>{
    const userId = req.query.userId;
    let diary;
    let result;
    verifyToken(req, res,async()=>{
        if(userId!==undefined){
            diary = await diaryM.findPlus("user_id",userId, ` and diary.diary_type="Журнал заміни зубних щіток"`);
        }else{
            diary = await diaryM.findPlus("user_id",req.user.iduser, ` and diary.diary_type="Журнал заміни зубних щіток"`);
        }
        if(diary.length>0){
            result = brushM.find("diary_id", diary[0].iddiary);
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
export const deleteBrush = (req, res, next)=>{
    const idBrush = req.params.idbrush;
    const result = brushM.delete(idBrush, fieldId);
    result.then(function(value){
        console.log("Щітка була видалена");
        res.json(value)})        
        .catch(function(error){
            console.log( error );
            next(error);
        })
}
export const updateBrush = async(req, res,next)=>{
    let idbrush = req.params.idbrush;
    const end_date = new Date();
    const params = { 
        status: 0,
        end_date: end_date
    };
    let brushes = await brushM.find(fieldId, idbrush);
    if(brushes.length>0){
        let result = brushM.update(idbrush, params, fieldId);
        result.then( function(value){
            console.log("Дані про зубну щітку були оновлені"); 
            res.json( value); 
        })
        .catch( function(error){
            console.log( error );
            next(error);});
    }else{
        console.log("Такої зубної щітки не існує");
    }
}
export const createBrush = async(req, res, next)=>{
    const userId = req.body.iduser;
            let diary = await diaryM.findPlus("user_id", userId,` and diary.diary_type="Журнал заміни зубних щіток"` );
            console.log(diary)
            if (diary.length<1){
                res.status(409).json("Такого щоденника не існує!")
            }else{
                const params="`diary_id`,`hardness`,`color`,`start_date`,`status`";
                const values = [
                    diary[0].iddiary,
                    req.body.hardness,
                    req.body.color,
                    req.body.start_date,
                    req.body.status                    
                ]
                console.log(values)
                let result = brushM.create(params,values,fieldId);
                result.then( function(value){
                    console.log( "Зубну щітку було створено" ); 
                    res.json( value);})
                .catch( function(error){
                    console.log( error )
                    next(error);
                });
            }
}