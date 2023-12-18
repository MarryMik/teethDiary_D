import Model from "../dbconnect/model.js";
import { createError } from "../utils/error.js";
import { verifyToken } from "../utils/verifyToken.js";
let diaryM = new Model("diary");
const fieldId='iddiary';
let diaryVM = new Model("diary_data");
export const createDiary =async (req,res,next)=>{
    verifyToken(req,res,()=>{
        const params="`user_id`,`diary_type`"
        const values = [
            req.user.iduser,
            req.body.diary_type
        ]
        let diary = diaryM.create(params, values, fieldId);
        diary.then( function(value){
            console.log( "Diary has been created" ); 
            res.json( value);})
        .catch( function(error){
            console.log( error )
            next(error);
        });
    });
}
export const updateDiary = (req, res,next)=>{
    verifyToken(req,res,async ()=>{
        let diary = await diaryM.find("iddiary", req.params.iddiary);
        if(!diary) return next(createError(404,"Щоденник не знайдений" ));
        if(diary.user_id!=req.user.iduser)  return next(createError(403, "Ви не авторизований!"));
        else{
            const params= {
                diary_type:req.body.diary_type
            };
            let result =diaryM.update(req.params.iddiary, params, fieldId);
            result.then( function(value){
                console.log("Щоденник був оновлений"); 
                res.json( value);
            })
            .catch( function(error){
                console.log( error );
                next(error);});
        } 
    });
}
export const  deleteDiary = async (req, res,next)=>{
    verifyToken(req,res,async ()=>{
        let diary = await diaryM.find("iddiary", req.params.iddiary);
        if(!diary) return next(createError(404,"Щоденник не знайдений" ));
       if(diary.user_id!=req.user.iduser)  return next(createError(403, "Ви не авторизований!"));
        else{
            let result = diaryM.delete(req.params.iddiary, fieldId);
            result.then( function(value){
                console.log( "Щоденник був видалений" ); 
                res.json( value);})
            .catch( function(error){
                console.log( error );
                next(error);
            });
        }
    });
}
export const getDiary = async(req,res,next)=>{

    let result = diaryM.find(fieldId,req.params.iddiary);
    result.then(function(value){
        res.json(value);
    }).catch(function(error){
        console.log(error);
        next(error);
    });
}
export const getDiaries = async(req,res,next)=>{
    let result = diaryM.get_all();
    result.then(function(value){
        console.log("Всі щоденникки");
        res.json(value)})
        .catch(function(error){
            console.log( error );
            next(error);
        })
}
export const getDiariesByUser = (req,res,next)=>{
    verifyToken(req,res,async ()=>{
            let result = diaryM.find("user_id",req.user.iduser);
            result.then(function(value){
                res.json(value);
            }).catch(function(error){
                console.log(error);
                next(error);
            });
    });
}
export const getAccessDiaries = async(req, res, next)=>{
    let result = diaryVM.find("access_id", req.query.iduser);
    result.then(function(value){
        console.log("Щоденики з доступом");
        res.json(value)})
        .catch(function(error){
            console.log( error );
            next(error);
        })
}