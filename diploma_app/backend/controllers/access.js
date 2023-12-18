import Model from "../dbconnect/model.js";
import { verifyToken } from "../utils/verifyToken.js";
let accessM = new Model("access");
let diaryM= new Model ("diary");
export const createAccess = async(req,res,next)=>{
    let doctodId = req.body.doctorId;
    console.log("doctor "+ doctodId);
    let userId = req.body.iduser;
    console.log("user "+userId);
    verifyToken(req,res,async()=>{
        let diary = await diaryM.findPlus("user_id",userId, ` and diary.diary_type="Щоденник пацієнта"`);
        const params="`user_id`,`diary_id`";
        if(diary.length>0){
            const values = [
                doctodId,
                diary[0].iddiary
            ]
            let access = accessM.create(params, values, "id_access");
            access.then( function(value){
                console.log( "Доступ було створено!" ); 
                res.json(value);})
            .catch( function(error){
                console.log( error )
                next(error);
            });
        }else{
            res.status(409).json("Такого щоденника не існує!")
        }
    });
}